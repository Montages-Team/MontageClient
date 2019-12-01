<template lang='pug'>
    div
      div(is="sui-container" style="padding-top: 30px")
        h3(is='sui-header') アカウントを削除した場合:
        sui-list(inverted)
          sui-list-item.list-items(v-for="item in listItems" :key="item.id") {{item}}
        sui-divider(inverted=true)
        h5.confirm-label 削除しようとしています。以下の「続ける」ボタンをタップしてください。
        Button.justify(content='続ける' @click.native='toggleOpen')
        sui-modal(v-model='open')
          sui-modal-header 確認
            p.modal-message アカウントを削除しようとしています。本当に続けますか？
          sui-modal-actions
            sui-button.modal-button-color(@click="deactivate") OK
</template>

<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import { UserDeleteMutation } from '../../constants/delete_user_query';

const Button = () => import(
  /* webpackChunkName: "button" */
  '../atoms/Button.vue');

@Component({
  components: {
    Button,
  },
})
export default class DeactivateForm extends Vue {
  private listItems: string[] = [
    '退会すると自身のプロフィールは削除されます。',
    '自分以外のアカウントに対して投稿した回答は削除されません。',
    '自分以外のプロフィールの閲覧は可能です。',
  ];
  private open: boolean = false;

  @Emit()
  private toggleOpen() {
    this.open = !this.open;
  }

  @Emit()
  private deactivate() {
    const mutation = this.$apollo.mutate({
      mutation: UserDeleteMutation,
      variables: {
        userName: this.$auth.profile['https://montage.bio/screen_name'],
      },
    });

    mutation
      .then(({ data }) => {
        if (!data) {
          throw new Error('data is undefined');
        }
        const res = data.deleteUser;
        return res;
      })
      .then(({ ok, errors }) => {
        if (ok) {
          this.$auth.logOut();
        } else {
          console.log(errors);
        }
      });
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

.confirm-label
  margin 8px !important
</style>