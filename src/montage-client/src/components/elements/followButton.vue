<script>
import { CreateCategory } from '../../constants/category-query.ts';
import { CreateRelation } from '../../constants/follow-query';
import { DeleteRelation } from '../../constants/unfollow-query.ts';

/*
TODO
- [x] unfollow作っておく
- [ ] mutationをべた書きじゃなくする
- [x] queryの中身の精査
- [ ] フォローすると解除を切り替える
- [ ] Vuex

*/

export default {
  data: () => ({}),
  methods: {
    // follow() {
    //   this.$apollo.mutate({
    //     mutation: CreateRelation,
    //     variables: {
    //       followingUserId: 1,
    //       followedUserId: 35
    //     }
    //   }).then(data => {
    //     console.log(data)
    //   });
    // },
    // unfollow() {
    //   this.$apollo.mutate({
    //     mutation: DeleteRelation,
    //   }).then(data => {
    //     console.log(data)
    //   });
    // },
    makecategory() {
      this.$apollo.mutate({
        mutation: CreateCategory,
      }).then(data => {
        console.log(data)
      });
      variables: {
        input: { name: 'hoge'; description: 'fuga' }
      }
    },
  },
}
</script>

<template lang="pug">
  div
    #overlay-follow-prof
        a(href='#' @click='makecategory') +
</template>

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


