<template lang='pug'>
    div
      sui-segment(style="padding-top: 30px")
        div(is="sui-container" style="display: flex;")
          sui-image(v-if="false" :src="userPicture", size='small', circular)
          sui-image(v-else="true" src='https://semantic-ui-vue.github.io/static/images/avatar/large/kristy.png', size='small', circular)
          a.upload-link(href="" @click="") 写真のアップロード
          //- TODO: 写真をプロフィールから取得できるようにする
          //- TODO: 写真アップロード処理
        sui-form.account-form-margin
          sui-form-field
            label プロフィール名
            input.disable-input(:value="displayName" disabled)
          sui-button.username-button.change-button(size="tiny" compact type='submit' disabled content="保存")
          //- sui-form-field
          //-   label ユーザー名
          //-   input.disable-input(:value="displayName" disabled)
          //-   sui-list
          //-     sui-list-item.input-status-info ユーザー名は変更できません
          //- TODO ユーザ名を取得する
          sui-form-field
            label Email
            input.disable-input(:value="userEmail" disabled)
            sui-list-item.input-status-info 重要なおしらせは, 上記のEmailへ送られます
          //- sui-button.label-button.change-button(compact type='submit' content="メールアドレスの変更")
</template>

<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

@Component({})
export default class AccountSettings extends Vue {
  @Prop({type: String})
  private userEmail!: string;

  @Prop({type: String})
  private displayName!: string;

  @Prop({type: String})
  private userPicture!: string;
}
</script>

<style lang='stylus' scoped>
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

</style>