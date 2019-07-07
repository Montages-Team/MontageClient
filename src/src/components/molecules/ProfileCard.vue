<template lang='pug'>
  div
    ui-card
      ProfileRoundImage(:size="cardImageSize" style="padding: 25px")
      ProfileCardStats
      sui-button(color="purple" inverted style="margin-top: 300px") Collage

</template>

<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import ProfileCardStats from './ProfileCardStats.vue';
import ProfileRoundImage from '../atoms/ProfileRoundImage.vue';

@Component({
  components: {
    ProfileCardStats,
    ProfileRoundImage,
  },
})
export default class ProfileCard extends Vue {
  private cardImageSize: string = 'standard';

  @Prop({ type: Object })
  private user: any;

}
</script>

<style lang='stylus' scoped>
<style>