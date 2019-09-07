<template lang='pug'>
    div
      sui-button.buttonstyle(:content='content')
</template>

<script lang='ts'>
// style="background: #B464A3; color: #FFF; margin: 0px auto; ;"
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

@Component({})
export default class Button extends Vue {
  @Prop({ type: String})
  private content!: string;
}
</script>

<style lang="stylus" scoped>
.buttonstyle
  background #B464A3 !important
  margin 0px 14% !important
  width 72% !important
  color #fff !important
</style>