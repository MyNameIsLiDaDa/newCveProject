// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import { Card, Tag, Radio } from "ant-design-vue";
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';

import 'ant-design-vue/dist/antd.css';

import axios from 'axios'

import './styles/index.css'

Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.use(ElementUI);
// Vue.component(Card.name, Card)
// Vue.component(Tag.name, Tag)
// Vue.component(Radio.Group.name, Radio.Group)
// Vue.component(Button.Group.name, Button.Group)
// Vue.use({Radio, Card, Tag});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
