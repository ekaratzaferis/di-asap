require('should')
const root = process.cwd()
const path = require('path')
const di_asap = require('../index')()

di_asap.register.withoutInjection('readyToUseModule', path.join(root + '/withoutInjection'))
di_asap.register.withInjection('printer', path.join(root + '/withInjection'))

var myPrintingProject = di_asap.build()
myPrintingProject.readyToUseModule.should.startWith('This string was required via')
myPrintingProject.printer().should.startWith('\\random\\This string was required')