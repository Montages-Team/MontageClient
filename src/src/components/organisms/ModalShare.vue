<template lang="pug">
  div
    sui-modal.dimmed(v-if="isMobile" v-model='open' size="tiny")
      //- sui-modal-header.header 質問と回答を共有する
      sui-modal-content.modal-body
        p.heading URLをコピー
        p.url {{this.sharedUrl}}
        p(style="").heading SNSでシェアしよう！
        sui-button-group(vertical)
          a(:href="TwitterShareUrl" target="_blank")
            sui-button.social-margin(basic color='blue', content='Twitter', icon='twitter' size="big")
          a(:href="LineShareUrl" target="_blank")
            sui-button.social-margin(basic color='green', content='LINE', icon='linechat' size="big")
    sui-modal.dimmed(v-else v-model='open' size="tiny")
      sui-modal-header.header 質問と回答を共有する
      sui-modal-content.modal-body
        p.heading URLをコピー
        p.url {{this.sharedUrl}}
        p(style="").heading SNSでシェアしよう！
        sui-button-group(vertical)
          a(:href="TwitterShareUrl" target="_blank")
            sui-button.social-margin(basic color='blue', content='Twitter', icon='twitter' size="big")
          a(:href="LineShareUrl" target="_blank")
            sui-button.social-margin(basic color='green', content='LINE', icon='linechat' size="big")

</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import router from '../../router';
import isMobile from 'ismobilejs';

@Component({
  components: {
  },
})
export default class ModalShare extends Vue {
  private open: boolean = false;
  @Prop({ type: String }) private impressionId!: string;
  @Prop({ type: String }) private questionBody!: string;

  @Emit()
  public toggleShareOpen(): void {
    this.open = !this.open;
  }

  private get isMobile() {
    /**
     * isMobile.jsによってユーザのエージェントを判定できる。
     */
    return isMobile(navigator.userAgent).phone;
  }

  private get sharedUrl() {
    /**
     * シェア用リンクを取得
     */
    return `https://montage.bio/profile/${this.targetUserName}/impression/${this.impressionId}`;
  }

  private get targetUserName() {
    /**
     * シェア用リンクを取得
     */
    return this.$route.params.userName;
  }

  private get TwitterShareUrl() {
    const baseTwitterUrl = `https://twitter.com/intent/tweet`;
    return `${baseTwitterUrl}?text=${this.questionBody}&url=${this.sharedUrl}`;
  }

  private get LineShareUrl() {
    const baseLinechatUrl = `https://social-plugins.line.me/lineit/share`;
    return `${baseLinechatUrl}?url=${this.sharedUrl}&text=${this.questionBody}`;
  }

}
</script>

<style lang="stylus" scoped>
.header
  color white !important
  text-align center
  background linear-gradient(#B464A3,#807DBA) !important

.modal-body
  text-align center
  p.heading
    font-size 120% !important
    font-weight bold
  p.url
    background #eaeaea
    width 100%
    overflow-x hidden
    padding 8px
    font-weight bold
    border-radius 5px

.dimmed
  background rgba(0, 0, 0, 0.4) !important

.social-margin
  margin 4px !important
</style>
