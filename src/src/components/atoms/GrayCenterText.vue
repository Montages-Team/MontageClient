<template lang='pug'>
    div
      div.centered-text.font-size__smal {{ content }}
</template>

<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

@Component({})
export default class GrayCenterText extends Vue {
  @Prop({ type: String })
  private content!: string;
}
</script>

<style lang="stylus" scoped>
.centered-text
  text-align center
  color #AAA
  margin: 4px 0px 24px

</style>