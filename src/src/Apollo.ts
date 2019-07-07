import { mutations, cache } from './constants/mutations';
import { withClientState } from 'apollo-link-state';
import { createProvider } from './vue-apollo';

const resolvers = {
  Mutation: mutations,
};

const link = withClientState({
  cache,
  resolvers,
  defaults: {
    hello: {
      __typename: 'Hello',
      msg: 'world!',
    },
  },
});

export const createdVueApollo = createProvider({
    wsEndpoint: null ,
    link,
    cache,
    connectToDevTools: true,
  });
