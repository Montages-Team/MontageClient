<template lang="pug">
  .wrapper.is-clearfix
    #header-left.is-pulled-left
      #logo Montage
    #header-right.desktop.is-pulled-right
      nav.level
        .level-right
          .level-item
            .field.has-addons
              p.control
                input.input.is-small(type='text', placeholder='アカウント名・ID')
              p.control
                button.button.is-small
                  | 検索
          p.level-item
            button.button.is-small ログイン
          p.level-item
            button.button.is-small 新規登録
</template>

<style lang="stylus">
   .wrapper
      display block
      width 68vw
      margin auto

  .header
    z-index 1
    display block
    width 100%
    height 50px
    background linear-gradient(#B464A3#807DBA)
    position fixed
    box-shadow 1px 2px 5px #AAA
    text-align center

  .left_wrapper
    display block
    height 50px
    width auto
    float left
    text-align center
    padding-left 15px

  .right_wrapper
    display block
    height 50px
    float right
    margin-top 10px
    width auto

  #logo
    display inline-block
    font-size 3vh
    font-weight bold
    font-family Pacifico, Gerogia, Times, serif
    color white
    text-align left
    line-height 50px
    &:hover
      color #444
</style>
