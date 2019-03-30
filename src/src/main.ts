import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import { createProvider } from './vue-apollo';
import '../semantic/dist/semantic.min.css';
import SuiVue from 'semantic-ui-vue';

Vue.use(SuiVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider: createProvider({
    wsEndpoint: null,
  }),
  render: (h) => h(App),
}).$mount('#app');
