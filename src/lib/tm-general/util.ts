/**
 * Find out if a string is withing length constraints
 * @param input String to validate
 * @param max maximum length
 * @param min minimum length (default: 0)
 * @returns {Boolean} Wether the string is too long/short (true means it is).
 */
export function isStringTooLong (input: string, max: number, min: number = 0) {
  if (!input || input?.length === 0) return false
  // eslint-disable-next-line no-useless-escape
  const regex = new RegExp(`[\d\D]{${min},${max}}`)
  return !regex.test(input)
}

/**
 * Escape some special characters by replacing them with " "
 * @param temp String to escape
 * @returns {String} Escaped String (returns empty string when no input is given)
 */
export function escapeString (temp: string): string {
  if (!temp || temp?.length === 0) return ''
  if (isStringTooLong(temp, 100)) return 'Data is too long.'
  const regex = /([\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}])/gu
  if (temp.match(regex)) {
    temp = temp.replace(regex, '\\$1')
  }
  return temp.replace(/(\*|_|~|`)/g, '\\$1')
}

/**
 * Turn text into mocking spongebob meme talk
 * @param str Input String
 * @returns {String} Your result (returns empty string when no input is given)
 */
export function spongetalk (str: string) {
  str = String(str)
  if (!str.length) {
    return ''
  }
  let result = ''
  for (let i = 0; i < str.length; i++) {
    if (Math.random() >= 0.5) {
      result = result.concat(str[i].toUpperCase())
      if (i + 1 < str.length) {
        result = result.concat(str[++i].toLowerCase())
      }
    } else {
      result = result.concat(str[i].toLowerCase())
    }
  }
  return result
}
