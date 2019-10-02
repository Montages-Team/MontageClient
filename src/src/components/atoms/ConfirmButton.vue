<template lang='pug'>
    div
      sui-button.buttonstyle__modal(v-if="content === 'キャンセル'",
                                    :content='content' size="tiny",
                                    compact=true,
                                    @click="emitCancel",
                                    :style="{background: backgroundColor}")
      sui-button.buttonstyle__modal(v-if="content === '投稿する'",
                                    :content='content',
                                    size="tiny",
                                    compact=true,
                                    @click="emitPost",
                                    :style="{background: backgroundColor}")
      sui-button.buttonstyle__modal(v-if="content === 'Collage'",
                                    :content='content',
                                    size="tiny",
                                    compact=true,
                                    @click="emitPost",
                                    :style="{background: backgroundColor}")
</template>

<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

@Component({})
export default class ConfirmButton extends Vue {
  public isCollage: boolean = false;

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
    if (this.content === 'Collage') {
      this.isCollage = true;
    }
    this.$emit('emitPost', this.isCollage);
  }
}
</script>

<style lang="stylus" scoped>
.buttonstyle__modal
  color #fff !important
  font-weight inherit !important
</style>