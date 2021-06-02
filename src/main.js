import Vue from 'vue'
import App from './App.vue'
import router from '@/router'

import store from './components'

Vue.use(store, {
  state: {
    theme: 'light',
    userInfo: {
      avatar: require('@/assets/work_logo.png'),
      nickName: '超级管理员'
    }
  },
  actions: {
    onList() { }
  }
})

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
  router
}).$mount('#app')
