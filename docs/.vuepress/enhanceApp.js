// 全局注册 Element 组件库
// import Element from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

export default ({
  Vue,
  options, // 附加到根实例的一些选项
  router,
  siteData // 站点元数据
}) => {
  // Vue.use(Element)
  // console.log(siteData)
  router.addRoutes([
    {
      path: "/todo",
      component: () => import("./components/Todo.vue")
    }
  ]);

  // 自动跳转到web页面
  // router.beforeEach((to, from, next) => {
  //   if (to.path === "/") {
  //     router.push("/web/");
  //   } else {
  //     next();
  //   }
  // });
};
