<template lang="pug">
    div
      sui-message.message-box
        p.sub-message プロフィールを追加していきましょう!
        p.sub-message Questionsに答えて{{displayName}}さんについて教えてください!
 </template>


<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import { Message } from 'semantic-ui-vue';

@Component({})
export default class NoImpressionCard extends Vue {
  @Prop({type: String})
  private displayName!: string;
}
</script>

<style lang="stylus" scoped>
.card
  box-shadow none !important
  width auto !important

.sub-message
  text-align center
  font-weight bold
  color #979797
  padding 3% 10%

.message-box
  padding 12% 8% !important
  box-shadow none !important
  background #fff !important
</style>