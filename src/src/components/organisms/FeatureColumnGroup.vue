<template lang='pug'>
  div
    FeatureColumn.column-size
      i.column-icon.user.circle.icon(slot="column-icon" style="color: #807cb9;")
      sui-statistic-label.label-margin(slot="label")
        | 誰のプロフィールでも
        br
        | 匿名で、本人になりきって書けます
      sui-statistic-label.description(slot="description")
        | 他の人たちが知らない意外な一面を
        br
        | プロフィールへ反映させることができます
    FeatureColumn.column-size
      i.column-icon.pencil.alternate.icon(slot="column-icon" style="color: #794e7b;")
      sui-statistic-label.label-margin(slot="label")
        | ホントも"楽しいウソ"も書いてOK!
        br
        | どちらを書くのも自由
      sui-statistic-label.description(slot="description")
        | Q&Aには"楽しいウソ"も書いてOK。
        br
        | ただし、誹謗中傷はやめましょう。
    FeatureColumn.column-size
      i.column-icon.twitter.icon(slot="column-icon" style="color: #76B1DC;")
      sui-statistic-label.label-margin(slot="label")
        | 面白い回答があったら、
        br
        | SNSに簡単にシェアできます
      sui-statistic-label.description(slot="description")
        | 気になる回答はSNSでシェアできます。
        br
        | 珍回答にはツッコミを入れましょう。
</template>

<script lang='ts'>
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import FeatureColumn from '../molecules/FeatureColumn.vue';

@Component({
  components: {
    FeatureColumn,
  },
})
export default class FeatureColumnGroup extends Vue {
}
</script>

<style lang="stylus" scoped>
.description
  margin 24px 0px auto !important
  font-size 12px !important

.column-icon
  font-size smaller
  margin 8px

.column-size
  width 325px
  margin auto

.label-margin
  margin 8px 0px 0px !importan
</style>