<template lang="pug">
  div
    transition(v-if="isMobile")
      .modal-mask(v-show="open")
        .modal-wrapper
          .modal-container
            .modal-header(v-show="isInvalidInput" style="width: inherit;")
              sui-message(warning style="margin: 4px; width: inherit;") 文字数が不正です.
            .modal-header
              ConfirmButton.button-cancel(content="キャンセル" @cancelImpression="toggleOpen")
              ConfirmButton(:content='postButtonContent' @emitPost="postMutation")
            .modal-body
              textarea.modalform__body.font-size__small(
                v-model="impressionInput"
                :placeholder="placeholder"
                :maxlength="maxCount")
              sui-container(text-align='right')
                p(style="color: #AAAAAA;") {{ this.impressionInput.length }}/42
    sui-modal.dimmed(v-else v-model="open" size="tiny")
      sui-modal-header
        span(@click="toggleOpen")
          i.close.icon
      sui-modal-header
        .modal-body
          sui-form(inverted)
            sui-form-field
              input.modal-fontsize(
                v-model="impressionInput"
                :placeholder="placeholder"
                :maxlength="maxCount")
              sui-container(text-align='right')
                p(style="color: #AAAAAA;") {{ this.impressionInput.length }}/42
      .modal-header(v-show="isInvalidInput" style="width: inherit;")
        sui-message(warning style="margin: 4px; width: inherit;") 文字数が不正です.
      .modal-header
        ConfirmButton(:content='postButtonContent' @emitPost="postMutation")
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import router from '../../router';
import { CreateImpressionMutation } from '../../constants/create_impression_query';
import isMobile from 'ismobilejs';

const ConfirmButton = () => import(
  /* webpackChunkName: "confirm-button" */
  '../atoms/ConfirmButton.vue');

@Component({
  components: {
    ConfirmButton,
  },
})
export default class ModalForm extends Vue {
  private impressionInput: string = '';
  private open: boolean = false;
  private maxCount: number = 42;
  private isInvalidInput: boolean = false;

  @Prop({ type: Number })
  private selectedQuestionId!: number;

  @Prop({ type: String })
  private placeholder!: string;

  @Prop({ type: String })
  private postButtonContent!: string;

  @Watch('open')
  public toggleScroll() {
    const modal: any = document.querySelector('.modals');
    if (this.open === true) {
      disableBodyScroll(modal);
    } else {
      enableBodyScroll(modal);
    }
  }

  @Emit()
  public toggleOpen(): void {
    this.open = !this.open;
    if (this.open === false) {
      this.isInvalidInput = false;
    }
  }

  private get isMobile() {
    return isMobile(navigator.userAgent).phone;
  }

  @Emit()
  private postMutation(isCollage: boolean) {
    if (this.impressionInput.length > 0 && this.impressionInput.length < 43) {
      this.isInvalidInput = false;
      const mutation = this.$apollo.mutate({
        mutation: CreateImpressionMutation,
        variables: {
          content: this.impressionInput,
          userName:  this.$route.params.userName,
          questionId: this.selectedQuestionId,
        },
      });
      mutation
        .then(({ data }) => {
          if (!data) {
            throw new Error('data is undefined');
          }
          const res = data.createImpression;
          return res;
        })
        .then(({ ok, impression, errors }) => {
          if (ok) {
            console.log(this.$route.name);
            if (this.$route.name === 'profile') {
              this.$emit('toggle');
              this.impressionInput = '';
            } else if (this.$route.name === 'individual') {
              this.$router.push(`/profile/${this.$route.params.userName}`);
            } else {
              this.$router.push(`/profile/${this.$route.params.userName}`);
            }
            const modal: any = document.querySelector('.modals');
            enableBodyScroll(modal);
          }
        }).catch((error) => {
          console.log(error);
        });
    } else {
      console.error('invalid input length.');
      this.isInvalidInput = true;
      return;
    }
  }
}
</script>

<style lang="stylus" scoped>
.button-cancel
  margin-left auto

.dimmed
 background rgba(0, 0, 0, 0.4) !important

.modal-mask
  position fixed
  z-index 9998
  top 0
  left 0
  width 100%
  height 100%
  background-color rgba(0, 0, 0, 0.1)
  display table
  transition opacity .3s ease

.modal-wrapper
  display table-cell
  vertical-align bottom

.modal-container
  width 100%
  height 76%
  margin 0px auto
  background-color #fff
  border-radius 2px
  box-shadow 0 2px 8px rgba(0, 0, 0, .33)
  transition all .3s ease
  font-family Helvetica, Arial, sans-serif

.modal-header
  display flex
  background #FFFFFF !important
  padding 8px !important
  float right

.modal-body
  height 100%

.modal-default-button
  float right

.modal-enter
  opacity 0

.modal-leave-active
  opacity 0

.modal-enter .modal-container, .modal-leave-active .modal-container
  -webkit-transform scale(1.1)
  transform scale(1.1)

.modalform__body
  width 100%
  height inherit
  padding 8px 16px
  line-height 2
  font-color #AAAAAA
  resize none
  height 144px
  outline none
  user-select text
  white-space pre-wrap
  overflow-wrap break-word

</style>
