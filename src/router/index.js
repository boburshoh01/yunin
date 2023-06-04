import Vue from "vue";
import VueRouter from "vue-router";

const Dashboard = () => import("@/views/dashboard1.vue");
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    { path: "/", redirect: { name: "dashboard" } },
    { path: "/dashboard", name: "dashboard", component: Dashboard },
    {
      path: "*",
      redirect: "error-404",
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.path !== "/login" && !to.meta.redirectIfLoggedIn) {
    if (localStorage.getItem("user_info")) {
      next();
    } else {
      next("login");
    }
  } else {
    next();
  }
});

export default router;
