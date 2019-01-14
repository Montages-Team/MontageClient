<template lang="pug">
  wrapper.is-clearfix
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
