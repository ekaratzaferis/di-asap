/**
 * Factories are the modules that produce an export through a function call.
 * Registers are the modules that export some kind of data or function, and do not depend externally on other modules.
 *
 * Factories get their dependencies injected: module.export = (dependency_1, dependency_1) => { return module }
 * whilst registers get their dependencies by requiring them in their code: require('../../../admin/index.js')
 */
module.exports = (dependencies) => {
    return (name, dep) => {
        dependencies[name] = dep
    }
}
