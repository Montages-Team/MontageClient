<template lang="pug">
sui-container.header-container
  .header
    router-link.header-link(to='/') montage
</template>

<!-- a.header-link.header-link-image(href="/") -->
<!--   sui-image.montage_logo_image(src='http://www.family.co.jp/content/dam/img/logo/logo_fm.png', alt='montage') -->

<style lang="stylus" scoped>
  .header
    display flex
    position: fixed;
    width: 100%;
    height: 56px;
    left: -1px;
    top: 0px;
    z-index 100
    background: linear-gradient(180deg, rgba(180, 100, 163, 0.47) 0%, rgba(255, 255, 255, 0) 100%), #807DBA;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

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

  .logotype
    display inline-block
    margin auto 0px
    padding 5px
    height 56px
    font-family Work Sans
    font-style normal
    font-weight normal
    font-size 20px
    line-height normal
    color black
    text-shadow 0px 3px 3px rgba(255, 255, 255, 0.25)

  .montage_logo_image
    margin 8% auto
    height 66.6%
    display inline-block
    position absolute

  .header-container
    width 100%
    height 56px

  .svg-logo
    x: 0px;
    y: 0px;
    width: 200px;
    height: 40px;

  .header-link
    margin 0 auto
    color #fff
    margin auto

  .header-link-image
    height inherit
</style>
