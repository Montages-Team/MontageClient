<template lang="pug">
  div
    span(v-for="user in users") {{user.username}}
    p {{ hello.msg }}
</template>

<script>
  import { ALL_USERS } from '../constants/query';
  import { gql } from 'apollo-boost';
  const hello_query_cache = gql`
        query{
          hello @client {
            msg
          }
        }`;
  const hello_mutation_cache = gql`
            mutation($msg: String!) {
              updateHello(message: $msg) @client
            }
          `;

  export default {
    data: () => ({
      users: [],
      hello: '',
    }),
    apollo: {
      users: ALL_USERS,
      hello: hello_query_cache,
    },
    mounted() {
      this.$apollo
        .mutate({
          mutation: hello_mutation_cache,
          variables: {
            msg: 'hello from link-state!',
          },
        });
    },
  };
</script>

<style>

</style>
