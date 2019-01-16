<template lang="pug">
  .wrapper
    .content_wrapper.clearfix
      .left_column
        img#profile(src='http://kalamu.com/neogriot/wp-content/uploads/2016/11/prince-02.jpg')
        .profile_area
          .username Prince
          p @mynameisprince
          |             Follow:
          a(href='#') 10
          |  Follower:
          a(href='#') 10
      .right_column.clearfix
        .heading.mb15 Princeに質問する
        .questions
          .question_wrapper
            .question_text
              | ここに質問を表示する
              | ここに質問を表示する
            .answer_button
              | 回答する
          .question_wrapper
            .question_text
              | ここに質問を表示する
              | ここに質問を表示する
            .answer_button
              | 回答する
          .question_wrapper
            .question_text
              | ここに質問を表示する
              | ここに質問を表示する
            .answer_button
              | 回答する
          .question_wrapper
            .question_text
              | ここに質問を表示する
              | ここに質問を表示する
            .answer_button
              | 回答する
        .heading.mb15 Princeへの質問と回答
        .new_question_form.clearfix(type='text' placeholder='新しい質問をつくりましょう')
          .profile_question_wrapper
            .question_text.clearfix
              | Q. いままで何カ国を旅したことがありますか？
            .profile_image(src='http://kalamu.com/neogriot/wp-content/uploads/2016/11/prince-02.jpg')
              .answer_text
                | ハワイ、カナダ、オーストラリアの3カ国です！！
                br
                |               ほかにもいろんな国にいきたいなぁ〜〜
          .button_area.clearfix
            .collage_button すべての回答
            .collage_button 回答する
</template>

<style lang="stylus" scoped>
primary = #B464A3

.content_wrapper
  margin 0 auto
  width 68vw
  height 100%
  color #555

@media (max-width 770px)
  .content_wrapper
    margin 0 auto
    width 100vw
    height 100%
    color #555

.heading
  font-size 2.8vh
  font-weight bold
  border-bottom solid 3px primary

.left_column
  display block
  position fixed
  background white
  float left
  width 16%
  word-wrap break-word
  border 1px solid #eee
  border-radius 5px
  box-shadow 1px 1px 2px #ccc

@media (max-width 770px)
  .left_column
    display block
    float none
    width 100%
    position relative
    margin-bottom 10px

.username
  font-weight bold

.profile_area
  text-align center
  padding 10px 0px 20px 0px

.right_column
  display block
  background white
  float right
  width 75%
  padding 20px
  border 1px solid #eee
  border-radius 5px
  box-shadow 1px 1px 2px #ddd

@media (max-width 770px)
  .left_column, .right_column
    display block
    float none
    position relative
    width 100%

.questions
  display grid
  grid-template-columns repeat(auto-fit minmax(300px 1fr))
  grid-template-rows 1fr 1fr
  grid-gap 30px
  margin-bottom 30px

.question_text
  display block
  margin 0px
  padding 0px
  grid-column 1/3

.answer_button
  margin-top 10px
  padding 1px 0px
  width 100%
  font-size 80%
  outline 0px
  border 1px solid primary
  border-radius 5px
  color #AA1D81
  background white
  text-align center

.new_question_form
  display block
  width 100%
  padding 5px 10px
  background white
  outline none
  margin-bottom 10px
  font-size 95%

.answer_text
  position relative
  margin-top 10px
  margin-left 20px
  padding 10px 25px
  border-radius 10px
  background #eee
  width 400px
  float left
  &::before
    position absolute
    content ''
    border 10px solid transparent
    top 15px
    left -20px

  &::after
    position absolute
    content ''
    border 10px solid transparent
    border-right 10px solid #eee
    top 15px
    left -19px

.profile_image
  width 48px
  display block
  float left
  margin-top 15px
  border-radius 5px

.profile_question_wrapper
  display grid
  grid-template-columns 50px 1fr

.collage_button
  display block
  color primary
  float right
  margin-top 10px
  font-size 80%
  padding 2px 5px
  border-radius 5px
  border primary 1px solid
  margin-left 10px

.button_area
  display block
</style>
