<template lang='pug'>
    div
      p よくある質問
</template>

<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

@Component({
  head: {
    title: {
      inner: 'よくある質問',
      separator: '/',
    },
    meta: [
      {
         name: 'description',
         content: 'サービスについてのよくある質問を記載したページ',
      },
    ],
  },
})
export default class Faq extends Vue {

}
</script>

<style lang='stylus' scoped>
<style>