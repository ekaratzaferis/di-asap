module.exports = () => {
    var dependencies = {}
    var factories = {}
    return {
        factory: require('./methods/factory')(factories),
        register: require('./methods/register')(dependencies),
        get: require('./methods/get')(dependencies, factories),
        printTree: () => {
            return require('./methods/printTree')(dependencies, factories)()
        }
    }
}
