<template lang="pug">
  div
    sui-list.footer-link-box
      a.gray-link(is='sui-list-item', href='/about/', content='Montageについて')
      a.gray-link(is='sui-list-item', href='/contact_us/', content='お問い合わせ')
      a.gray-link(is='sui-list-item', href='/terms/', content='利用規約')
      a.gray-link(is='sui-list-item', href='/privacy_policy/', content='プライバシーポリシー')
      a.gray-link(is='sui-list-item', href='/help/', content='ヘルプ')

</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class Footer extends Vue {
}
</script>

<style lang="stylus" scoped>
  .footer-link-box
    margin 10px !important

  .gray-link
    color #888888 !important

  .image-margin
    margin 0 5px 0 12px !important

  .social-round-icon
    width auto !important

</style>
