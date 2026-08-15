/**
 * Dependency-free form validation helpers.
 */

/** Returns true if the value is non-empty after trimming. */
export function isRequired(value) {
  return String(value ?? '').trim().length > 0
}

/** Returns true if the value matches a basic email pattern. */
export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value ?? '').trim())
}

/**
 * Validates a values object against a rules map and returns an errors object.
 *
 * @param {Record<string, string>} values   - Current field values keyed by field name.
 * @param {Record<string, string[]>} rules  - Rules per field, e.g. { email: ['required', 'email'] }
 * @returns {Record<string, string>}        - { fieldName: 'Error message' } for each failing field.
 *
 * Supported rule strings: 'required', 'email'
 */
export function validateFields(values, rules) {
  const errors = {}

  for (const [field, fieldRules] of Object.entries(rules)) {
    const value = values[field] ?? ''

    for (const rule of fieldRules) {
      if (rule === 'required' && !isRequired(value)) {
        errors[field] = 'This field is required.'
        break
      }
      if (rule === 'email' && isRequired(value) && !isValidEmail(value)) {
        errors[field] = 'Please enter a valid email address.'
        break
      }
    }
  }

  return errors
}
