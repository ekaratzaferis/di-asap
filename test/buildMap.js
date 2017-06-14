const di_asap = require('../')
module.exports = () => {
    /**
     * Start of by declaring your dependencies.
     * These are modules that return some kind of data or do not need external dependencies.
     * Possibly, they require their dependencies themselves.
     *
     * Then, declare you factories. These are modules that do need dependency injection in order to work.
     * Factories return a constructor, so in order to bootstrap our application,
     * we could simply 'get' the factory and invoke it.
     */
    di_asap.register('dependency', require('./dependency'))
    di_asap.factory('app', require('./needsInjection'))
    // Bootstrap your application //
    di_asap.get('app')()
}
