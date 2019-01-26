import { InMemoryCache } from 'apollo-boost';
export const cache = new InMemoryCache();

export const mutations = {
  updateHello: (_: any, { message }: {message: any}) => {
    const data = {
      hello: {
        __typename: 'Hello',
        msg: message,
      },
    };
    cache.writeData({ data });
    return null;
  },
};
