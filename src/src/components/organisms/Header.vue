<template lang="pug">
sui-container.header-container
  .header
    .header-wrapper
      .left-wrapper
        router-link.header-link(:to="{name: 'profile', params: { userName: userName }}")
          img(src='@/assets/icon.svg')
      .right-wrapper(v-if="this.$parent.isAuthenticated !== undefined")
        SubButton(label='ログイン・登録' @click.native="$emit('login')" v-if="this.$parent.isAuthenticated == false")
        ProfileRoundImage(:size='profileImageSize' :url='profile.picture' @click.native="toggleHeaderMenu" v-else)
    HeaderMenu(v-if='headerMenuFlag' v-on:toggleHeaderMenu='toggleHeaderMenu' :userName='profile.name' :userId='profile["https://montage.bio/screen_name"]')
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import SubButton from '../atoms/SubButton.vue';
import ProfileRoundImage from '../atoms/ProfileRoundImage.vue';
import HeaderMenu from './HeaderMenu.vue';

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
  get getUserName() {
    if (this.profile === undefined) {
      return null;
    } else {
      const profile: any = this.profile;
      return profile['https://montage.bio/screen_name'];
    }
  }
}
</script>

<style lang="stylus" scoped>
  .header
    display block
    position absolute
    width 100%
    height 56px
    left 0px
    top 0px
    z-index 100
    background linear-gradient(180deg, rgba(180, 100, 163, 0.47) 0%, rgba(255, 255, 255, 0) 100%), #807DBA
    box-shadow 0px 4px 4px rgba(0, 0, 0, 0.25)

    .header-wrapper
      margin 14px 5% 0 5%

      .left-wrapper
        margin-top -5px
        display block
        float left

      .right-wrapper
        display block
        float right
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
    height 56px
    font-family Work Sans
    font-style normal
    font-weight normal
    font-size 20px
    line-height normal
    color black
    text-shadow 0px 3px 3px rgba(255, 255, 255, 0.25)

  .montage_logo_image
    margin 8% auto
    height 66.6%
    display inline-block
    position absolute

  .header-container
    width 100%
    height 56px

 .svg-logo
    x 0px
    y 0px
    width 200px
    height 40px
</style>
