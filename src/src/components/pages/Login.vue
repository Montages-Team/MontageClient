<template lang='pug'>
  div
    h1 This is an Login page
    TwitterAuthButton
</template>


<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import TwitterAuthButton from '../atoms/TwitterAuthButton.vue';

@Component({
  components: {
    TwitterAuthButton,
  },
})
export default class Login extends Vue {
}
</script>

<style lang='stylus' scoped>
<style>