// このファイルはVueでtypescriptを使うときの独自の型定義です
import Vue from 'vue';

declare module '*.vue' {
  export default Vue;
}

declare module 'vue/types/vue' {
  interface Vue {
    $auth: any;
  }
}
