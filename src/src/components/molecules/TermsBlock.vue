<template lang='pug'>
  div
    slot(name="terms-header")
    slot(name="terms-column")
</template>

<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

@Component({})
export default class TermsBlock extends Vue {
}
</script>

<style lang='stylus' scoped>

</style>