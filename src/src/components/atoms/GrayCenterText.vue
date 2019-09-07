<template lang='pug'>
    div
      span.centered-text カテゴリごとに質問を選ぼう!
</template>

<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

@Component({})
export default class GrayCenterText extends Vue {

}
</script>

<style lang="stylus" scoped>
.centered-text
  text-align -webkit-center
  text-align center
  color #AAA
  font-size 12px

</style>