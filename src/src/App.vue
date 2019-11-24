<template lang="pug">
  div(id="app" class='wrapper')
    Header(v-if="$route.name !== 'home'" v-on:login="login" :profile="profile")
    router-view(v-if="pathName !== 'settings'")
    router-view(v-else :userName="this.profile['https://montage.bio/screen_name']")
    Footer
</template>

<script>
import { AuthService } from './auth/authService';

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
  },
  data() {
    return {
      isAuthenticated: undefined,
      profile: this.$auth.profile,
      pathName: this.$route.name,
    };
  },
  async created() {
    try {
      await this.$auth.renewTokens();
    } catch (e) {
      console.log(e);
    }
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
  font-family 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif !important
  background #F8F8F8 !important
  min-height 100vh
  margin 0
  padding 0
  font-size calc(10px + 2vmin)
  color #444

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

</style>
