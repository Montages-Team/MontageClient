<template lang='pug'>
  div
    //- userが読み込まれるまでv-ifで非表示しないとundefined property
    div(v-if="user")
      div(v-if="isMobile")
        ProfileImageTop(:user="user")
        ProfilePageMenu(:username="user.username" :whichPage="this.$route.name")
        router-view(:user="user")
      div(v-else)
        sui-grid(centered :columns='3', style="margin: 16px;")
          sui-grid-column(:width='3')
            ProfileImageTop(:user="user" style="margin-right: 8px;")
          sui-grid-column(:width='6')
            ProfilePageMenu(:username="user.username" :whichPage="this.$route.name")
            router-view(:user="user")
          sui-grid-column(:width='3')
            sui-segment(style="padding: 0 !important")
              Footer
    div(v-else)
      Loading
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import { userQuery } from '../../constants/user_query';
import { createNewUserMutation } from '../../constants/create-new-user-query';
import gql from 'graphql-tag';
import axios from 'axios';
import isMobile from 'ismobilejs';

const ProfileCard = () => import(
  /* webpackChunkName: "profilecard" */
  '../../components/molecules/ProfileCard.vue');
const ProfileImageTop = () => import(
  /* webpackChunkName: "topimage" */
  '../../components/molecules/ProfileImageTop.vue');
const ProfilePageMenu = () => import(
  /* webpackChunkName: "pagemenu" */
  '../../components/molecules/ProfilePageMenu.vue');
const Loading = () => import(
  /* webpackChunkName: "loading" */
  '../organisms/Loading.vue');
const Footer = () => import(
  /* webpackChunkName: "footer" */
  '../organisms/Footer.vue');

@Component({
  components: {
    ProfileCard,
    ProfileImageTop,
    ProfilePageMenu,
    Loading,
    Footer,
  },
  head: {
    title() {
      return {
        inner: this.$route.params.userName + 'さん',
        separator: '/',
      };
    },
    meta: [
      {
         name: 'description',
         content: '質問一覧、、回答一覧を表示するプロフィールページ',
      },
    ],
  },
  apollo: {
    $loadingKey: 'loading',
    user: {
      query: userQuery,
      variables() {
        // 動的ルートマッチングを利用する場合はthis.$routeのありなしでvariablesを決める
        if (this.$route && this.$route.params) {
          return {
            userName: this.$route.params.userName,
          };
        }
      },
      skip() {
          // 最初はskipされる
          return this.skipQuery;
      },
      result({ data }: any, loading: any, networkStatus: any) {
        if (data.user === null) {
          this.$router.push({name: 'notfound'});
        }
      },
      error(error) {
       this.$apollo.queries.user.skip = true;
       this.$router.push('/');
      },
    },
  },
})
export default class Profile extends Vue {
  private profile: object = this.$auth.profile;
  private userId: string = '';
  private displayName: string = '';
  private firstLogin: boolean = false;
  private skipQuery: boolean = true;

  private created() {
    if ( this.$auth.isAuthenticated() === true ) {
      console.debug('call api when created profile component.');
      this.callApi();
    } else {
      console.info('User does not logged in.');
      this.$apollo.queries.user.skip = false;
    }
  }

  private get isMobile() {
    return isMobile(navigator.userAgent).phone;
  }

  @Emit()
  private async callApi() {
    /**
     * 認証情報からユーザID,displayNameを取得するための大元となる関数
     *
     * 1. Auth0からアクセストークンを取得
     * 2. メタデータを取得
     * 3. 初回ログイン時であればオンボーディングでユーザが作成される
     * 4. 既存ユーザならプロフィール情報を取得する
     */

    await this.$auth.getAccessToken()
    .then( (accessToken: any) => {
        const header = { Authorization: `Bearer ${accessToken}`};
        this.fetch_meta_data(header);
    })
    .catch( ( error: any ) => {
      console.error('fail to fetch access token.');
      return;
    });
    this.userId = this.$auth.profile.sub;
    this.displayName = this.$auth.profile[`https://montage.bio/screen_name`];
  }

  @Emit()
  private async fetch_meta_data(header: any) {
    /**
     * userinfoエンドポイントからメタデータを取得する関数
     */
    const baseUrl = 'https://' + process.env.VUE_APP_AUTH0_DOMAIN;
    const url = baseUrl + '/userinfo';
    // メタデータを取得
    await axios
      .get(url, { headers: header})
      .then(( response ) => {
        const meta = response.data[`https://montage:auth0:com/user_metadata`];
        this.firstLogin = meta.first_login;
        this.handleOnbordingEvent();
      })
      .catch(( error ) => {
        console.error(error);
        this.$router.push('/');
      });
  }

  private handleOnbordingEvent() {
    /**
     * 初回ログイン時のみユーザ作成を行うことをハンドリングするオンボーディング関数
     */
    if (this.firstLogin === true) {
      this.createUser();
    } else {
      this.$apollo.queries.user.skip = false;
    }
  }

  @Emit()
  private createUser() {
    /**
     * ユーザ作成のミューテーションをリクエストする関数
     */
    const mutation = this.$apollo.mutate({
      mutation: createNewUserMutation,
      fetchPolicy: 'no-cache',
    });
    mutation
      .then(({ data: { createUser } }) => {
        return createUser;
      })
      .then(({ user, errors }) => {
        if (user) {
          this.$apollo.queries.user.skip = false;
        } else {
          this.$router.push('/');
        }
      });
  }
}
</script>

<style lang="stylus" scoped>
.active
  border-bottoms solid linear-gradient(180deg, rgba(180,100,163,0.47) 0%, rgba(255,255,255,0) 100%) 1px

.right-icon
  float right

.left-icon
  float left

.icon-holder
  width 95%

.profile-image-top
  position relative
  background -webkit-gradient(linear,left top,left bottom,color-stop(-30%,transparent),to(#181818))
  background linear-gradient(#00000000 90%, #f0f0f0)

.profile-image
  width -webkit-fill-available
  z-index 0
  background-size cover
  background-position 50%
  z-index -1

</style>
