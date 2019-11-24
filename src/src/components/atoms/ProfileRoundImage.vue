<template lang='pug'>
  div
    lazy-component
      sui-image(:src="url" circular :size="size")
</template>

<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

@Component({})
export default class ProfileRoundImage extends Vue {
  // ProfileRoundImage(:size="impressionImgSize")のようにしてサイズを指定
  @Prop({type: String})
  private size!: string;

  @Prop({type: String})
  private url!: string;
}
</script>

<style lang='stylus' scoped>
</style>