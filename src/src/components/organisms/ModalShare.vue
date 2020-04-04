<template lang="pug">
  div
    sui-modal.dimmed(v-if="isMobile" v-model='open' size="tiny")
      sui-modal-content.modal-body
        div(v-show="copied").ui.yellow.message {{ copiedMessage }}
        p.heading {{ headingCopyTitle }}
        p.clipcopy(:data-clipboard-text="this.sharedUrl" @click="CopyExecuted()").url
          | {{this.sharedUrl}}
        p.heading {{ headingShareTitle }}
        sui-button-group(vertical)
          a(:href="TwitterShareUrl" target="_blank")
            sui-button.social-margin(basic color='blue', content='Twitter', icon='twitter' size="big")
          a(:href="LineShareUrl" target="_blank")
            sui-button.social-margin(basic color='green', content='LINE', icon='linechat' size="big")
    sui-modal.dimmed(v-else v-model='open' size="tiny")
      sui-modal-header.header 質問と回答を共有する
      sui-modal-content.modal-body
        div(v-show="copied").ui.yellow.message {{ copiedMessage }}
        p.heading {{ headingCopyTitle }}
        p.clipcopy(:data-clipboard-text="this.sharedUrl" @click="CopyExecuted()").url
          | {{this.sharedUrl}}
        p.heading {{ headingShareTitle }}
        sui-button-group(vertical)
          a(:href="TwitterShareUrl" target="_blank")
            sui-button.social-margin(basic color='blue', content='Twitter', icon='twitter' size="big")
          a(:href="LineShareUrl" target="_blank")
            sui-button.social-margin(basic color='green', content='LINE', icon='linechat' size="big")

</template>

<script lang="ts">
import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import router from '../../router';
import isMobile from 'ismobilejs';

@Component({
})
export default class ModalShare extends Vue {
  private open: boolean = false;
  private copied: boolean = false;
  private headingCopyTitle: string = 'URLをコピー';
  private headingShareTitle: string = 'SNSでシェアしよう！';
  private copiedMessage: string = 'URLをコピーしました！';
  @Prop({ type: String }) private impressionId!: string;
  @Prop({ type: String }) private questionBody!: string;

  @Emit()
  public toggleShareOpen(): void {
    /**
     * URL共有用モーダルを切り替える関数。
     *
     * 開いた状態から閉じる時のみ、コピーをしたかどうか判定する変数copiedをfalseへ戻す。
     */
    if (this.open === false) {
      this.copied = false;
    }
    this.open = !this.open;
  }

  @Watch('open')
  public toggleScroll() {
    const modal: any = document.querySelector('.modals');
    if (this.open === true) {
      disableBodyScroll(modal);
    } else {
      enableBodyScroll(modal);
    }
  }

  @Emit()
  public CopyExecuted() {
    /**
     * コピー実行後に実行される関数
     *
     * アラートの表示を切り替える変数copiedをtrueにする
     */
    this.copied = true;
  }

  private get isMobile() {
    /**
     * isMobile.jsによってユーザのエージェントを判定できる。
     */
    return isMobile(navigator.userAgent).phone;
  }
  private get domainName() {
    /**
     * ドメインを取得
     */
    if (process.env.NODE_ENV === 'production') {
      return `https://montage.bio`;
    } else {
      return `http://localhost:8080`;
    }
  }

  private get sharedUrl() {
    /**
     * シェア用リンクを取得
     */
    return `${this.domainName}/profile/${this.targetUserName}/impression/${this.impressionId}`;
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
