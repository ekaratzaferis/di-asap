var dependencies = {}
var factories = {}
module.exports = {
    factory: require('./methods/factory')(factories),
    register: require('./methods/register')(dependencies),
    get: require('./methods/get')(dependencies, factories),
    printTree: () => {
        return require('./methods/printTree')(dependencies, factories)()
    }
}
