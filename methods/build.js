const requireModule = require('./require')

/**
 * Iterate over the index object and attempt to require all modules.
 * Return a container with every required object.
 * @param index
 * @returns {{}}
 */
module.exports = function (index) {
    var container = {}
    Object.keys(index.withoutInjection).forEach(function(moduleName) {
        container[moduleName] = requireModule(index, moduleName)
    })
    Object.keys(index.withInjection).forEach(function(moduleName) {
        container[moduleName] = requireModule(index, moduleName)
    })
    Object.keys(index.resolved).forEach(function(moduleName) {
        container[moduleName] = index.resolved[moduleName]
    })
    return container
}