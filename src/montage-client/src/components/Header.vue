<template lang=pug>
  .wrapper.is-clearfix
    leftwrapper#header-left.is-pulled-left
      logo#logo Montage
    rightwrapper#header-right.desktop.is-pulled-right
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

<style lang=stylus>
   .wrapper
      display: block
      width: 68vw
      margin: auto

  .Header
    zIndex: 1
    display: block
    width: 100%
    height: 50px
    background: linear-gradient(#B464A3#807DBA)
    position: fixed
    boxShadow: 1px 2px 5px #AAA
    textAlign: center

  .LeftWrapper
    display: block
    height: 50px
    width: auto
    float: left
    textAlign: center
    paddingLeft: 15px

  .RightWrapper
    display: block
    height: 50px
    float: right
    marginTop: 10px
    width: auto

  .Logo
    display: inline-block
    fontSize: 3vh
    fontWeight: bold
    fontFamily: Pacifico, Gerogia, Times, serif
    color: white
    textAlign: left
    lineHeight: 50px
    &:hover
      color: #444
</style>
