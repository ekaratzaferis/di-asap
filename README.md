## Synopsis

This project introduces dependency injection to our project.

It's fairly simple to use.

1) Declare modules (resister) that you do not wish to inject other dependencies into.
2) Declare modules (factories) that will get their dependencies injected as function arguments.
3) Bootstrap your root module!

## Installation

### npm install easy-di

https://www.npmjs.com/package/easy-di

## API

**register**(name, module)
Register a dependency, by passing a name and a module (usually require('somePath'))

**factory**(name, module)
Register a factory, by passing a name and a module (usually require('somePath'))
No need to manually inject/require the dependencies!

**get**(name)
Get some module that you have registered or declared as factory.

## Code Example

Start of by requiring the easy-di module:

```javascript
const queryBuilder = require('easy-di')
```

Then declare your modules:

```javascript
easy_di.register('dependency', require('./dependency'))
easy_di.factory('app', require('./needsInjection'))
```

Bootstrap your application
```javascript
easy_di.get('app')()
````

App is factory written as:
```javascript
module.exports = (dependency, should) => {
    return () => {
        console.log(dependency)
        dependency.should.startWith('This string was required via dependency injection (DI)!')
    }
}
```

Notice the arguments of the factory! They're the dependencies we wish to inject!
'dependency' was a module that we registered, while should is an npm package!

## Motivation

This project was build in order to use the 'require' only in place in your code!
Build a 'mapping' module that takes care of your dependencies and simply inject dependencies
as function arguments!

## Tests

node test