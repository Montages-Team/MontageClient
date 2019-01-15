<template lang="pug">
  div
    span(v-for="user in users") {{user.username}}
</template>

<script>
  import { ALL_USERS } from '../constants/query';
  export default {
    data: () => ({
      users: [],
    }),
    apollo: {
      users: ALL_USERS,
    },
  };
</script>

<style>

</style>
