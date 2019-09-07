<template lang='pug'>
  div
    sui-card(style="width: inherit;")
      h6.questions-card-header(is='sui-header', icon='', text-align='center')
        sui-image.montage-icon-for-card(src='https://semantic-ui-vue.github.io/static/images/avatar/small/elliot.jpg', shape='circular', size='mini', centered='')
        sui-header-content.font-size__medium {{question.about}}
      Button.questions-card-bottom(content="回答する")
      //- div.questions-card-bottom
      //-   sui-button.answer-button(primary='', content='回答する', fluid='')
</template>

<script lang='ts' scoped>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import Button from '../atoms/Button.vue';

@Component({
  components: {
   Button,
  },
})
export default class QuestionCard extends Vue {
  @Prop({ type: Object})
  private question!: object;
}
</script>
<style lang="stylus" scoped>
.questions-card-header
    margin 0 auto !important
    width fit-content
    padding 32px 30px 4px 30px !important

.montage-icon-for-card
    margin-bottom 16px

.answer-button
  width 50% !important
  margin 0px auto !important
  background #B464A3 !important

.questions-card-bottom
  margin 24px !important
</style>