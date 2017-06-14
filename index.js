const fnArgs = require('parse-fn-args')
var dependencies = {}
var factories = {}
var diContainer = {}
/**
 * Factories are the modules that produce an export through a function call.
 * Registers are the modules that export some kind of data or function, and do not depend externally on other modules.
 *
 * Factories get their dependencies injected: module.export = (dependency_1, dependency_1) => { return module }
 * whilst registers get their dependencies by requiring them in their code: require('../../../admin/index.js')
 */
diContainer.factory = (name, factory) => {
    factories[name] = factory
}
diContainer.register = (name, dep) => {
    dependencies[name] = dep
}
/**
 * If we're trying to retrieve a register, we just return the module from the dependencies object.
 * If we're trying to retrieve a factory, we recursively inject the dependencies before we call the factory and return the module.
 * If we're trying to retrieve an npm module, we resolve the name and then return it.
 * @param name
 * @returns {*}
 */
diContainer.get = (name) => {
    if (!dependencies[name]) {
        var factory = factories[name]
        dependencies[name] = factory && diContainer.inject(factory)
        if (!dependencies[name]) {
            try {
                require.resolve(name)
                return require(name)
            } catch(e){
                console.log(e)
                throw new Error(`Cannot find module: ${name}`)
            }
        }
    }
    return dependencies[name]
}
/**
 * Reads the function parameters in order to know which modules to look for in the dependencies object.
 * @param factory
 * @returns {*}
 */
diContainer.inject = (factory) => {
    var args = fnArgs(factory)
        .map((dependency) => {
            return diContainer.get(dependency)
        })
    return factory.apply(null, args)
}
module.exports = {
    factory: diContainer.factory,
    register: diContainer.register,
    get: diContainer.get
}
