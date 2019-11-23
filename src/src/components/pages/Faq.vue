<template lang="pug">
    div
      div.faq-wrapper
        h2.faq-title よくある質問
        div.faq-content-wrapper
          h3 Q. Montageとは何ですか？
          h5.faq-description A. Montageは自分を含むユーザのプロフィールを匿名で自由にいじれるサービスです。
          h3 Q. 他のサービスとの違いは?
          h5.faq-description A. 不特定多数の人があなたのプロフィールを編集できるという特色があります。
          h3 Q. 無料で使えますか?
          h5.faq-description A. 利用は無料です。あなたや、あなたの友人のプロフィールもぜひ作りましょう！
          h3 Q. Collageとは何ですか？
          h5.faq-description
            | A. すでに存在する回答をあなたの考えた回答に変えることができる機能です！
            | 良い回答が思いついたらどんどんCollageしましょう！
          h3 Q. Twitterアカウントを作らないといけませんか?
          h5.faq-description A. MontageはTwitter連携サービスなのでTwitterアカウントがなければ利用できません。
          h3 Q.質問作成者や回答者の情報は公開されていますか？
          h5.faq-description A. 質問、回答はともに匿名で行われており確認することはできません。
          h3 Q. 非公開アカウント（フォロワー限定公開アカウント）を作成することはできますか？
          h5.faq-description
            | A. できません。アカウントの情報は全てのユーザに公開されます。
            | ユーザ様のご要望が多い場合新機能として実装するかもしれません。
          h3 Q. 追加してほしい機能があります
          h5.faq-description
            | A. 新機能のご要望は
            a(href='https://form.run/@montage') こちら
            | へ投稿してください。
          h3 Q. 退会するにはどうすればいいですか？
          h5.faq-description A. 設定ページにアカウント削除ページへ遷移するボタンがあります。

</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
const FeatureColumn = () => import(
  /* webpackChunkName: "feature-column" */
  '../molecules/FeatureColumn.vue');

@Component({
  components: {
    FeatureColumn,
  },
})
export default class Faq extends Vue {
}
</script>

<style lang='stylus' scoped>
h3
  margin 8px 0

h3:first-child
  margin-top 24px
  margin-bottom 8px

.faq-description
  color #666666
  letter-spacing 1px
  line-height 1.8
  margin 0 0 4px
  padding 8px 0

.column-icon
  font-size smaller
  margin 8px

.faq-column-size
  width 325px
  margin auto

.label-margin
  margin 8px 0px 0px !importan

.faq-wrapper
  margin 16px
  padding 16px
  background #FFF
  border-radius 4px

.faq-title
  font-size 24px
  margin-bottom 8px
  padding-bottom 4px
  border-bottom 2px solid #9274b2

.faq-content-wrapper
  margin 8px
</style>