var path = require("path");
var fs = require("fs");
var vm = require("vm");
var crypto = require('crypto');

var RapydScript = vm.createContext({
    console       : console,
    readfile      : fs.readFileSync,
    writefile     : fs.writeFileSync,
    sha1sum       : function (data) { 
        var h = crypto.createHash('sha1');
        h.update(data);
        return h.digest('hex');
    },
});

exports.parse_baselib = function(src_path, beautify) {
    var baselibAst;
    try {
        var baselibPath = path.join(src_path, 'baselib.pyj');
        baselibAst = RapydScript.parse(fs.readFileSync(baselibPath, "utf-8"));
    } catch(e) {
        if (e.code == "ENOENT") {
            throw "Failed to locate baselib module.";
        }
        else {
            throw e;
        }
    }
    var outputStream = RapydScript.OutputStream({
        private_scope: false,
        beautify: beautify,
        write_name: false,
        omit_baselib: true,  // We are generating baselib here, cannot depend on it
    });
    baselibAst.print(outputStream);
    return eval(outputStream.toString());  // jshint ignore:line
};

function load_global(file) {
    try {
        var code = fs.readFileSync(file, "utf8");
        return vm.runInContext(code, RapydScript, file);
    } catch(ex) {
        // XXX: in case of a syntax error, the message is kinda
        // useless. (no location information).
        console.error("ERROR in file: " + file + " / " + ex);
        process.exit(1);
    }
}

var FILENAMES = exports.FILENAMES = [
    "baselib",
    "utils",
    "ast",
    "parse",
    "output",
];

var FILES = exports.FILES = FILENAMES.map(function(file){
    return path.join(path.dirname(module.filename), '..', 'lib', file + '.js');
});

FILES.forEach(load_global);

RapydScript.AST_Node.warn_function = function(txt) {
    console.error(txt);
};

// XXX: perhaps we shouldn't export everything but heck, I'm lazy.
for (var i in RapydScript) {
    if (RapydScript.hasOwnProperty(i)) {
        exports[i] = RapydScript[i];
    }
}


