<template lang='pug'>
    div
      sui-button.buttonstyle__modal(v-if="content === 'キャンセル'" :content='content' size="small" compact=true @click="emitCancel" :style="{background: backgroundColor}")
      sui-button.buttonstyle__modal(v-if="content === '投稿する'" :content='content' size="small" compact=true @click="emitPost" :style="{background: backgroundColor}")
</template>

<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

@Component({})
export default class ConfirmButton extends Vue {
  @Prop({type: String})
  private content!: string;

  @Prop({type: String})
  private backgroundColor!: string;

  @Emit()
  private emitCancel() {
    this.$emit('cancelImpression');
  }

  @Emit()
  private emitPost() {
    this.$emit('emitPost');
  }
}
</script>

<style lang="stylus" scoped>
.buttonstyle__modal
  color #fff !important
  font-weight inherit !important
</style>