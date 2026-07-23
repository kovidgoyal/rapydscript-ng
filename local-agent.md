initialize_command: bin/rapydscript self --complete
copy_resource: node_modules
copy_resource: dev
prepend_to_path: bin

# System Instructions & Project Context

## Rules for Code Generation
- **Error Handling**: Implement explicit error handling. Avoid silent failures or empty catch blocks.
- **Dependency Minimization**: Use existing project utilities and native standard libraries before suggesting new external packages.
- **Local Context**: Search the codebase for existing patterns before writing boilerplate structure from scratch.

## Project Execution Workflows

You both build and run the test suite by simply executing:

./build

The newly built tools are placed in the bin directory. 

The test suite runs very fast so dont bother trying to run specific tests, just
run the entire suite.

## Verification Pipeline

Before declaring a task complete, you must follow this exact verification lifecycle:
1. Run the local **Build and Test Command** to guarantee zero compilation or compilation-stage errors and no test failures
2. If errors occur, analyze the stdout logs completely before writing a fix. Do not guess.
3. Run rapydscript fmt . to ensure any changes you made to .pyj files are
   correctly formatted
4. Run rapydscript lint . to check for any issues in your code
5. If the changes you made are user visible, update the changelog
