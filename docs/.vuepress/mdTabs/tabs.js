const { tabsAttributes } = require('./util')
const container = require('markdown-it-container')

module.exports = md => {
  md.use(container, 'tabs', {
    render: (tokens, idx) => {
      const token = tokens[idx]
      const attributes = tabsAttributes(token.info)

      if (token.nesting === 1) {
        return `<tabs ${attributes} :options="{ useUrlFragment: false }">\n`
      } else {
        return `</tabs>\n`
      }
    }
  })
}
