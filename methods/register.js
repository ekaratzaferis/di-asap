/**
 * Modules with injection produce an export through a function call with arguments.
 * Modules without injection export some kind of data or function, and do not depend externally on other modules.
 *
 * Modules with injection get their dependencies injected: module.export = (dependency_1, dependency_1) => { return module }
 * whilst modules without injection get their dependencies by requiring them in their code: require('../../../admin/index.js')
 */
module.exports = {
    withInjection: function (index, moduleName, filename) {
        index.withInjection[moduleName] = filename
        return index
    },
    withoutInjection: function (index, moduleName, filename) {
        index.withoutInjection[moduleName] = filename
        return index
    }
}
