<template lang='pug'>
  div
    Loading
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import Loading from '../components/organisms/Loading.vue';


@Component({
  components: {
    Loading,
  },
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
