<template lang='pug'>
    div.flex-category-box
      ul.flex-category-box-inline
        sui-label(v-for='cat in categories', :key="cat.id", :color='cat.color')
          router-link(:to="{ name: 'questions', params: { userName: user.userName, categoryType: cat.link, categoryName: cat.category }}")
            | {{ cat.category }}
</template>
<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

@Component({})
export default class CategoryLabels extends Vue {
  @Prop({ type: Object })
  private categories!: object;

  @Prop({ type: Object })
  private user!: object;

}
</script>

<style lang="stylus" scoped>

</style>