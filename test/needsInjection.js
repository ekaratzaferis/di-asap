/**
 * This is module that does have dependencies.
 * Notice that the dependencies are declared as the function arguments.
 *
 * The 1st dependency is a module that we register in buildMap. It could also be a factory.
 * The 2nd is an npm package. No need to require it anymore!
 * @param dependency
 * @param should
 * @returns {function()}
 */
module.exports = (dependency, should) => {
    return () => {
        console.log(dependency)
        dependency.should.startWith('This string was required via dependency injection (DI)!')
    }
}
