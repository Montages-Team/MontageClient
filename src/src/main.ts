import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import { ApolloClient, InMemoryCache, gql } from 'apollo-boost';
import { withClientState } from 'apollo-link-state';
import { createProvider } from './vue-apollo';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

Vue.use(Buefy);

Vue.config.productionTip = false;

const cache = new InMemoryCache();

const resolvers = {
  Mutation: {
    updateHello(_: any, { message }: {message: any}, { cache }: { cache: any }) {
      const data = {
        hello: {
          __typename: 'Hello',
          msg: message,
        },
      };
      return cache.writeData({ data });
    },
  },
};

const link = withClientState({
  cache,
  resolvers,
  defaults: {
    hello: {
      __typename: 'Hello',
      msg: 'world',
    },
  },
});

new Vue({
  router,
  store,
  apolloProvider: createProvider({
    wsEndpoint: null ,
    link,
    cache,
    connectToDevTools: true,
  }),
  render: (h) => h(App),
}).$mount('#app');
