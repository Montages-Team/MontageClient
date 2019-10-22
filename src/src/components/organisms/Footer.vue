<template lang="pug">
  div
    div.footer-link-box
      div
        router-link.link-style(to="/") ヘルプ
        router-link.link-style(to="/") このサイトについて
        router-link.link-style(to="/terms/") 利用規約
        router-link.link-style(to="/privacy_policy/") プライバシーポリシー
        router-link.link-style(to="/") Collageボタンについて
        a.link-style(href="https://form.run/@montage") お問い合わせ
        router-link.link-style(to="/") 運営について
        a.link-style(href="https://twitter.com/montage_bio") 公式Twitter
      router-link.cp-style(to="/")
        i.creative.commons.icon
        | 2019 Montage
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class Footer extends Vue {
}
</script>

<style lang="stylus" scoped>
.footer-link-box
  text-align center
  padding 40px 20px

.link-style
  display inline-block
  color #9e9e9e
  font-size 12px
  padding 5px
  text-decoration none

.cp-style
  display block
  color #AAA
  font-size 14px
  padding 5px
  text-decoration none
</style>
