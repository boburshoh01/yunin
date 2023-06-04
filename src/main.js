import Vue from "vue";
// import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from "@vue/composition-api";
import axios from "axios";
import i18n from "@/libs/i18n";
import router from "./router";
import store from "./store";
import App from "./App.vue";
import ApiService from "@/services/api.service";

// Global Components
import "./global-components";

// 3rd party plugins
import "@axios";
import "@/libs/acl";
import "@/libs/portal-vue";
import "@/libs/clipboard";
import "@/libs/toastification";
import "@/libs/sweet-alerts";
import "@/libs/vue-select";
import "@/libs/tour";
import VueMask from "v-mask";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import VueCurrencyFilter from "vue-currency-filter";
import MyPlugin from "@/plugins/error/error.plugins";
Vue.use(VueCurrencyFilter, {
  symbol: "$",
  thousandsSeparator: ".",
  fractionCount: 2,
  fractionSeparator: ",",
  symbolPosition: "front",
  symbolSpacing: true,
  avoidEmptyDecimals: undefined,
});
Vue.component("date-picker", DatePicker);
Vue.use(VueMask);
Vue.use(MyPlugin);
import vSelect from "vue-select";
window.onclick = function () {
  store.state.timeForUseLastAPI = 0;
};
if (store.state.timeForUseLastAPI > 3600) {
  this.$logout();
}
Vue.component("v-select", vSelect);

axios.defaults.baseURL = "http://206.189.196.1:5000/";

const token = localStorage.getItem("auth_token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  Vue.prototype.$tokenLifeTimeFunc();
  Vue.prototype.$redirectToLogin();
  // UnreadCountService.Functions.getCount();
}
const requestInterceptor = (request) => {
  request.withCredentials = true;
  return request;
};
axios.interceptors.request.use((request) => requestInterceptor(request));

ApiService.mount401Interceptor();

Vue.use(VueCompositionAPI);

require("@core/assets/fonts/feather/iconfont.css");

require("@core/scss/core.scss");

require("@/assets/scss/style.scss");

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
