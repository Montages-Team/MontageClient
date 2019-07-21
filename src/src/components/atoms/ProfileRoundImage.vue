<template lang='pug'>
  div
    sui-image(:src="user.profileImage" circular :size="size")
</template>

<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

@Component({})
export default class ProfileRoundImage extends Vue {
  @Prop({type: Object})
  private user!: object;

  // ProfileRoundImage(:size="impressionImgSize")のようにしてサイズを指定
  @Prop({type: String})
  private size!: string;
}
</script>

<style lang='stylus' scoped>
<style>