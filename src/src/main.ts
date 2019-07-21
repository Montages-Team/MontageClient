import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import { createProvider } from './vue-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
// import { onError } from "apollo-link-error";
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import '../semantic/dist/semantic.min.css';
import SuiVue from 'semantic-ui-vue';

Vue.use(SuiVue);

Vue.config.productionTip = false;

const authLink = setContext((_, { headers }) => {
  // もし存在すればauthentication tokenをローカルストレージから取得する
  // const token = localStorage.getItem('token');
  // httpLinkがコンテキストを読み込んだらヘッダーに返す
  const hoge = 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFt\
  ZSI6InJhZ3VuYTkyMyIsImV4cCI6MTU0MTMxNjQxNywib3JpZ0lhdCI6MTU0MTMx\
  NjExN30.hjbm6Yhdip03_Y5LBUNxDQsSQ2InUDi4sF48lkK-DhA';
  const token = localStorage.getItem('token');
  return {
    credentials: 'include', // Send the cookies
    compress: true,
    headers: {
      'Content-Type': 'application/json',
      // 'authorization': hoge,
      'authorization': token ? `Bearer ${token}` : '',
    },
  };
});
// const errorLink = onError(({ networkError }) => {
//   if (networkError.statusCode === 401) {
//     console.log('errorです');
//   }
// });

// HTTP connexion to the API
const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: 'https://montage-graphql-api.herokuapp.com/gql/',
  // uri: 'localhost:8000/gql/',
  fetchOptions: {
    mode: 'no-cors',
  },
});

// Cache implementation
const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

const apolloProvider = createProvider({
    defaultClient: apolloClient,
  });

new Vue({
  router,
  store,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#app');
