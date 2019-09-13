<template lang='pug'>
    div
      sui-statistics-group.static-group
        sui-statistic.label.static-label(in-group='' v-for="(num, label) of stats", :key="num" horizontal='', size='tiny')
          sui-statistic-label(style="color: #FFF;") {{num}}
          sui-statistic-label(v-if="label === 'following'" style="color: #FFF;") フォロー
          sui-statistic-label(v-if="label === 'follower'" style="color: #FFF;") フォロワー
</template>
<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

@Component({})
export default class ProfileCardStats extends Vue {
  @Prop({ type: Object })
  private stats!: object;
}
</script>

<style lang="stylus" scoped>
.static-group
  width max-content
  margin-top 0.8em !important

.static-label
  padding 0.5em 1.5em
  margin 0 !important
</style>