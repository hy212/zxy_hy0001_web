import ZxyTest from "@/ZxyTest.vue";
import WxTest from "@/WxTest.vue";
import { createRouter, createWebHistory } from 'vue-router';
import zxyAuth from "@/ZxyAuth.vue";
const routes = [
    { path: '/', redirect: '/zxy' },
    { path: '/zxy', component: ZxyTest },
    { path: '/zxyAuth', component: zxyAuth },
    { path: '/wx', component: WxTest }
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