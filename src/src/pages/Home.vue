<template lang="pug">
  wrapper
    .content_wrapper
      .columns
        .column.is-half.has-text-centered
          .montage_mark
            img.montage_san#montage-icon(src='https://1.bp.blogspot.com/-Oj1kdRN-f3A/Wzm6njg1V4I/AAAAAAAABYk/AQiC2wwyvBMeAraoqoDReXymOLVlKZJGgCLcBGAs/s320/default.png' alt='montage')
          .catch_copy 友達も好きな人も自由にいじろう
          |             匿名で本音もネタも徒然なるままに
          br
          | アンサイクロペディアのようなプロフィール帳
        .column.is-half.pb40
          .heading ユーザを検索する
          input.input.m-r-5(type='text' placeholder='アカウント名かIDを入力してください')
          .vertical_spacer
            .heading ログイン・新規登録
            .buttons_area
              // TODO: is-primaryはbulmaの色指定になっているのでbuefyへ変更する必要
              a.button.is-primary.is-fullwidth.mb10
                span.icon
                  img.icon(src='https://1.bp.blogspot.com/-Oj1kdRN-f3A/Wzm6njg1V4I/AAAAAAAABYk/AQiC2wwyvBMeAraoqoDReXymOLVlKZJGgCLcBGAs/s320/default.png')
                span Montageアカウントでログイン
              a.button.is-info.is-fullwidth.mb10
                span.icon
                  i.fab.fa-twitter
                span Twitterアカウントでログイン
              .signup_btn
                a(href='#') アカウントを新規登録する
</template>

<style lang="stylus" scoped>
.wrapper
  padding-top 75px

.content_wrapper
  margin 0 auto
  width 74vw
  height 100%
  border-radius 3px
  color #555

.montage_mark
  background linear-gradient(#B464A3,#807DBA)
  border-radius 50%
  margin 20px auto
  width 20vh
  height 20vh

.montage_san
  margin-top 19%
  width 60%
  height 60%

.catch_copy
  font-size 2.7vh
  font-weight bold

.heading
  font-size 2.3vh
  border-bottom 2px solid #fafafa
  margin-bottom 10px
  text-align center

.buttons_area
  text-align center

.signup_btn
  display block
  text-align center
  text-decoration underline

.vertical_spacer
  display block
  margin 30px 0px
</style>
