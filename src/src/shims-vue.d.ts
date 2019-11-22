declare module 'vue/type/vue' {
  // @ts-ignore
  import Vue from 'vue';
  // @ts-ignore
  import VueRouter from 'vue-router';
  interface Vue {
    $router: VueRouter;
    $apollo: any;
  }
}
