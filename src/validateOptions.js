const fs = require('fs')
const path = require('path')

const Ajv = require('ajv')
const errors = require('ajv-errors')
const keywords = require('ajv-keywords')

const ValidationError = require('./Error.js')

const ajv = new Ajv({
  allErrors: true,
  jsonPointers: true
})

errors(ajv)
keywords(ajv, [ 'typeof', 'instanceof' ])

const validateOptions = (schema, options, name) => {
  if (typeof schema === 'string') {
    schema = fs.readFileSync(path.resolve(schema), 'utf8')
    schema = JSON.parse(schema)
  }

  if (!ajv.validate(schema, options)) {
    throw new ValidationError(ajv.errors, name)
  }

  return true
}

module.exports = validateOptions
