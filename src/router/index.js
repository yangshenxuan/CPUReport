import { Main } from "element-ui";
import Vue from "vue";
import Router from "vue-router";
import Index from "../views/index.vue";
import Layout from "../Layout/index.vue";
import main from "../views/main.vue";
import Theory from "../views/theory.vue";
import Simulation from "../views/simulation.vue";
import Theoretical from "../views/theoretical.vue";
import Examine from "../views/examine.vue";

const TITLE = process.env.VUE_APP_TITLE; //环境标题
Vue.use(Router);

const router = new Router({
  //平滑滚动
  scrollBehavior: () => ({ y: 0, behavior: "smooth" }),
  routes: [
    {
      path: "/",
      redirect: "/index",
    },
    {
      path: "/index",
      component: Index,
      meta: { title: `${TITLE}-首页` },
    },
    {
      path: "/main",
      component: Layout,
      redirect: { name: "dashboard" },
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: main,
        },
        {
          path: "theory",
          name: "theory",
          component: Theory,
        },
        {
          path: "simulation",
          name: "simulation",
          component: Simulation,
        },
        {
          path: "theoretical",
          name: "theoretical",
          component: Theoretical,
        },
      ],
    },
    {
      path: "/examine",
      name: "examine",
      component: Examine,
      meta: { title: `理论试卷-${TITLE}` },
    },
    //后台管理
    {
      path: "/management",
      component: () => import("@/views/management/index"),
      redirect: { name: "user" },
      children: [
        {
          path: "user",
          name: "user",
          component: () => import("@/views/management/user"),
          meta: { title: "用户管理" },
        },
        {
          path: "simulationScore",
          name: "simulationScore",
          component: () => import("@/views/management/simulationScore"),
        },
        {
          path: "examineScore",
          name: "examineScore",
          component: () => import("@/views/management/examineScore"),
        },
        { 
          path: "ratingSettings" ,
          name:'ratingSettings',
          component:() => import("@/views/management/ratingSettings")
        },
      ],
    },
  ],
});

export default router;
