<template lang='pug'>
  div
    div.hoge
      sui-image.fuga(:src="user.profileImage" fluid alt='プロフィール画像')
        p.piyo
          | @{{user.username}}
      FollowButton.poyo
      ProfileCardStats(:stats="{following:  22, follower: 33}")
</template>

<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import FollowButton from '../atoms/followButton.vue';
import ProfileCardStats from './ProfileCardStats.vue';


@Component({
  components: {
    FollowButton,
    ProfileCardStats,
  },
})
export default class ProfileImageTop extends Vue {
  @Prop({ type: Object })
  private user: any;
}
</script>

<style lang="stylus" scoped>
.hoge
  position relative
  width 80%
  background -webkit-gradient(linear,left top,left bottom, color-stop(-30%,transparent),to(#181818))
  background linear-gradient(#00000000 90%, #f0f0f0)

.fuga
  width -webkit-fill-available !important
  background-size cover !important
  background-position 50% !important
  z-index -1 !important

.piyo
  position absolute
  color #fff
  left 23px
  bottom 13%
  margin 0
  font-size 24px
  font-weight 900
  text-shadow 0px 0px 10px #00000

.poyo
  position relative
  font-size 13px !important
  bottom 24px
  left 12px
</style>