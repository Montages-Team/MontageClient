<template lang='pug'>
    div.flex-category-box
      ul.flex-category-box-inline(v-for='(cat, index) in allCategories' :key="cat.id")
        sui-label.category-label(
          v-if='cat.id === categoryId'
          pointing='below' :style="{background: getColor(index)}")
          router-link(
            :to="{\
               name: 'questions',\
               params: { userName: username, categoryId: cat.id }}" style="opacity: 1;")
            | {{ cat.name }}
        sui-label.category-label(v-else :style="{background: getColor(index)}")
          router-link(
            :to="{\
               name: 'questions',\
               params: { userName: username, categoryId: cat.id }}" style="opacity: 1;")
            | {{ cat.name }}
</template>
<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import { AllCategoriesQuery } from '../../constants/get_all-categories-query';

@Component({
  apollo: {
    allCategories: {
      query: AllCategoriesQuery,
      update: (data) => data.categories,
    },
  },
})
export default class CategoryLabels extends Vue {
  @Prop({type: String})
  private username!: string;

  @Prop({type: String})
  private categoryId: string = '1';

  private getColor(index: number) {
    if (index === 0) {
      return '#AB9789';
    } else if (index === 1) {
      return '#8F6D8A';
    } else {
      // return '#ffdac2';
      return '#95E5BA';
    }
  }
}
</script>

<style lang="stylus" scoped>
.category-label
    font-weight bold !important
    color #fff !important

.flex-category-box
    padding-bottom 8px
    display flex
    white-space nowrap
    margin 0 24px

.flex-category-box-inline
    display inline-block
    list-style none
    padding 4px !important
    overflow-x auto
    overflow-y hidden
    white-space nowrap
    margin 25px 0 0
    -webkit-overflow-scrolling touch
</style>