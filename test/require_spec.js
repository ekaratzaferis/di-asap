require('should')
const root = process.cwd()
const path = require('path')
const requireModule = require('../methods/require')
var index = {
    withInjection: {},
    withoutInjection: {}
}

// REQUIRE NPM MODULE //
var anotherPathInstance = requireModule(index, 'path')
index.withoutInjection = { readyToUseModule: anotherPathInstance.join(root + '/withoutInjection.js') }

// REQUIRE MODULE WITH NO INJECTIONS //
var readyToUseModule = requireModule(index, 'readyToUseModule')
readyToUseModule.should.startWith('This string was required via')
index.withInjection = { needsInjection: path.join(root + '/withInjection.js') }

// REQUIRE MODULE WITH INJECTIONS //
var needsInjection = requireModule(index, 'needsInjection')
needsInjection().should.startWith('\\random\\This string was required')