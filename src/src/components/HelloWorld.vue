<template lang="pug">
  div
    span(v-for="user in users") {{user.username}}
    p {{ hello.msg }}
</template>

<script>
  import { ALL_USERS } from '../constants/query';
  import { gql } from 'apollo-boost';
  export default {
    data: () => ({
      users: [],
      hello: '',
    }),
    apollo: {
      users: ALL_USERS,
      hello: gql`
        query{
          hello @client {
            msg
          }
        }`,
    },
    mounted() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation($msg: String!) {
              updateHello(message: $msg) @client
            }
          `,
          variables: {
            msg: 'hello from link-state!',
          },
        });
    },
  };
</script>

<style>

</style>
