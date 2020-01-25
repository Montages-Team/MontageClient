<template lang='pug'>
  div
    sui-menu(:widths='2' tabular labeled icon)
      sui-menu-item(
        :class="{'active-menu': isProfile}"
        :active="isProfile"
        @click="select(`Profile`)")
        router-link.column-link(:to="{\
          name: 'profile',\
          params: { userName: username }\
        }")
          i.user.circle.icon
          span プロフィール
      sui-menu-item(
        :class="{'active-menu': !isProfile}"
        :active="!isProfile"
        @click="select(`Questions`)")
        router-link.column-link(:to="{\
          name: 'questions',\
          params: {\
            userName: username,\
            categoryId: 1,\
          }\
        }")
          i.question.circle.icon
          span Question
</template>

<script lang='ts'>
import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';

@Component({})
export default class ProfilePageMenu extends Vue {
  private isProfile: boolean | null = null;
  private active: string | null = null;

  @Prop({ type: String })
  private username!: string;

  private created() {
    if (
      this.$route.path.endsWith(this.username + '/')
      || this.$route.path.endsWith(this.username)
    ) {
      this.isProfile = true;
    } else {
      this.isProfile = false;
    }
  }
  /**
   * メニューをクリックすると、それぞれのメニュー名がselect()でセットされ、activeの値が変更される.
   * activeが変更されると、watchで検知され、isProfileの値が変更される.
   * メニューの下線はisActiveでisProfileの値を見てどちらのメニューにつくか決定される.
   */
  @Watch('active')
  private onChangeMenuStatus() {
    if (this.active === 'Profile') {
      this.isProfile = true;
    } else if (this.active === 'Questions') {
      this.isProfile = false;
    }
  }

  @Emit()
  private isActive(name: string) {
    this.isProfile = (this.active === name);
  }

  @Emit()
  private select(name: string) {
    this.active = name;
  }
}
</script>>

<style lang='stylus' scoped>
.column-link
  color #656565 !important
  font-weight bold !important
  width 100%

.active-menu:after
  content ""
  background linear-gradient(#B464A3,#807DBA)
  display block
  height 5px
  width -webkit-fill-available
  position absolute
  bottom 0
</style>