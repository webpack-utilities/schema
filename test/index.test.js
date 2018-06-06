const { validateOptions } = require('../src/index.js')

describe('Error', () => {
  test('Success', () => {
    const options = {
      type() {},
      array: [ '' ],
      string: '',
      object: {
        prop: false,
        object: {
          prop: false,
        },
      },
      boolean: true,
      instance: new RegExp('')
    }

    expect(
      validateOptions('test/fixtures/schema.json', options, 'Loader')
    ).toBe(true)
  })

  test('Throws', () => {
    const options = {
      type: null,
      array: {},
      string: false,
      object: {
        prop: 1,
        object: false,
      },
      boolean: '',
      instance() {}
    }

    const validate = () => {
      return validateOptions('test/fixtures/schema.json', options, '{Name}')
    }

    expect(validate).toThrowError()
    expect(validate).toThrowErrorMatchingSnapshot()
  })

  test('Errors', () => {
    const options = {
      type: null,
      array: {},
      string: false,
      object: {
        prop: 1,
        object: false,
      },
      boolean: '',
      instance() {}
    }

    const validate = () => {
      return validateOptions('test/fixtures/schema.json', options, '{Name}')
    }

    try {
      validate()
    } catch (err) {
      const errors = err.errors.map((err) => err.dataPath)

      const expected = [
        '/string',
        '/array',
        '/object/prop',
        '/object/object',
        '/boolean',
        '/type',
        '/instance'
      ]

      expect(errors).toMatchObject(expected)
      expect(err.errors).toMatchSnapshot()
    }
  })

  describe('Messages', () => {
    test('Default', () => {
      const options = {
        type() {},
        array: [ '' ],
        string: 1,
        object: {
          prop: false,
          object: {
            prop: false,
          },
        },
        boolean: true,
        instance: new RegExp('')
      }

      const validate = () => {
        return validateOptions(
          'test/fixtures/schema.json',
          options,
          '{Name}'
        )
      }

      try {
        validate()
      } catch (err) {
        err.errors.forEach((err) => expect(err).toMatchSnapshot())

        expect(err.message).toMatchSnapshot()
      }
    })

    test('Custom', () => {
      const options = {
        type() {},
        array: [ '' ],
        string: 1,
        object: {
          prop: false,
          object: {
            prop: false,
          },
        },
        boolean: true,
        instance: new RegExp('')
      }

      const validate = () => {
        return validateOptions(
          'test/fixtures/errors/schema.json',
          options,
          '{Name}'
        )
      }

      try {
        validate()
      } catch (err) {
        err.errors.forEach((err) => expect(err).toMatchSnapshot())

        expect(err.message).toMatchSnapshot()
      }
    })
  })
})
