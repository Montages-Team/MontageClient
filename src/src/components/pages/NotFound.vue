<template lang="pug">
    div(style="margin: unset;")
      div.notfound-wrapper
        h1.notfound-title @{{$route.params.userName}} さんは見つかりませんでした
        div.notfound-content-wrapper
          p.notfound-description
            | URLをクリックしてこのページにたどり着いた場合は、リンクが間違っているかもしれません
          p.notfound-description
            | お友達にURLが間違っていることを投稿者に教えてあげてください!
        router-link(v-if="this.$parent.isAuthenticated === true" :to="{name: 'profile', params: { userName: this.$auth.profile['https://montage.bio/screen_name'] }}")
          button.toplink TOPへ戻る
        router-link(v-else :to="{ name: 'home' }")
          button.toplink TOPへ戻る
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

@Component({
  head: {
    title: {
      inner: 'NOT FOUND',
      separator: '/',
    },
    meta: [
      {
         name: 'description',
         content: 'montage.bioのNOT FOUNDページ。',
      },
    ],
  },
})
export default class NotFound extends Vue {
}
</script>

<style lang='stylus' scoped>
.notfound-wrapper
  margin 16px
  padding 16px
  background #FFF
  border-radius 4px

.notfound-title
  font-size 18px
  margin-bottom 8px
  padding-bottom 4px
  border-bottom 2px solid #9274b2

.notfound-description
  font-size 16px
  color #666666
  letter-spacing 1px
  line-height 1.8
  margin-bottom 12px
  padding 8px 0

.notfound-content-wrapper
  margin 8px

.toplink
  display block
  color white
  border unset
  height 30px
  width 30%
  background rgba(0, 0, 0, 0.27)
  font-size 90%
  padding 7px
  border-radius 5px
  margin 16px auto
</style>