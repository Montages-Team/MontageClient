<template lang="pug">
    div
      div.content-for-pc
        div.about-wrapper
          h2.about-title このサイトについて
          div.about-content-wrapper
            h3 Montage はユーモア持ったユーザのための匿名プロフィールSNSです
            p.about-description
              a(href='https://ansaikuropedia.org/wiki/Uncyclopedia:アンサイクロペディアについて') アンサイクロペディア
              | のようにデタラメが前提なプロフィールがあったら面白いなと思い作りました。
            p.about-description 暇な時に一人でもこっそり友達にちょっかいを出す感覚で使えるサービスを目指しています。
            h3 サービスの特徴
            p.about-description Montageのプロフィール作成はQ&A方式で質問に答えていくことで作成していくことができます。
            p.about-description
              | Montageが通常のSNSと異なる点は、自分のプロフィール帳に自分だけではなく他者も書き込むことができる点です。
              | つまり、ホントもデタラメも書き手の自由ということです。
            h3 サービス名の由来は?
            p.about-description 色々な人から見たあなたの情報を集めて一つのプロフィールにするというコンセプトから、Montageと名付けました。
            p.about-description
              | まわりの人から見たあなたに対するイメージ・情報はインターネット上に現れにくい側面があります。
              | みんな自分のアカウントでは自分の話したいことしか投稿しないからです。
            p.about-description
              | しかし、Montageでは多方面から情報が集まって、いわば”モンタージュ写真”のようにあなたのプロフィールを形成していきます。
              | そうすることであなたのキャラクターだったり、意外な一面が現れてくるかも..?
            h3 運営者情報
            li
              | サイト公式Twitterアカウント
              a(href='https://twitter.com/montage_bio') @montage_bio

</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

@Component({
  head: {
    title: {
      inner: 'このサイトについて',
      separator: '/',
    },
    meta: [
      {
         name: 'description',
         content: 'montage.bio はユーモア持ったユーザのための匿名プロフィールSNSです。',
      },
    ],
  },
})
export default class About extends Vue {
}
</script>

<style lang='stylus' scoped>
h3:first-child
  margin-top 24px
  margin-bottom 8px

.about-wrapper
  margin 16px
  padding 16px
  background #FFF
  border-radius 4px

.about-title
  font-size 24px
  margin-bottom 8px
  padding-bottom 4px
  border-bottom 2px solid #9274b2

.about-description
  font-size 16px
  color #666666
  letter-spacing 1px
  line-height 1.8
  margin-bottom 12px
  padding 8px 0

.about-content-wrapper
  margin 8px
</style>