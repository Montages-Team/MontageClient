import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import { createProvider } from './vue-apollo';
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider: createProvider({
    "wsEndpoint": null
  }),
  render: (h) => h(App)
}).$mount('#app');
