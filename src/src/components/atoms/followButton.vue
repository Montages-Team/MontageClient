<template lang="pug">
  div.follow-button(v-if="1 + 1 ==2")
    sui-button(active='', content='Follow', icon='user', size='mini', @click='follow')
    div.follow-button(v-if="1 + 1 ==3")
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
    });
  }

  @Emit()
  public unfollow() {
    this.$apollo.mutate({
      mutation: DeleteRelation,
      variables: {
        id: 32,
      },
    });
  }
}
</script>

<style lang="stylus" scoped>
.follow-button
  position absolute
  right 8px
  top 24px

</style>