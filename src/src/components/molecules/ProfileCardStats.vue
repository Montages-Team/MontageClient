<template lang='pug'>
    div
      sui-statistics-group
        sui-statistic(in-group='' v-for="(num, label) of stats" horizontal='', size='tiny')
          sui-statistic-label {{num}}
          sui-statistic-label.label(v-if="label === 'following'") フォロー
          sui-statistic-label.label(v-if="label === 'follower'") フォロワー
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
.label
  color: #FFF; !important
<style>