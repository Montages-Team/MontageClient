import Vue from 'vue';
import './plugins/vuetify'
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import { createProvider } from './vue-apollo';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider: createProvider({
    "wsEndpoint": null
  }),
  render: (h) => h(App)
}).$mount('#app');
