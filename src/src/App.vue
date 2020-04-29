<template lang="pug">
  div(id="app" class='wrapper')
    Header(v-if="$route.name !== 'home'" v-on:login="login" :profile="profile")
    div(v-if="isAuthenticated")
      //- router-viewに定義するとthis.$attrsで取得可能になる
      router-view(:userName="this.profile['https://montage.bio/screen_name']")
    div(v-else)
      router-view
    Footer(:profile="profile")
</template>

<script>
import { AuthService } from './auth/authService';
import Loading from './components/organisms/Loading.vue';
import clipboard from 'clipboard';

const Header = () => import(
  /* webpackChunkName: "header" */
  './components/organisms/Header');

const Footer = () => import(
  /* webpackChunkName: "footer" */
  './components/organisms/Footer');


export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Loading,
  },
  metaInfo() {
    return {
      meta: [
        {property: 'og:title', content: 'Montage'},
        {property: 'og:site_name', content: 'Montage'},
        {property: 'og:description', content: '友達も、好きな人も自由にイジろう'},
        {id: 'ogp-img', property: 'og:image', content: this.defaultShareImageUrl},
        {property: 'og:image:width', content: '400'},
        {name: 'twitter:card', content: 'photo'},
      ],
      };
  },
  data() {
    return {
      isAuthenticated: undefined,
      profile: this.$auth.profile,
      pathName: this.$route.name,
      clipBoard: null,
      defaultShareImageUrl: 'https://res.cloudinary.com/hzmikcp3i/image/upload/v1588151691/production/default_share_image_bf2uf6.png',
    };
  },
  async created() {
    try {
      await this.$auth.renewTokens();
    } catch (e) {
      console.log(e);
    }
  },
  mounted() {
    /**
     * URLコピーをするためのプラグインclipboardのコピー時に発火する関数の設定
     *
     * 初期化とログ出す以外は特に何もしていない
     */
    this.clipBoard = new clipboard('.clipcopy');
    this.clipBoard.on('success', (e) => {
      e.clearSelection();
    });
    this.clipBoard.on('error', (e) => {
      console.error(e);
    });
  },
  methods: {
    login() {
      this.$auth.login();
    },
    logout() {
      this.$auth.logOut();
    },
    handleLoginEvent(data) {
      this.isAuthenticated = data.loggedIn;
      this.profile = data.profile;
    },
  },
};
</script>

<style lang="stylus">
body
  font-family 'Roboto', sans-serif
  background #F8F8F8 !important
  min-height 100vh
  margin 0
  padding 0
  font-size calc(10px + 2vmin)
  color #444

.content-for-pc
  width 90vw !important
  min-width 45vw !important
  max-width 1800px
  margin 0 auto

.settings-content-pc
  width 90vw !important
  min-width 45vw !important
  max-width 780px
  margin 8px auto

.icon
  height 16x
  width 16px

.font-size__large
  font-size 24px

.font-size__medium
  font-size 16px

.font-size__small
  font-size 13px

.font-size__mini
  font-size 10px

@media screen and (max-width 770px)
  div.desktop display:none

  /*ヘッダー */
  #header-right-hamburger
    background red
    display none

@media screen and (max-width 770px)
  #header-left width 100%

  footer a
    text-decoration underline

  img#profile
    border-top-left-radius 5px
    border-top-right-radius 5px
    width 100%
    display inline-block

@media screen and (max-width 770px)
  img#profile
    height 30vh
    object-fit cover

@media (min-width:1200px)
  .pl-lg-50
    padding-left 50px

  .pl-lg-80
    padding-left 80px

@media (min-width:992px)
  pt-md-50
  padding-top 50px

.string-left-margin
  margin-left 8px !important
</style>
