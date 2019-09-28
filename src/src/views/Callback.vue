<template lang='pug'>
  div
    sui-segment
      sui-dimmer(active='')
        sui-loader
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';


@Component({
})
export default class Callback extends Vue {
  public screenName: string = '';

  public created() {
    this.$auth.handleAuthentication();
  }

  @Emit()
  public handleLoginEvent(data: any) {
    this.screenName = data.profile[`https://montage.bio/screen_name`];
    this.$router.push(data.state.target || `/profile/${this.screenName}`);
  }

}
</script>
