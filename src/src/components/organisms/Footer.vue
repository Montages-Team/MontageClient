<template lang="pug">
  div
    ul.footer-link-box
      li
        router-link.footer-margin(to="/terms/") 利用規約
      li
        router-link.footer-margin(to="/faq/") よくある質問
      li
        router-link.footer-margin(to="/privacy_policy/") プライバシーポリシー
      li
        a.footer-margin(href="") お問い合わせ
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class Footer extends Vue {
}
</script>

<style lang="stylus" scoped>
.footer-link-box
  display: inline-block;
  vertical-align: middle;
  margin: 50px 0;
  font-size: 0;

.footer-link-box li
  margin: 0 10px;
  display: inline-block;
  line-height: 1.8;
  font-size: 14px;
  letter-spacing: 0.05em;

.gray-link
  color #888888 !important

.image-margin
  margin 0 5px 0 12px !important

.social-round-icon
  width auto !important

.footer-margin
  margin 8px !important

li
  margin 0 10px
  display inline-block
  line-height 1.8
  font-size 14px
  letter-spacing 0.05em

@media screen and (max-width: 1100px)
  .footer-link-box
    margin 0px 12%

@media screen and (max-width: 900px)
  // タブレットより小さいものはこっちが適用
  .footer-link-box
    margin 30px 0 20px 0

  .footer li
    font-size 13px

</style>
