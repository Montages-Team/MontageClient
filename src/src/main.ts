import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import { createdVueApollo } from './Apollo';

Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider: createdVueApollo,
  render: (h) => h(App),
}).$mount('#app');
