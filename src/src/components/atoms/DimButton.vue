<template lang='pug'>
  sui-button(
    circular
    social="twitter"
    :content='buttonLabel'
    icon="twitter"
    @click="dimmerLogin"
    style="margin: 16px 0; background: rgba(0, 0, 0, 0.27);")
</template>

<script lang='ts'>
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';

@Component({})
export default class DimButton extends Vue {
  @Prop({ type: String }) private label!: string;

  private get buttonLabel() {
    return this.label;
  }

  @Emit()
  private dimmerLogin() {
    this.$auth.login();
  }
}
</script>

<style lang="stylus" scoped>
.dimmer
  color white
  border unset
  height 40px
  background rgba(0, 0, 0, 0.27)
  font-size 90%
  padding 7px 20%
  border-radius 5px
  margin 16px
</style>