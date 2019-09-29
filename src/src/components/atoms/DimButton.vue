<template lang='pug'>
  button.dimmer(@click="dimmerLogin") {{ label }}
</template>

<script lang='ts'>
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';

@Component({})
export default class SubButton extends Vue {
  @Prop({ type: String }) private label!: string;

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