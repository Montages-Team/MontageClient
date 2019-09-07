<template lang='pug'>
  div
    ui-card
      ProfileRoundImage.round-image(:size="cardImageSize" :url="url")
      ProfileCardStats
      sui-button.collage-button(color="purple" inverted) Collage

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
  private url: string = '';

  @Prop({ type: Object })
  private user: any;

}
</script>

<style lang='stylus' scoped>
.collage-button
  margin-top 300px

.round-image
  padding 25px
</style>