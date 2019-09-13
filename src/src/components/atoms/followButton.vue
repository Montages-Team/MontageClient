<template lang="pug">
  div
    div <!-- TODO: followボタンの切替え -->
      sui-button(active='', content='Follow', icon='user', size='mini', @click='follow')
    div
      sui-button(active='', content='解除', icon='user', size='mini', @click='unfollow')
</template>

<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import { CreateRelation, DeleteRelation } from '../../constants/follow-query';

@Component({})
export default class FollowButton extends Vue {

  @Emit()
  public follow() {
    this.$apollo.mutate({
      mutation: CreateRelation,
      variables: {
        followingUserId: 2,
        followedUserId: 3,
      },
      fetchPolicy: 'no-cache',
    });
  }

  @Emit()
  public unfollow() {
    this.$apollo.mutate({
      mutation: DeleteRelation,
      variables: {
        id: 32,
      },
      fetchPolicy: 'no-cache',
    });
  }
}
</script>

<style lang="stylus" scoped>

</style>