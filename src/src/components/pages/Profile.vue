<template lang='pug'>
  //- userが読み込まれるまでv-ifで非表示しないとundefined property
  div(v-if="user")
    ProfileImageTop(:user="user")
    ProfilePageMenu(:username="user.username")
    router-view(:user="user")

</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import { userQuery } from '../../constants/user_query';

import ProfileCard from '../../components/molecules/ProfileCard.vue';
import ProfileImageTop from '../../components/molecules/ProfileImageTop.vue';
import ProfilePageMenu from '../../components/molecules/ProfilePageMenu.vue';

import gql from 'graphql-tag';

@Component({
  components: {
    ProfileCard,
    ProfileImageTop,
    ProfilePageMenu,
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
    },
  },
})
export default class Profile extends Vue {
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

.profile-image-top-text
  position absolute
  color #fff left 23px
  bottom 13%
  margin 0
  font-size 24px
  font-weight 900
  text-shadow 0px 0px 10px #00000

.staticsic
  position relative
  font-size 13px !important
  bottom 24px
  left 13p
  color #FFF
</style>
