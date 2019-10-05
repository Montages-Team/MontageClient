<template lang='pug'>
    div
      div.top-menu-margin
        router-link(to="/terms/")
          sui-segment(
            :class="{'menu-pane': isTerms, 'pane-font-color': !isTerms}"
            attached='top'
          ) サービス利用規約
        router-link(to="/privacy_policy")
          sui-segment(
            :class="{'menu-pane': !isTerms, 'pane-font-color': isTerms}"
            attached='bottom'
          ) プライバシーポリシー
</template>

<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

@Component({})
export default class TopMenu extends Vue {
  @Prop({type: Boolean})
  private isTerms!: boolean;
}
</script>

<style lang='stylus' scoped>
.top-menu-margin
  margin 16px 0px

.menu-pane
  background #B464A3 !important
  color #fff

.pane-font-color
  color #B464A3
</style>