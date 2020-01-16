import Vue from 'vue'
import App from './App.vue'
//引入框架
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入路由
import router from '@/router/index'
//引入重置样式
import '@/styles/index.less'


Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
