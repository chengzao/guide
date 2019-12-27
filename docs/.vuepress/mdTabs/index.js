/**
 * 修改自：https://github.com/pskordilakis/vuepress-plugin-tabs
 */

const tabs = require('./tabs')
const tab = require('./tab')

module.exports = (opts) => {
  const defaultOptions = {
    dedupeIds: true,
  }
  const options = Object.assign({}, defaultOptions, opts)
  return {
    enhanceAppFiles: [
      {
        name: 'register-vue-tabs-component',
        content: `import Tabs from 'vue-tabs-component';export default ({ Vue }) => Vue.use(Tabs)`
      }
    ],
    extendMarkdown: md => {
      tabs(md)
      tab(md, options)
    }
  }
}
