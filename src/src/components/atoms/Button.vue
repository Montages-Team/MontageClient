<template lang='pug'>
    div
      sui-button.buttonstyle__normal(:content='content' @click="emitToggle")
</template>

<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

@Component({})
export default class Button extends Vue {
  @Prop({ type: String})
  private content!: string;

  @Prop({ type: String})
  private placeholder!: string;

  @Prop({ type: String})
  private questionId!: string;

  @Emit()
  public emitToggle() {
    this.$emit('onModalClick', this.placeholder, this.questionId);
  }
}
</script>

<style lang="stylus" scoped>
.buttonstyle__normal
  background #B464A3 !important
  margin 0px 14% !important
  width 72% !important
  color #fff !important
</style>