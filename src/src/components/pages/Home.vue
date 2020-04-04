<template lang="pug">
  div.wrapper
    div.content-wrapper(is='sui-container' textAlign='center')
      img.logo(src='@/assets/icon.svg')
      h5.catch-copy(is='sui-header') 友達も、好きな人も、自由にイジろう
      DimButton(label='Twitterではじめる')
      div.twitter-annotation ※勝手にツイートやフォローをすることはありません。
      div.term-policy-block
        router-link(to="/terms/") 利用規約
        span /
        router-link(to="/privacy_policy") プライバシーポリシー
      div
        i.angle.double.down.icon(style="color: #ffffff;")
      h5.catch-copy(is='sui-header') montage.bioとは?
      FeatureColumnGroup.flex-column
      DimButton(label='Twitterではじめる')
      div.twitter-annotation ※勝手にツイートやフォローをすることはありません。
</template>

<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

const DimButton = () => import(
  /* webpackChunkName: "dim-button" */
  '../atoms/DimButton.vue');

const FeatureColumnGroup = () => import(
  /* webpackChunkName: "feature-column-group" */
  '../organisms/FeatureColumnGroup.vue');

@Component({
  components: {
    DimButton,
    FeatureColumnGroup,
  },
  head: {
    title: {
      inner: 'ホーム',
      separator: '/',
    },
    meta: [
      {
         name: 'description',
         content: 'montage.bioのメインページ。',
      },
    ],
  },
})
export default class Home extends Vue {
}
</script>

<style lang="stylus" scoped>
.wrapper
  width 100vw
  height 85vh !important
  background linear-gradient(#B464A3,#807DBA)
  margin unset !important

.content-wrapper
  padding-top 150px !important

.logo
  width 232px
  height auto
  margin-left 20px

.catch-copy
  margin 4px 0px !important
  color #FFFFFF !important
  font-weight unset !important

.twitter-annotation
  padding 0 0 20px 0 !important
  font-size 10px !important
  color #FFFFFF !important

.term-policy-block
  text-align center
  font-size 13px
  color #999 !important
  padding 12px

.term-policy-block > a, .term-policy-block > span
  display inline-block
  color #ffffff
  margin 0px 3px
  font-weight bold

@media screen and (min-width:1100px)
  .flex-column
    display flex
</style>
