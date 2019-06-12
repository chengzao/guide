// 全局注册 Element 组件库
// import Element from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  // ...做一些其他的应用级别的优化
  // Vue.use(Element)
  // console.log(siteData)
  router.addRoutes([
    {
      path: '/todo',
      component: () => import('./components/Todo.vue')
    }
  ])

  var initConfig = {}

  Vue.mixin({
    methods: {
      appendDom(dom) {
        dom.innerHTML = 'Top';
        dom.className = 'backTop';
        dom.onclick = function () {
          window.scrollTo(0, 0)
        }
        document.body.append(dom)
        initConfig.dom = true
      }
    },
    mounted() {
      var dom = document.createElement('div');
      if (initConfig.dom) {
        return false
      }
      this.appendDom(dom)
      var doc = document.documentElement || document.body
      var scrollTop = doc.scrollTop;
      var clientHeight = doc.clientHeight;
      dom.className = scrollTop < clientHeight / 2 ? 'backTop hide' : 'backTop'
      window.addEventListener('scroll', function () {
        scrollTop = doc.scrollTop;
        clientHeight = doc.clientHeight;
        dom.className = scrollTop < clientHeight / 2 ? 'backTop hide' : 'backTop'
      })
    },
  })

  // 自动跳转到web页面
  router.beforeEach((to, from, next) => {
    if (to.path === '/') {
      router.push('/web/')
    } else {
      next()
    }
  })
}
