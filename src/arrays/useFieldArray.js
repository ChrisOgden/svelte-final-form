/* eslint-disable no-shadow */
import useForm from '../useForm'
import useField from '../useField'
import { fieldSubscriptionItems, ARRAY_ERROR } from 'final-form'
import defaultIsEqual from './defaultIsEqual'
import { derived } from 'svelte/store';

// This is a port of useFieldArray from react-final-form-arrays
// Compare to/reference:
// - react-final-form-arrays/src/useFieldArray.js
// - react-final-form-arrays/src/FieldArray.js

const all = fieldSubscriptionItems.reduce((result, key) => {
  result[key] = true
  return result
}, {})

const useFieldArray = (
  name,
  config = {},
) => {
  const {
    subscription = all,
    defaultValue,
    initialValue,
    isEqual = defaultIsEqual,
    validate: validateProp
  } = config

  const form = useForm()

  const formMutators = form.mutators
  const hasMutators = !!(formMutators && formMutators.push && formMutators.pop)
  if (!hasMutators) {
    throw new Error(
      'Array mutators not found. You need to provide the mutators from final-form-arrays to your form'
    )
  }
  const mutators =
    // curry the field name onto all mutator calls
    Object.keys(formMutators).reduce((result, key) => {
      result[key] = (...args) => formMutators[key](name, ...args)
      return result
    }, {})

  // https://final-form.org/docs/final-form/types/FieldConfig#getvalidator
  const validate = (value, allValues, meta) => {
    if (!validateProp) return undefined
    const error = validateProp(value, allValues, meta)
    if (!error || Array.isArray(error)) {
      return error
    } else {
      const arrayError = [];
      ((arrayError))[ARRAY_ERROR] = error
      return arrayError
    }
  }

  const field = useField(
    name,
    {
      subscription: {
        ...subscription,
        length: true
      },
      defaultValue,
      initialValue,
      isEqual,
      validate,
      format: v => v
    }
  )

  const fieldsStore = derived(
    field,
    $field => {
      const {
        input,
        meta: origMeta,
      } = $field

      const {
        length,
        error,
        invalid,
        valid,
      } = origMeta
      // Only include the meta props that are actually useful. Some props of origMeta, such as active, don't really apply to array fields. See https://codesandbox.io/s/react-final-form-field-arrays-forked-7nire?file=/index.js
      const meta = {
        length,
        error,
        invalid,
        valid,
      }

      // This allows us to "use" the field array (and get meta about it) without incurring the cost of
      // iteration unless we actually want to iterate.
      const forEach = (iterator) => {
        const len = length || 0
        for (let i = 0; i < len; i++) {
          iterator(`${name}[${i}]`, i)
        }
      }

      const map = (iterator) => {
        const len = length || 0
        const results = []
        for (let i = 0; i < len; i++) {
          results.push(iterator(`${name}[${i}]`, i))
        }
        return results
      }

      const fields = {
        name,
        forEach,
        length: meta.length || 0,
        map,
        ...mutators,
        // ...fieldState,
        // value: input.value,
        value: input.value,

        // Needs to be an array so that we can use {#each}
        // fields.names = () => ['a', 'b']
        names: () => map((name, _i) => name),
      }

      console.log(`FieldArray fieldState for ${name}:`, fields.names())
      return {
        fields,
        meta,
      }
    }
  )
  return fieldsStore
}

export default useFieldArray
