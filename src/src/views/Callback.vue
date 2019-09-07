<template lang='pug'>
  div
    sui-segment
      sui-dimmer(active='')
        sui-loader
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';

@Component({
  created() {
    this.$auth.handleAuthentication();
  },
})
export default class Callback extends Vue {

  @Emit()
  public handleLoginEvent(data: any) {
    if (data.error) {
      this.$router.push('/');
    } else {
      this.$router.push(data.state.target || '/auth0_callback/');
    }
  }
}
</script>
