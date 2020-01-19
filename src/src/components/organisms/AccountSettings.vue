<template lang='pug'>
    div
      sui-segment.account-setting-segment(v-if="user")
        div(is="sui-container" style="display: flex;")
        sui-form
          sui-form-field
            label プロフィール名
            input.disable-input(:value="user.displayName" disabled)
          sui-form-field
            label ユーザー名
            input.disable-input(:value="user.username" disabled)
            sui-list
              sui-list-item.input-status-info ユーザー名は変更できません
          sui-divider.divider-top-margin
          sui-form-field
            label アカウント削除
            sui-list
              sui-list-item.input-status-info 一度アカウントを削除すると、二度と元に戻せません。十分ご注意ください。
          router-link(:to="{ name: 'deactivate' }")
            sui-button.danger-button(color="red" size="mini" content='退会申請ページへ進む')
</template>

<script lang='ts'>
import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';
import { userQuery } from '../../constants/user_query';

@Component({
  apollo: {
    $loadingKey: 'loading',
    user: {
      query: userQuery,
      variables() {
        // 動的ルートマッチングを利用する場合はthis.$routeのありなしでvariablesを決める
        return {
          userName: this.userName,
        };
      },
      skip() {
        return this.skipQuery;
      },
      error(error) {
       // 万が一クエリの引数が設定されなかった場合はprofileページへ飛ばす
       this.$apollo.queries.user.skip = true;
       console.log('have a error and push profile page');
      //  this.$router.push('profile');
      },
    },
  },
})
export default class AccountSettings extends Vue {

  private get skipQuery() {
    /**
     * attrsに値が設定されたらスキップを解除する.
     */
    if (this.userName) {
      return false;
    } else {
      return true;
    }
  }
  private get userName() {
    /**
     * ユーザ名をVueコンポーネントから取得
     */
    if (this.$attrs.userName) {
      return this.$attrs.userName;
    }
    return undefined;
  }
}
</script>

<style lang='stylus' scoped>
.account-setting-segment
  padding-top 30px !important
  height 70vh !important
  border None !important
  box-shadow None !important

.upload-link
  height 20px
  line-height 20px
  margin 20% 25px

.account-form-margin
  margin 16px 0px

.change-button
  font-size 13px !important
  display block !important
  margin-left auto !important

input.disable-input
  background #F8F8F8 !important
  border 1px solid #CCCCCC !important

input.disable-input::placeholder
  color #333333

.input-status-info
  color #8c8c8c !important
  font-size 12px
  margin auto 4px !important

.label-button
  color #b464a3 !important
  background unset !important

.username-button
  color #fff !important
  background #B464A3 !important

.danger-button
  margin 12px auto 4px 0px !important
  display block !important

.divider-top-margin
  margin-top 50px
</style>