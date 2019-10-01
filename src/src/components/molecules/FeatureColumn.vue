<template lang='pug'>
  div
    sui-segment.column-segment
      div
        sui-statistics-group.column-group
          sui-statistic(in-group='' style="margin: inherit;")
            sui-statistic-value(style="margin-bottom: 16px;")
              slot(name="column-icon")
            slot(name="label")
            slot(name="description")
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class FeatureColumn extends Vue {
}
</script>

<style lang="stylus" scoped>
.column-segment
  margin 16px !important
  border-radius 20px !important

.column-group
  margin 0 auto !important
  width: 258px !important

.column-icon
  font-size smaller !important
  color #76B1DC !important
  margin 8px !important

.label-margin
  margin 8px 0px 0px !important
</style>