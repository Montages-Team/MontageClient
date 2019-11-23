<template lang='pug'>
  div
    //- userが読み込まれるまでv-ifで非表示しないとundefined property
    div(v-if="user")
      ProfileImageTop(:user="user")
      ProfilePageMenu(:username="user.username")
      router-view(:user="user")
    div(v-else)
      Loading

</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import { userQuery } from '../../constants/user_query';
import { createNewUserMutation } from '../../constants/create-new-user-query';
import gql from 'graphql-tag';
import axios from 'axios';

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

@Component({
  components: {
    ProfileCard,
    ProfileImageTop,
    ProfilePageMenu,
    Loading,
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
     error(error) {
      this.$apollo.queries.user.skip = true;
      this.createUser();
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
    this.callApi();
  }

  @Emit()
  private async callApi() {
    const accessToken = await this.$auth.getAccessToken()
                        .catch( ( error: any ) => {
                          console.log('access token 取得エラーです');
                          return;
                        });
    this.userId = this.$auth.profile.sub;
    this.displayName = this.$auth.profile[`https://montage.bio/screen_name`];
    const url = `https://montage.auth0.com/userinfo`;

    const header = { Authorization: `Bearer ${accessToken}`};
    axios
      .get(url, { headers: header})
      .then(( response ) => {
        const meta = response.data[`https://montage:auth0:com/user_metadata`];
        this.firstLogin = meta.first_login;
        this.handleOnbordingEvent();
      })
      .catch(( error ) => {
        console.log(error);
        this.$router.push('/');
      });
  }

  private handleOnbordingEvent() {
    if (this.firstLogin === true) {
      this.createUser();
    } else {
      this.$apollo.queries.user.skip = false;
    }
  }

  @Emit()
  private createUser() {
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
