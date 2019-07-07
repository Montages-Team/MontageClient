<template lang='pug'>
  div
    sui-menu.margin-off(:widths='2')
      sui-menu-item(active='')
        router-link(:to="{ name: 'profile', params: { userName: user.username}}") プロフィール
      sui-menu-item
        router-link(:to="{ name: 'questions', params: { userName: user.username, categoryType: 'you', categoryName: 'あなたについて'}}") Questions
</template>

<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

@Component({})
export default class ProfilePageMenu extends Vue {
  @Prop({ type: Object })
  private user: any;
}
</script>>

<style lang='stylus' scoped>
.margin-off
  margin 0 !important

<style>