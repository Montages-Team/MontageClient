<template lang="pug">
  div
    sui-button(social='twitter', content='Sign Up with Twitter', icon='twitter', @click='twitter')
</template>

<script lang="ts">
import gql from 'graphql-tag';
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import { graphql } from 'graphql';
import { QueryStore } from 'apollo-client/data/queries';
import { oauthQuery } from '../../constants/oauth_query';

@Component({
    apollo: {
      tokens: {
        query: oauthQuery,
        skip() {
            // 最初はskipされる
            return this.skipQuery;
        },
        update(data) {
          // ログインボタンを押すと、tokensに値が入る。updateが起きたら認証へのpostを実行
          console.log(data.tokens);
          window.location.href = 'https://api.twitter.com/oauth/authorize?' + data.tokens;
        },
      },
    },
})
export default class TwitterAuthButton extends Vue {

  public tokens: string = '';

  @Emit()
  public twitter() {
    // ボタンを押したらskipが解除されて、tokensにバックエンドから渡されるoauth_tokenが入る
    this.$apollo.queries.tokens.skip = false;
  }
}
</script>
<style lang="stylus" scoped>
a:link, a:visited
  color #aaa
  font-weight bold
  &:hover
    color #888

.auth_button
  width 200px
  height 30px
  color #FFF
  margin 5% auto
  padding 3px 10px
  background #38A1F3
  border-radius 5px
  box-shadow 1px 1px 1px #aaa
</style>
