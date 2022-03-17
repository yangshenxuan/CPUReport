import { Main } from 'element-ui'
import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/index.vue'
import Layout from '../Layout/index.vue'

const TITLE = process.env.VUE_APP_TITLE    //环境标题

Vue.use(Router)

const router = new Router({
  //平滑滚动
  scrollBehavior:()=>({y:0,behavior:'smooth'}),
  routes: [
    {
      path:'/',
      redirect:'/index'
    },
    {
      path:'/index',
      component: Index,
      meta:{title:`${TITLE}-首页`}
    },
    {
      path:"/main",
      component: Layout,

    }
  ]
})

export default router