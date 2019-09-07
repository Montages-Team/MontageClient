
<template lang='pug'>
  div
    sui-segment
      sui-dimmer(active='')
        sui-loader
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import gql from 'graphql-tag';
import axios from 'axios';

const createNewUserMutation: any = gql`
      mutation{
        createUser{
          user{
            id
            username
            identifierId
            displayName
            profileImgUrl
          }
        }
      }`;

@Component({})
export default class Auth0Callback extends Vue {
  public profile: object = this.$auth.profile;
  public userId: string = '';
  public screenName: string = '';
  public firstLogin: boolean = false;

  public mounted() {
    this.emitCallApi();
  }

  @Emit()
  public async callApi() {
    const accessToken = await this.$auth.getAccessToken();
    // impressionsまたはquestionsを描画
    this.userId = this.$auth.profile.sub;
    this.screenName = this.$auth.profile[`https://montage.bio/screen_name`];
    const url = `https://montage.auth0.com/userinfo`;

    try {
      await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((response) => {
        const { data } = response;
        const meta = data[`https://montage:auth0:com/user_metadata`];
        this.firstLogin = meta.first_login;
      });
      this.handleOnbordingEvent();
    } catch (e) {
      console.log(e);
    }
  }

  public emitCallApi() {
    this.callApi();
  }

  public handleOnbordingEvent() {
    if (this.firstLogin === true) {
      // ユーザ作成
      this.createUser();
      this.$router.push(`/profile/${this.screenName}`);
    } else {
      // Profileページへ繊維
      this.$router.push(`/profile/${this.screenName}`);
    }
  }

  @Emit()
  public createUser() {
    const mutation = this.$apollo.mutate({
      mutation: createNewUserMutation,
      fetchPolicy: 'no-cache',
    });
    mutation
      .then(({ data: { result } }) => {
        return result;
      })
      .then(({ user, errors }) => {
        if (user) {
          const userName: string = user.username;
          this.$router.push({path: '/profile/${userName}'});
        } else {
          this.$router.push('/');
        }
      });
  }
}
</script>
