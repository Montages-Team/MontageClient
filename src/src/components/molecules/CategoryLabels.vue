<template lang='pug'>
    div.flex-category-box
      ul.flex-category-box-inline
        sui-label(v-for='cat in categories', :key="cat.id", :color='cat.color')
          router-link(:to="{ name: 'questions', params: { userName: username, categoryType: cat.link, categoryName: cat.category }}")
            | {{ cat.category }}
</template>
<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

@Component({})
export default class CategoryLabels extends Vue {
  @Prop()
  public username!: string;

  @Prop()
  public categories!: object[];
}
</script>

<style lang="stylus" scoped>
.flex-category-box
    padding-bottom 8px
    display flex
    white-space nowrap
    margin 0 24px

.flex-category-box-inline
    display inline-block
    list-style none
    padding 0
    overflow-x auto
    overflow-y hidden
    white-space nowrap
    margin 25px 0 0
    -webkit-overflow-scrolling touch
</style>