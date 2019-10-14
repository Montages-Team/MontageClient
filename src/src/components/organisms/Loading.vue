<template lang='pug'>
  div
    sui-segment.loading-wrapper
      sui-dimmer.loading-content-wrapper(active='', inverted='')
        sui-loader(content='Loading...')
</template>

<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

@Component({})
export default class Loading extends Vue {

}
</script>

<style lang='stylus' scoped>
.loading-wrapper
  width -webkit-fill-available !important
  height 100%
  margin unset !important
  z-index 1000 !important
  position absolute !important

.loading-content-wrapper
  display block !important
  height 100% !important
  margin auto 0 !important

.loading-logo
  display block
  width 232px
  height 100%
  margin auto
</style>