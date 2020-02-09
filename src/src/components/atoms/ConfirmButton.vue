<template lang='pug'>
    div
      sui-button.buttonstyle__modal(:content='content'
                                    size="standard"
                                    compact=true
                                    @click="emitHandler"
                                    :style="{background: buttonBackgrondColor}")
</template>

<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

@Component({})
export default class ConfirmButton extends Vue {
  public isCollage: boolean = false;

  @Prop({type: String})
  private content!: string;

  private get buttonBackgrondColor() {
    /**
     * ボタンが発行するメソッドを切り替えるハンドラーメソッド
     *
     * - キャンセルボタン -> 親コンポーネントのキャンセル
     * - Collage or 投稿ボタン -> 親コンポーネントの投稿メソッド
     */
    if (this.content === 'キャンセル') {
      return '#dddddd';
    } else {
      return '#B464A3';
    }
  }

  @Emit()
  private emitHandler() {
    /**
     * ボタンが発行するメソッドを切り替えるハンドラーメソッド
     *
     * - キャンセルボタン -> 親コンポーネントのキャンセル
     * - Collage or 投稿ボタン -> 親コンポーネントの投稿メソッド
     */
    if (this.content === 'キャンセル') {
      this.emitCancel();
    } else {
      this.emitPost();
    }
  }

  @Emit()
  private emitCancel() {
    /**
     * 親コンポーネントの`@cancelImpression`で呼ばれているメソッドを実行する
     */
    this.$emit('cancelImpression');
  }

  @Emit()
  private emitPost() {
    /**
     * 親コンポーネントの`@emitPost`で呼ばれているメソッドを実行する
     */
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