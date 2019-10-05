<template lang='pug'>
    div
      sui-accordion(exclusive=true, styled=true fluid=true)
        router-link(to="/account")
          sui-accordion-title.settings-menu プロフィールを編集
        router-link(to="/change_password")
          sui-accordion-title.settings-menu パスワードの変更
        router-link(to="/change_mail")
          sui-accordion-title.settings-menu メールアドレスの変更
        router-link(to="/deactivate")
          sui-accordion-title.settings-menu 退会
</template>

<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

@Component({})
export default class SettingsMenu extends Vue {
}
</script>

<style lang='stylus' scoped>
.settings-menu
  padding 16px !important
</style>