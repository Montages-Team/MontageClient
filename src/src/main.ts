import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import { createProvider } from './vue-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';

import '../semantic/dist/semantic.min.css';
import SuiVue from 'semantic-ui-vue';
import AuthPlugin from './plugins/auth';

Vue.config.productionTip = false;
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
      );
    }

    if (networkError) {
       console.log(`[Network error]: ${networkError}`);
    }
});

// HTTP connexion to the API
const httpLink = new HttpLink({
  // uri: 'https://montage-graphql-api.herokuapp.com/gql/',
  uri: 'localhost:8000/gql/',
});

// Cache implementation
const cache = new InMemoryCache();
// const link = authLink.concat(httpLink);
const link = httpLink;
const apolloClient = new ApolloClient({
  link,
  cache,
});

const apolloProvider = createProvider({
    defaultClient: apolloClient,
    defaultOption: errorLink,
});

Vue.use(SuiVue);
Vue.use(AuthPlugin);

new Vue({
  router,
  store,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#app');
