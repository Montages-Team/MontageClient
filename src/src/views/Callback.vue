<template lang='pug'>
  div
    sui-segment
      sui-dimmer(active='')
        sui-loader
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import axios from 'axios';
import { createNewUserMutation } from '../constants/create-new-user-query';

@Component({
  created() {
    this.$auth.handleAuthentication();
  },
})
export default class Callback extends Vue {
  public profile: object = this.$auth.profile;
  public userId: string = '';
  public screenName: string = '';
  public firstLogin: boolean = false;

  public mounted() {
    this.callApi();
  }

  @Emit()
  public handleLoginEvent(data: any) {
    console.log('handle login in callback component');
    console.log(data.state.target);
    this.$router.push(data.state.target || '/');
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
