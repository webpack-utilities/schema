class ValidationError extends Error {
  constructor (errors, name = '') {
    super()

    this.name = 'ValidationError'
    this.message = `${name} Invalid Options\n\n`

    errors.forEach((err) => {
      const { message, dataPath } = err
      const option = dataPath.replace(/\//g, '.')

      this.message += `options${option} ${message}\n`
    })

    this.errors = errors

    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = ValidationError
