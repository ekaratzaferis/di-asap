module.exports = (dependencies, factories) => {
    const fnArgs = require('parse-fn-args')
    /**
     * If we're trying to retrieve a register, we just return the module from the dependencies object.
     * If we're trying to retrieve a factory, we recursively inject the dependencies before we call the factory and return the module.
     * If we're trying to retrieve an npm module, we resolve the name and then return it.
     * @param name
     * @returns {*}
     */
    function get (name) {
        if (!dependencies[name]) {
            var factory = factories[name]
            dependencies[name] = factory && inject(factory)
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
    function inject (factory) {
        var args = fnArgs(factory)
            .map((dependency) => {
                return get(dependency)
            })
        return factory.apply(null, args)
    }
    return (name) => {
        return get(name)
    }
}
