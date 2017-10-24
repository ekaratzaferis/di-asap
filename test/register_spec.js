const should = require('should')
const register = require('../methods/register')
var index = {
    withInjection: {},
    withoutInjection: {}
}

register.withoutInjection(index, 'readyToUseModule', './withoutInjection')
register.withInjection(index, 'needsInjection', './withInjection')

index.withoutInjection.readyToUseModule.should.equal('./withoutInjection')
index.withInjection.needsInjection.should.equal('./withInjection')