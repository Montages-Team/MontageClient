<template lang='pug'>
    div
      sui-statistics-group
        sui-statistic.label(in-group='' v-for="(num, label) of stats", :key="num" horizontal='', size='tiny')
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
</style>