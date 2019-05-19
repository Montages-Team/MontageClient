<template lang='pug'>
  div
    TopMenu(:items='items' v-if='this.$route.name !== "home"')
    router-view
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import TopMenu from '../molecules/TopMenu.vue';

@Component({
  components: {
    TopMenu,
  },
})
export default class Home extends Vue {
  public items: object = [
    {label: '利用規約', url: 'terms'},
    {label: 'プライバシーポリシー', url: 'privacy_policy'},
  ];
}
</script>

<style lang='stylus' scoped>

<style>