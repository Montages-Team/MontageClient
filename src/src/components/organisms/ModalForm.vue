<template lang="pug">
  div
    transition(name='modal')
      .modal-mask
        .modal-wrapper
          .modal-container
            .modal-header
              ConfirmButton(content="キャンセル" backgroundColor="#dddddd" style="margin-right: 10px;" @cancelImpression="$listeners['offModal']")
              ConfirmButton(content="投稿する" backgroundColor="#B464A3" @emitPost="postMutation")
            .modal-body
              textarea.modalform__body.font-size__small(v-model="impression" :placeholder="placeholder")
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import ConfirmButton from '../atoms/ConfirmButton.vue';
import router from '../../router';
import { CreateImpressionMutation } from '../../constants/create_impression_query';

@Component({
  components: {
    ConfirmButton,
  },
})
export default class ModalForm extends Vue {
  private impression: string = '';

  @Prop({ type: Number })
  private selectedQuestionId!: number;

  @Prop({ type: String })
  private placeholder!: string;

  @Emit()
  public postMutation() {
    const mutation = this.$apollo.mutate({
      mutation: CreateImpressionMutation,
      variables: {
        content: this.impression,
        userName:  this.$route.params.userName,
        questionId: this.selectedQuestionId,
      },
      fetchPolicy: 'no-cache',
      // TODO: updateを追加してmutation後にprofile画面に遷移したときにimpressionを更新するようにする
      // refs: https://learn.hasura.io/graphql/vue/optimistic-update-mutations/2-mutation-cache
    });

    mutation
      .then(({ data: { result } }) => {
        console.log('ここまできてる');
        console.log(result);
        return result;
      })
      .then(({ ok, impression, errors }) => {
        console.log(ok);
        console.log(impression);
        if (ok) {
          console.log('success');
          this.$router.push(`/profile/${this.$route.params.userName}`);
        } else {
          console.log('fail');
        }
      });
  }
}
</script>

<style lang="stylus" scoped>
.modal-mask
  position fixed
  z-index 9998
  top 0
  left 0
  width 100%
  height 100%
  background-color: rgba(0, 0, 0, .5)
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
  background #F8F8F8
  padding 16px 0px 16px 50%

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

</style>