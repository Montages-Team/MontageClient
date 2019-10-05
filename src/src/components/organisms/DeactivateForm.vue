<template lang='pug'>
    div
      div(is="sui-container" style="padding-top: 30px")
        h2(is='sui-header') アカウントを削除した場合:
        sui-list(inverted)
          sui-list-item.list-items(v-for="item in listItems" :key="item.id") {{item}}
        sui-divider(inverted=true)
        h5(style="margin: 8px;") 削除しようとしています。以下の「続ける」ボタンをタップしてください。
        Button.justify(content='続ける' @click.native='toggleOpen')
        sui-modal(v-model='open')
          sui-modal-header 確認
            p.modal-message アカウントを削除しようとしています。本当に続けますか？
          sui-modal-actions
            sui-button.modal-button-color(@click="") OK
            //- TODO: アカウント削除処理
</template>

<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import Button from '../atoms/Button.vue';

@Component({
  components: {
    Button,
  },
})
export default class DeactivateForm extends Vue {
  private listItems: string[] = [
    '今後、そのアカウントからはmontageにログインできなくなります',
    'プロフィールページが閲覧できなくなります。',
    '自分以外のアカウントに対して投稿した回答は削除されません。',
    'アカウントが無効化されている間、montageにサインインして自分のアカウントを回復することができます。',
    'あなたのアカウントは30日感無効化されます。無効化中のアカウントは公開されません。30日を経過するとアカウントは完全に削除されます。',
  ];
  private open: boolean = false;

  @Emit()
  private toggleOpen() {
    this.open = !this.open;
  }
}
</script>

<style lang='stylus' scoped>
.justify
  display block !important
  margin 16px auto !important

.list-items
  font-size 15px !important
  color #333
  margin 8px
  padding 4px 0

.modal-message
  font-size 15px
  margin 16px

.modal-button-color
  background #B464A3 !important
  color #fff !important
</style>