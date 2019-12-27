const { tabAttributes } = require('./util')
const container = require('markdown-it-container')

module.exports = (md, options) => {
  md.use(container, 'tab', {
    render: (tokens, idx) => {
      const token = tokens[idx]
      const attributes = tabAttributes(token.info, options)
      if (token.nesting === 1) {
        return `<tab ${attributes}>\n`
      } else {
        return `</tab>\n`
      }
    }
  })
}
