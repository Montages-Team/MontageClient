<template lang="pug">
  div
    a(href='#' @click='follow')
      .follow_button +
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
    loggined_user_id: null,
    user_id: null,
    relation_id: null,
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
a:link, a:visited
  color #aaa
  font-weight bold
  &:hover
    color #888

.follow_button
  width 30px
  height 30px
  margin 15px
  padding 3px 10px
  background #eee
  border-radius 100%
  box-shadow 1px 1px 1px #aaa

</style>
