<template lang='pug'>
    div
      div.centered-text カテゴリごとに質問を選ぼう!
</template>

<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

@Component({})
export default class GrayCenterText extends Vue {

}
</script>

<style lang="stylus" scoped>
.centered-text
  text-align center
  color #AAA
  font-size 12px
  margin: 4px 0px 24px

</style>