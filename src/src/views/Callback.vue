<template lang='pug'>
  div
    p callbackのページです
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import gql from 'graphql-tag';
import TwitterAuthButton from '../components/atoms/TwitterAuthButton.vue';

const authMutation: any = gql`mutation ($provider: String!, $oauth_token: String!, $oauth_verifier: String!) {
  twitterAuth(provider: $provider, oauthToken: $oauth_token, oauthVerifier: $oauth_verifier) {
    ok
    user{
        username
    }
  }
}`;

@Component({
  mounted() {
    console.log('created!');
    // callback urlのurlパラメータから取得
    const oauthToken: string | string[] = this.$route.query.oauth_token;
    const oauthVerifier: string | string[] = this.$route.query.oauth_verifier;
    // TODO: loading中はロードの画面にしておく
    this.$apollo.mutate({
      mutation: authMutation,
      // Parameters
      variables: {
        provider: 'twitter',
        oauth_token: oauthToken,
        oauth_verifier: oauthVerifier,
      },
    })
    .then( (response: any) => {
      // Result
      // const userName: string = response.data.twitterAuth.user.username;  // NO
      const data: any = response.data;
      const userName: string = data.twitterAuth.user.username;
      this.$router.push({path: `/profile/${userName}/`, params: { username: userName }});
    }).catch((error: any) => {
      // Error
      console.error(error);
      this.$router.push({path: '/'});
    });
  },
})
export default class Profile extends Vue {
  public nowloading: number = 0;
  public apollo() {
    console.log('apollo');
  }
  // @Emit
  // public authenticate(){

  // };
}
</script>
