<template lang="pug">
  div.wrapper
    div.content-wrapper(is='sui-container' textAlign='center')
      img.logo(src='@/assets/icon.svg')
      h5.catch_copy(is='sui-header') 友達も、好きな人も、自由にイジろう
      DimButton(label='はじめる')
      div
        i.angle.double.down.icon(style="color: #ffffff;")
      h5.catch_copy(is='sui-header') Montageとは?
      FeatureColumnGroup.flex-column
      DimButton(label='はじめる')
</template>

<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import DimButton from '../atoms/DimButton.vue';
import Footer from '../organisms/Footer.vue';
import FeatureColumnGroup from '../organisms/FeatureColumnGroup.vue';

@Component({
  components: {
    DimButton,
    FeatureColumnGroup,
    Footer,
  },
})
export default class Home extends Vue {}
</script>

<style lang="stylus" scoped>
.wrapper
  width 100vw
  background linear-gradient(#B464A3,#807DBA)
  margin unset !important

.content-wrapper
  padding-top 150px !important

.logo
  width 232px
  height auto
  margin-left 20px

.catch_copy
  margin 4px 0px !important
  color #FFFFFF !important
  font-weight unset !important

@media screen and (min-width:1100px)
  .flex-column
    display flex
</style>
