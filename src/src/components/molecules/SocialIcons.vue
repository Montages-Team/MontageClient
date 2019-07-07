<template lang='pug'>
    div
      div(v-for="icon in ['facebook', 'twitter', 'instagram']")
        //- sui-button.social-round-icon(circular='', social='', icon='')
        p {{ icon }}
</template>

<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

const icons: string[] = [
  'facebook',
  'twitter',
  'instagram',
];

@Component({})
export default class SocialIcons extends Vue {

}
</script>

<style lang='stylus' scoped>
<style>