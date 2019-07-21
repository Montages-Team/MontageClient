<template lang='pug'>
    div
      sui-menu(vertical style="width: inherit; margin 16px")
        router-link(color='red' v-for='item in items', :key="item.id" :content='item.label' is='sui-menu-item' :to="{ name: item.url }")
</template>

<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

@Component({
// TODO リンクをactiveにする処理
//   mounted() {
//     if (this.$route.name === 'terms'){
//         this.items[0].isActive = true;
//         this.items[1].isActive = false;
//     } else {
//         this.items[0].isActive = false;
//         this.items[1].isActive = true;
//     }
//   },
})
export default class TopMenu extends Vue {
  @Prop({type: Object})
  private items!: object[];
}
</script>

<style lang='stylus' scoped>
<style>