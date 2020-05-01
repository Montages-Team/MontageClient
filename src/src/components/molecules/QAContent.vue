<template lang='pug'>
  div
    sui-card.raised.qa-card
      sui-card-content
        sui-card-header.card-header Q. {{ questionAbout }}
          div(style="display: flex;")
            router-link(:to="{ name: 'profile', params: { userName: this.$route.params.userName }}")
              ProfileRoundImage.user-icon(:url="url" size="mini")
            router-link.card-content-width(
              :to="{ name: 'impression', params: { impressionId: impressionId }}")
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
  word-break break-word
  margin 6px !important
  padding 8px !important
  color #555555 !important
  width 90% !important


.card-content-width
  width -webkit-fill-available
  width -moz-available
</style>