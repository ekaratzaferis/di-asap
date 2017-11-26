const registerModule = require('./methods/register')
const requireModule = require('./methods/require')
const buildIndex = require('./methods/build')

module.exports = function () {
    // Index stores the relative paths to the modules that will be using //
    var index = {
        withInjection: {},
        withoutInjection: {},
        resolved: {}
    }
    /**
     * Exposed methods:
     * - register: allows the user to register to di-asap
     * - require: allows the user to "require" a module from the index
     * - buildIndex: requires all files in index and returns a container with every module
     */
    return {
        register: {
            withInjection: function (moduleName, filename) {
                index = registerModule.withInjection(index, moduleName, filename)
            },
            withoutInjection: function (moduleName, filename) {
                index = registerModule.withoutInjection(index, moduleName, filename)
            },
            resolved: function (moduleName, module) {
                index = registerModule.resolved(index, moduleName, module)
            }
        },
        require: function (module) {
            return requireModule(index, module)
        },
        build: function () {
            return buildIndex(index)
        }
    }
}
