<template lang='pug'>
  div
    sui-menu.margin-off(:widths='2')
      sui-menu-item(:class="{'active-menu': chosenMenu}" @click="toggleMenu('profile');")
        router-link.column-link(:to="{ name: 'profile', params: { userName: username}}") プロフィール
      sui-menu-item(:class="{'active-menu': !chosenMenu}" @click="toggleMenu('question');" style="padding: 0px;")
        router-link.column-link(:to="{name: 'questions', params: { userName: username, categoryType: 'you', categoryName: 'あなたについて'}}") Questions
</template>

<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

@Component({})
export default class ProfilePageMenu extends Vue {
  @Prop({ type: String })
  private username!: string;

  private chosenMenu: boolean = true;
  private choice: string = 'profile';

  @Emit()
  public toggleMenu(title: string) {
    if (title !== this.choice) {
      this.choice = this.choice === 'profile' ? 'question' : 'profile' ;
      this.chosenMenu = !this.chosenMenu;
    }
  }
}
</script>>

<style lang='stylus' scoped>
.margin-off
  margin 0 !important
  height 40px

.column-link
  color #656565 !important
  font-weight bold !important
  width 100%
  padding 12px 0px

.active-menu:after
  content ""
  background -webkit-linear-gradient(180deg, rgba(180, 100, 163, 0.47) 0%, rgba(255, 255, 255, 0) 100%), #807DBA
  display block
  height 5px
  width -webkit-fill-available
  position absolute
  bottom 0
</style>