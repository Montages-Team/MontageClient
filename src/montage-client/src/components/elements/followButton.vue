<template lang="pug">
  div
    #overlay-follow-prof
        a(href='#' @click='unfollow') +
</template>

<script>
import { CreateRelation } from '../../constants/follow-query';
import { DeleteRelation } from '../../constants/unfollow-query';

/*
TODO
- [x] unfollow作っておく
- [x] mutationをべた書きじゃなくする
- [x] queryの中身の精査
- [x] フォローすると解除を切り替える
- [ ] Vuex

*/

export default {
  data: () => ({
    loggined_user_id,
    user_id,
    relation_id,
  }),
  methods: {
    follow() {
      this.$apollo.mutate({
        mutation: CreateRelation,
        variables: {
          followingUserId: this.loggined_user.id,
          followedUserId: this.user.id,
        },
      });
    },
    unfollow() {
      this.$apollo.mutate({
        mutation: DeleteRelation,
        variables: {
          id: this.relation_id,
        },
      });
    },
  },
};
</script>

<style lang="stylus">
#overlay-follow-prof
  width: 30px;
  height: 30px;
  margin 15px
  padding 0px 10px
  color white
  background #7957d5
  border-radius 100%
</style>
