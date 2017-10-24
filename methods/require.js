/**
 * Modules with injection produce an export through a function call with arguments.
 * Modules without injection export some kind of data or function, and do not depend externally on other modules.
 *
 * Modules with injection get their dependencies injected: module.export = (dependency_1, dependency_1) => { return module }
 * whilst modules without injection get their dependencies by requiring them in their code: require('../../../admin/index.js')
 */
const fnArgs = require('parse-fn-args')

module.exports = function (index, moduleName) {
    return read(index, moduleName)
}

/**
 * Attempt to require a file.
 * @param fileName
 * @returns {*}
 */
function attemptToRequire (fileName) {
    try {
        require.resolve(fileName)
        return require(fileName)
    } catch(e){
        throw new Error(fileName + ' either points to a non existing path or isn\'t an installed NPM package.')
    }
}

/**
 * Given a name, returns a module after attempting to:
 * - locate module in the index.withoutInjection
 * - locate module in the index.withInjection
 * - locate module in the NPM folder
 * @param index
 * @param moduleName
 * @returns {*}
 */
function read (index, moduleName) {
    if (index.withoutInjection[moduleName]) {
        return attemptToRequire(index.withoutInjection[moduleName])
    } else if (index.withInjection[moduleName]) {
        var factory = attemptToRequire(index.withInjection[moduleName])
        var injected = factory && inject(index, factory)
        if (!injected) {
            throw new Error('There was an error while resolving dependencies for ' + moduleName + '.')
        } else {
            return injected
        }
    } else {
        return attemptToRequire(moduleName)
    }
}

/**
 * Given a module with injections, attempt to require all of its arguments recursively, and then return it.
 * @param index
 * @param factory
 * @returns {*}
 */
function inject (index, factory) {
    var args = fnArgs(factory).map(function (dependency) { return read(index, dependency) })
    return factory.apply(null, args)
}
