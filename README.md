[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![test][test]][test-url]
[![coverage][cover]][cover-url]
[![code style][style]][style-url]
[![chat][chat]][chat-url]

<div align="center">
  <a href="http://json-schema.org">
    <img width="160" height="160"
      src="https://raw.githubusercontent.com/webpack-utilities/schema/master/.github/assets/logo.png">
  </a>
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <h1>Schema Utils</h1>
  <p>Options Validation for Loaders/Plugins</p>
</div>

<h2 align="center">Install</h2>

```bash
npm i @webpack-utilities/schema
```

<h2 align="center">Usage</h2>

### `validateOptions(schema, options, title)`

**schema.json**
```js
{
  "type": "object",
  "properties": {
    "option": {
      "type": [ "boolean" ]
    }
  },
  "errorMessage": {
    "option": "should be {Boolean} (https:/github.com/org/repo#anchor)"
  }
  "additionalProperties": false
}
```

```js
import schema from 'path/to/schema.json'
import { validateOptions } from '@webpack-utilities/schema'

validateOptions(schema, options, 'Loader/Plugin Name')
```

<h2 align="center">Examples</h2>

**options.json**
```js
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "test": {
      "anyOf": [
        { "type": "array" },
        { "type": "string" },
        { "instanceof": "RegExp" }
      ]
    },
    "transform": {
      "instanceof": "Function"
    },
    "sourceMap": {
      "type": "boolean"
    }
  },
  "additionalProperties": false
}
```

### `Loader`

```js
import { getOptions } from '@webpack-utilities/loader'
import { validateOptions } from '@webpack-utilities/schema'

import schema from 'path/to/options.json'

function loader (src, map) {
  const options = getOptions(this) || {}

  validateOptions(schema, options, 'Loader Name')

  // Code...
}
```

### `Plugin`

```js
import schema from 'path/to/options.json'
import { validateOptions } from '@webpack-utilities/schema'

class Plugin {
  constructor (options) {
    validateOptions(schema, options, 'Plugin Name')

    this.options = options
  }

  apply (compiler) {
    // Code...
  }
}
```


[npm]: https://img.shields.io/npm/v/@webpack-utilties/schema.svg
[npm-url]: https://npmjs.com/package/@webpack-utilties/schema

[node]: https://img.shields.io/node/v/@webpack-utilties/schema.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-utilities/schema.svg
[deps-url]: https://david-dm.org/webpack-utilities/schema

[test]: http://img.shields.io/travis/webpack-utilities/schema.svg
[test-url]: https://travis-ci.org/webpack-utilities/schema

[cover]: https://img.shields.io/coveralls/github/webpack-utilities/schema.svg
[cover-url]: https://coveralls.io/github/webpack-utilities/schema

[style]: https://img.shields.io/badge/code%20style-standard-yellow.svg
[style-url]: http://standardjs.com/

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
