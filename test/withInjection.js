/**
 * This is module that does have dependencies.
 * Notice that the dependencies are declared as the function arguments.
 *
 * The 1st dependency is a module that we register in readyToUseModule. It could also be another module that needs injection.
 * The 2nd is an npm package. No need to require it anymore!
 * @param readyToUseModule
 * @param path
 * @returns {function()}
 */
module.exports = function (readyToUseModule, path) {
    return function () {
        return path.join('/random/' + readyToUseModule)
    }
}
