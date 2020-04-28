<template lang="pug">
    div
      sui-label(basic size='mini' color='red' pointing style="left: 60%;") 質問に回答しましょう!
      sui-message.message-box
        p.main-message "デタラメ"なプロフィールへようこそ！
        p.sub-message 基本ルール
        sui-feed
          sui-feed-event(:image='image', date='ルールその①', summary='誰でも匿名で回答することができます。')
          p.sub-message montage.bioは自由が許されています
        sui-feed
          sui-feed-event(:image='image', date='ルールその②', summary='ホントもウソもOK')
          p.sub-message 信じすぎず、ウソをウソとして楽しもう
        sui-feed
          sui-feed-event(:image='image', date='ルールその③', summary='人にされて嫌なことはしない')
          p.sub-message montage.bioは性善説に基づいています
      sui-message.message-box
        p.main-message What's Next?
        div.buttonstyle__normal
          sui-button-group(size='small' style="padding: 5px;")
            sui-button(content='サイトを知る' @click="pushToContent" )
            sui-button-or
            sui-button(content='質問ページへ' positive @click="pushToQuestion")
 </template>

<script lang='ts'>
// TODO: ボタンに色
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import { Message } from 'semantic-ui-vue';

@Component({})
export default class NoImpressionCard extends Vue {
  private image: string = 'https://res.cloudinary.com/hzmikcp3i/image/upload/v1587383328/production/zty61yhomtkl7thyhdmn.jpg';

  @Emit()
  private pushToContent() {
    this.$router.push(`/about`);
  }

  @Emit()
  private pushToQuestion() {
    const url = `/profile/` + this.$route.params.userName + `/category/1`;
    this.$router.push(url);
  }

}
</script>

<style lang="stylus" scoped>
.card
  box-shadow none !important
  width auto !important

.sub-message
  text-align center
  font-weight bold
  color #979797
  padding 3% 10%

.main-message
  text-align center
  font-weight bold
  color #979797
  font-size 16px
  padding 5%

.message-box
  padding 12% 8% !important
  box-shadow none !important
  background #fff !important

.link-style
  display inline-block
  color #B464A3
  font-size 12px
  padding 5px
  text-decoration none

.buttonstyle__normal
  margin 0px 14% !important
  width 72% !important
  color #fff !important
  border-radius 5px !important
</style>