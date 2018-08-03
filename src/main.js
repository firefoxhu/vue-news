/* eslint-disable */
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import AMap from 'vue-amap'

import 'common/stylus/index.styl'

fastclick.attach(document.body)

Vue.use(VueLazyLoad, {
	loading: require('common/image/default.png')
})
Vue.use(AMap)

AMap.initAMapApiLoader({
  // 高德的key
  key: '584dbe5784fa643bb2d979a8578dba9c',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
})