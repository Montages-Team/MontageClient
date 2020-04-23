<template lang='pug'>
  div
    sui-card.raised.qa-card
      sui-card-content
        sui-card-header.card-header Q. {{ questionAbout }}
        router-link(:to="{ name: 'impression', params: { impressionId: impressionId }}")
          div(style="display: flex;")
            ProfileRoundImage.user-icon(:url="url" size="mini")
            sui-label.baloon(pointing='left' size='medium' style="background: #f5f5f5")
              p(style="color: #555555") {{ content }}
</template>

<script lang='ts' scoped>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import ProfileRoundImage from '../atoms/ProfileRoundImage.vue';

@Component({
  components: {
   ProfileRoundImage,
  },
})
export default class QAContent extends Vue {
  @Prop({ type: String})
  private url!: string;

  @Prop({ type: String})
  private questionAbout!: string;

  @Prop({type: String})
  private content!: string;

  @Prop({type: String})
  private impressionId!: string;

}
</script>

<style lang="stylus" scoped>
.card-header
  margin-bottom 10px !important

.qa-card
  box-shadow none !important
  width auto !important

.user-icon
 margin 5px !important

.baloon
  width 80%
  word-break break-word
  margin 6px !important
  padding 8px !important
  color #555555 !important
</style>