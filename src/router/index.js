import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login.vue'
import Index from '@/views/index.vue'
import Haunying from '../views/huanying.vue'
import postList from '../views/postList.vue'
import Fabu from '../views/fabu.vue'

Vue.use(VueRouter)

let  router =new VueRouter({
    routes:[
        {
         name:'Login',
         path:'/login',
         component:Login
        },
        {
            name:'Index',
            path:'/index',
            component:Index,
            //重定向，一出来就显示这个欢迎的页面
            redirect:{name:'Haunying'},
            children:[
             {
              name:'Haunying',
              path:'haunying',
              component:Haunying
             },
             {
              name:'postList',
              path:'postList',
              component:postList
             },
             {
                name:'Fabu',
                path:'fabu/:id?',
                component:Fabu
               }
            ]
        }
    ]
})



//添加一个导航守卫 
router.beforeEach((to, from, next) => {
   if(to.path==='/login'){
    next()
   }else{
       if(localStorage.getItem('token')){
         next();
       }else{
        next('/login');
       }
   }
  })

export default router