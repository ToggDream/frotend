// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false;

import ElementUI from 'element-ui';                               //element
import usePrototype from '@/assets/js/prototype';                 //定义全局的prototype
import axiosInterceptor from '@/assets/js/interceptor';           //拦截器
import useMock from "@/mock";                                     //mock模拟数据
import store from "@/assets/js/store"                             //vuex

useMock(false);                                                     //mock开关

Vue.use(usePrototype);

import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/scss/common/element_modify.scss';
Vue.use(ElementUI);
//音频
import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer);




//全局scss-在util中引入了---common.scss
//定义全局components
import '@/assets/js/golbalTemplate.js'

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
