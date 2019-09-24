<template lang='pug'>
    button {{ label }}
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class SubButton extends Vue {
  @Prop({ type: String }) private label!: string;
}
</script>

<style lang="stylus" scoped>
button
    color white
    border white 1px solid
    background none
    font-size 90%
    padding 7px 10px
    border-radius 5px
</style>