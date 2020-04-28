<template lang='pug'>
    div
      sui-button-group.button-group(icons size="small")
        sui-button.icon-button-group(icon='like' content="")
        sui-button.icon-button-group(icon='share' @click="toggleShareModal")
        sui-button.icon-button-group(icon='paint brush', @click="openImpressionModal")
</template>

<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

@Component({})
export default class ReactionIconGroup extends Vue {
  @Emit()
  public openImpressionModal() {
    this.$emit('modalToggle');
  }
  public toggleShareModal() {
    this.$emit('toggleShareModal');
  }
}
</script>

<style lang="stylus" scoped>
.button-group
  padding 0px !important
  width -webkit-fill-available
  width: -moz-available;

.icon-button-group
  background #FFF !important
  width auto

.right-icon-group
  display flex
</style>