<script>
import { ALL_USERS } from '../../constants/query';
// import { CreateRelation } from '../../constants/follow-query';
import { CreateCategory } from '../../constants/category-query.ts';

const followingUserId = 1
const followedUserId = 4
export default {
  data: () => ({
    users: [],
  }),
  // これはfetchしてくる場合
  apollo: {
    users: ALL_USERS,
  },
  methods: {
    follow() {
      // データで一回取ったものを再取得するにはこうする
      // this.$apollo.queries.users.refetch()
      // console.log(this.users)
      console.log('categoryします')
      this.$apollo.mutate({
        // mutation: CreateRelation,
        mutation: CreateCategory,
        variables: {
          // followingUserId: followingUserId,
          // followedUserId: followedUserId,
          input: { name: 'お買い物', description: '甲斐光彦のお買い物情報を垂れ流す' }
        }
      }).then(data => {
        console.log('thenのとき')
        console.log(data)
      });
    },
    unfollow() {


    }
  },
}
</script>

<template lang="pug">
  div
    #overlay-follow-prof
        a(href='#' @click='follow') +
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
