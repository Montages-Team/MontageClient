<template lang='pug'>
  div
    sui-menu(:widths='2' tabular labeled icon)
      sui-menu-item(
        :class="{'active-menu': isProfile}"
        :active="isProfile")
        router-link.column-link(:to="{\
          name: 'profile',\
          params: { userName: username }\
        }")
          i.user.circle.icon
          span プロフィール
      sui-menu-item(
        :class="{'active-menu': !isProfile}"
        :active="!isProfile")
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

  @Prop({ type: String })
  private username!: string;

  @Prop({ type: String })
  private whichPage!: string;

  private created() {
    this.isProfileHandler();
  }

  private isProfileHandler() {
    if (this.whichPage === 'profile') {
      this.isProfile = true;
    } else {
      this.isProfile = false;
    }
  }

  @Watch('whichPage')
  private borderBottomHandler() {
    this.isProfileHandler();
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