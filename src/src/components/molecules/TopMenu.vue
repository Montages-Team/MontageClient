<template lang='pug'>
    div
      div.top-menu-margin
        router-link(to="/terms/")
          sui-segment(attached='top') サービス利用規約
        router-link(to="/privacy_policy")
          sui-segment(attached='bottom') プライバシーポリシー
</template>

<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

@Component({})
export default class TopMenu extends Vue {
  private isActive!: boolean;

  private mounted() {
    if (this.$route.name === 'terms') {
        this.isActive = true;
        this.isActive = false;
    } else {
        this.isActive = false;
        this.isActive = true;
    }
  }
}
</script>

<style lang='stylus' scoped>
.top-menu-margin
  margin 16px 0px
</style>