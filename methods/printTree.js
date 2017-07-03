module.exports = (dependencies, factories) => {
    const fnArgs = require('parse-fn-args')
    /**
     * This function prints the register dependency tree.
     */
    function print () {
        console.log('REGISTERS:')
        Object.keys(dependencies).forEach((i) => {
            printNode(2, i)
        })
        console.log('FACTORIES:')
        Object.keys(factories).forEach((i) => {
            printNode(2, i)
            printFactory(4, factories[i])
        })
    }
    /**
     * Recursively prints the factory dependency tree.
     * @param factory
     */
    function printFactory (level, factory) {
        var args = fnArgs(factory)
            .map((dependency) => {
                try {
                    require.resolve(dependency)
                    printNode(level, dependency+'(NPM)')
                } catch (e) {
                    if (factories[dependency]) {
                        printNode(level, dependency)
                        printFactory(level + 2, factories[dependency])
                    } else {
                        printNode(level, dependency)
                    }
                }
            })
    }
    function printNode (level, name) {
        var space = ''
        for (i = 0; i <= level; i++) {
            space = space.concat(' ')
        }
        console.log(`${space} => ${name}`)
    }
    return () => {
        print()
    }
}