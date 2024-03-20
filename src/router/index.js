import ZxyTest from "@/ZxyTest.vue";
import WxTest from "@/WxTest.vue";
import { createRouter, createWebHistory } from 'vue-router';
import zxyAuth from "@/ZxyAuth.vue";
import bmobTest from "@/bmobTest.vue";
const routes = [
    {
        path: '/',
        redirect: '/zxy',
        meta: {
            title: '知晓云SDK测试页面'
        },
    },
    {
        path: '/zxy',
        component: ZxyTest,
        meta: {
            title: '知晓云SDK测试页面'
        },
    },
    {
        path: '/zxyAuth',
        component: zxyAuth,
        meta: {
            title: '知晓云SDK登录授权测试页面（待跑通）'
        },
    },
    {
        path: '/wx',
        component: WxTest,
        meta: {
            title: '微信云开发SDK测试'
        },
    },
    {
        path: '/bmob',
        component: bmobTest,
        meta: {
            title: 'bmob测试页面'
        },
    }
]


// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const routerHistory = createWebHistory();
const router = createRouter({
    routes, // short for `routes: routes`
    history: routerHistory
})
export  default router;