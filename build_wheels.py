#!/usr/bin/env python3
# vim:fileencoding=utf-8

import os
import sys
import json
import shutil
import tempfile
import subprocess
import re

BASE = os.path.dirname(os.path.abspath(__file__))

# Maps (bun_target, wheel_platform_tag, binary_name)
PLATFORMS = [
    ("bun-linux-x64", "manylinux_2_17_x86_64", "rapydscript"),
    ("bun-linux-arm64", "manylinux_2_17_aarch64", "rapydscript"),
    ("bun-linux-x64-musl", "musllinux_1_2_x86_64", "rapydscript"),
    ("bun-linux-arm64-musl", "musllinux_1_2_aarch64", "rapydscript"),
    ("bun-darwin-x64", "macosx_10_9_x86_64", "rapydscript"),
    ("bun-darwin-arm64", "macosx_11_0_arm64", "rapydscript"),
    ("bun-windows-x64", "win_amd64", "rapydscript.exe"),
]


def normalize_name(name):
    return re.sub(r"[-_.]+", "_", name).lower()


def load_metadata():
    with open(os.path.join(BASE, "package.json"), "rb") as f:
        return json.load(f)


def build_binary(bun_target, outfile):
    cmd = [
        "bun",
        "bin/build.ts",
        "--compile",
        f"--outfile={outfile}",
        f"--target={bun_target}",
    ]
    print(f"  Building {bun_target} ...")
    subprocess.check_call(cmd, cwd=BASE)


def write_wheel_metadata(dist_info_dir, meta, wheel_platform):
    maintainers = meta.get("maintainers", [])
    author = maintainers[0].get("name", "") if maintainers else ""
    author_email = maintainers[0].get("email", "") if maintainers else ""
    repo_url = meta.get("repository", {}).get("url", "")

    with open(os.path.join(dist_info_dir, "WHEEL"), "w") as f:
        f.write("Wheel-Version: 1.0\n")
        f.write("Generator: wheel.py\n")
        f.write("Root-Is-Purelib: false\n")
        f.write(f"Tag: py3-none-{wheel_platform}\n")

    with open(os.path.join(dist_info_dir, "METADATA"), "w") as f:
        f.write("Metadata-Version: 2.1\n")
        f.write(f"Name: {meta['name']}\n")
        f.write(f"Version: {meta['version']}\n")
        f.write(f"Summary: {meta.get('description', '')}\n")
        if meta.get("homepage"):
            f.write(f"Home-page: {meta['homepage']}\n")
        if author:
            f.write(f"Author: {author}\n")
        if author_email:
            f.write(f"Author-email: {author_email}\n")
        if meta.get("license"):
            f.write(f"License: {meta['license']}\n")
        if meta.get("keywords"):
            f.write(f"Keywords: {', '.join(meta['keywords'])}\n")
        if repo_url:
            f.write(f"Project-URL: Source Code, {repo_url}\n")


def build_wheel(meta, bun_target, wheel_platform, binary_name, dest_dir, tmpdir):
    norm_name = normalize_name(meta["name"])
    version = meta["version"]

    suffix = ".exe" if binary_name.endswith(".exe") else ""
    binary_outfile = os.path.join(tmpdir, f"rapydscript-{bun_target}{suffix}")
    build_binary(bun_target, binary_outfile)

    # Assemble unpacked wheel layout
    wheel_dir = os.path.join(tmpdir, f"{norm_name}-{version}-{wheel_platform}")
    dist_info_dir = os.path.join(wheel_dir, f"{norm_name}-{version}.dist-info")
    scripts_dir = os.path.join(wheel_dir, f"{norm_name}-{version}.data", "scripts")
    os.makedirs(dist_info_dir)
    os.makedirs(scripts_dir)

    dest_binary = os.path.join(scripts_dir, binary_name)
    shutil.copy2(binary_outfile, dest_binary)
    os.chmod(dest_binary, 0o755)

    write_wheel_metadata(dist_info_dir, meta, wheel_platform)

    print("  Packing wheel ...")
    subprocess.check_call(
        [sys.executable, "-m", "wheel", "pack", wheel_dir, "--dest-dir", dest_dir],
        cwd=tmpdir,
    )

    return f"{norm_name}-{version}-py3-none-{wheel_platform}.whl"


def main():
    meta = load_metadata()
    dest_dir = os.path.join(BASE, "dist")
    os.makedirs(dest_dir, exist_ok=True)
    for x in os.listdir(dest_dir):
        os.remove(os.path.join(dest_dir, x))

    wheels = []
    with tempfile.TemporaryDirectory(prefix="rapydscript-wheel-") as tmpdir:
        for bun_target, wheel_platform, binary_name in PLATFORMS:
            print(f"\n[{bun_target}]")
            whl = build_wheel(
                meta, bun_target, wheel_platform, binary_name, dest_dir, tmpdir
            )
            wheels.append(whl)
            print(f"  -> dist/{whl}")

    print(f"\nBuilt {len(wheels)} wheels in dist/")


if __name__ == "__main__":
    main()
