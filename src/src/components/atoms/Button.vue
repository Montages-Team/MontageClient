<template lang='pug'>
    div
      sui-button.button-style(:content='content' animated="fade")
</template>

<script lang='ts'>
// style="background: #B464A3; color: #FFF; margin: 0px auto; ;"
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

@Component({})
export default class Button extends Vue {
  @Prop({ type: String})
  private content: string;
}
</script>

<style lang='stylus' scoped>
.button-style
  width 72% !important
  margin 0px auto !important
  background #B464A3

<style>