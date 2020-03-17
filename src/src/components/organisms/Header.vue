<template lang="pug">
  div(v-if="isMobile")
    sui-menu.header(attached='top')
      sui-menu-menu(position='left')
        router-link.header-link(:to="{name: 'home'}")
          img.svg-logo(src='@/assets/icon.svg')
      sui-menu-menu(position='right')
        sui-menu-item.right-segment(right v-if="this.$parent.isAuthenticated")
          ProfileRoundImage(:size='profileImageSize' :url='profile.picture' @click.native="toggleHeaderMenu")
        sui-menu-item.right-segment(right v-else)
          SubButton(label='ログイン' @click.native="$emit('login')")
    HeaderMenu(v-if='headerMenuFlag' v-on:toggleHeaderMenu='toggleHeaderMenu' :profile='profile')
  div(v-else)
    sui-grid.header(centered :columns='3')
      sui-grid-column(:width='3')
        router-link.header-link(:to="{name: 'home'}")
          sui-segment.left-segment
            img.svg-logo(src='@/assets/icon.svg')
      sui-grid-column.center-grid-width(:width='6')
      sui-grid-column(:width='4')
        sui-segment.right-segment(v-if="this.$parent.isAuthenticated")
          ProfileRoundImage.svg-logo(:size='profileImageSize' :url='profile.picture' @click.native="toggleHeaderMenu")
        sui-segment.right-segment(v-else)
          SubButton.svg-logo(label='ログイン' @click.native="$emit('login')")
    HeaderMenu(v-if='headerMenuFlag' v-on:toggleHeaderMenu='toggleHeaderMenu' :profile='profile')

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import isMobile from 'ismobilejs';
const SubButton = () => import(
  /* webpackChunkName: "sub-button" */
  '../atoms/SubButton.vue');

const ProfileRoundImage = () => import(
  /* webpackChunkName: "profile-round-image" */
  '../atoms/ProfileRoundImage.vue');

const HeaderMenu = () => import(
  /* webpackChunkName: "header-menu" */
  './HeaderMenu.vue');

@Component({
  components: {
    SubButton,
    ProfileRoundImage,
    HeaderMenu,
  },
})
export default class Header extends Vue {
  @Prop({ type: Object }) private profile!: object;
  private profileImageSize: string =  'mini';
  private headerMenuFlag: boolean = false;

  private toggleHeaderMenu() {
    this.headerMenuFlag = !this.headerMenuFlag;
  }

  private get userName() {
    if (this.profile) {
      const profile: any = this.profile;
      return profile['https://montage.bio/screen_name'];
    }

    return null;
  }

  private get isMobile() {
    return isMobile(navigator.userAgent).phone;
  }

}
</script>

<style lang="stylus" scoped>
  .header
    width 100%
    height 64px
    background linear-gradient(180deg, rgba(180, 100, 163, 0.47) 0%, rgba(255, 255, 255, 0) 100%), #807DBA !important
    box-shadow 0px 4px 4px rgba(0, 0, 0, 0.25)
    z-index 100 !important
    border none !important

  #logo
    display inline-block
    font-size 3vh
    font-weight bold
    font-family Pacifico, Gerogia, Times, serif
    color white
    text-align left
    line-height 50px
    &hover
      color #444

  .logotype
    display inline-block
    margin auto 0px
    padding 5px
    height 57px
    font-family Work Sans
    font-style normal
    font-weight normal
    font-size 20px
    line-height normal
    color black
    text-shadow 0px 3px 3px rgba(255, 255, 255, 0.25)

 .svg-logo
  display: block;
  margin: auto;

.left-segment
  background #00ffff00
  display grid
  border unset
  max-height 64px
  box-shadow none
  padding 0

.right-segment
  background #00ffff00
  display grid
  border unset
  max-height 64px
  box-shadow none
  padding 0
  margin-top 4px !important

.center-grid-width
  max-width 480px !important
</style>
