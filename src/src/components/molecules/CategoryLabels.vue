<template lang='pug'>
    div.flex-category-box
      ul.flex-category-box-inline
        sui-label.category-label(
          v-for='cat in allCategories'
          :key="cat.id"
          :style="{background: '#F0EBD8'}")
          router-link(
            :to="{\
               name: 'questions',\
               params: { userName: username, categoryId: cat.id }}")
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
  @Prop()
  public username!: string;
}
</script>

<style lang="stylus" scoped>
.category-label
  font-weight normal !important

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