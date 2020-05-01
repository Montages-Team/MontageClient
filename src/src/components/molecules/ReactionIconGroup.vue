<template lang="pug">
    div
      sui-button-group.button-group(icons size="small")
        sui-button.icon-button-group(v-show="isAbleToDelete" icon='trash' @click="deleteAlert")
        sui-button.icon-button-group(v-show="!isAbleToDelete" icon='')
        sui-button.icon-button-group(icon='share' @click="toggleShareModal")
        sui-button.icon-button-group(icon='paint brush', @click="openImpressionModal")
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import { DeleteImpressionMutation } from '../../constants/delete-impression-query';
import { impressionQuery } from '../../constants/get-user-impression-query';
import { impressionLocalQuery } from '../../constants/get-user-impression-local-query';
import { answersForIndividualPageLocalQuery } from '../../constants/get_answers_for_individual_page_local_query';
import { answersForIndividualPageQuery } from '../../constants/get_answers_for_individual_page_query';

@Component({})
export default class ReactionIconGroup extends Vue {
  @Prop({ type: Number })
  private impressionId!: number;

  @Prop({ type: Number })
  private deleteIndex!: number;

  @Prop({ type: String })
  private routeName!: string;

  @Prop({ type: String })
  private nextId!: string;

  @Prop({ type: String })
  private createrUserName!: string;

  private pageSize: number = 15;
  private MatchedQA: any = null;

  private get isAbleToDelete() {
    const authUserName = this.$parent.$auth.profile[`https://montage.bio/screen_name`];
    const routeUserName = this.$route.params.userName;
    // 認証ユーザ名と現在見ているユーザの名前が一致するか?
    const isOwnerProfile = routeUserName === authUserName;
    // 自分が投稿した回答か?
    const isMyPostedContent = this.createrUserName === authUserName;
    return ( isOwnerProfile || isMyPostedContent ) ? true : false;
  }

  @Emit()
  public deleteAlert() {
    if (
      confirm('この操作は取り消せません。本当にこの回答を削除しても大丈夫ですか？')
    ) {
      const mutation = this.$apollo.mutate({
        mutation: DeleteImpressionMutation,
        variables: {
          deleteImpressionId: this.impressionId,
        },
        update: (store: any) => {
          // ページごとにキャッシュを取得するためのクエリを切り替える
          const impressionsVariables = {
            name: this.$route.params.userName,
            page: 0,
            size: this.pageSize,
          };
          const indivisualVariables = {
            targetUserName: this.$route.params.userName,
            targetImpressionId: this.impressionId,
          };
          const variables = (this.routeName === 'impressions') ? impressionsVariables : indivisualVariables;
          const query = (this.routeName === 'impressions') ? impressionLocalQuery : answersForIndividualPageLocalQuery;

          // ローカルステート(cache)から回答一覧を取得する
          while (!this.MatchedQA) {
            const data = store.readQuery({ query, variables });
            // 削除される回答が所属するQ&Aのオブジェクトをfindで見つける
            if (this.routeName === 'impressions') {
                /**
                 * QAが持つitemsのIDがimpressionIdとマッチしなかったら
                 * 削除したい回答を持つQAが存在しないので新たに読み込む
                 */
                this.MatchedQA = data.userImpressions.find(
                  (v: any) => v.items[0].id === this.impressionId);
                // 一覧ページはページネーションがあるので見つからなかったら再取得
                if (!this.MatchedQA) { this.pageSize += 15; continue; }

                // 回答内に該当のIDのものが存在したら配列から除外する処理をforEachでループさせる
                this.MatchedQA.items.forEach((answer: any, index: number) => {
                    if (this.MatchedQA.items.length === 1) {
                      // QAごと削除
                      const idx = data.userImpressions.indexOf(this.MatchedQA);
                      if (idx !== -1) {
                        data.userImpressions.splice(idx, 1);
                      }
                    } else if (answer.id === this.impressionId) {
                      // 削除する回答だけ削除
                      this.MatchedQA.items.splice(index, 1);
                    }
                  },
                );
            } else if (this.routeName === 'individual') { // 個別ページの場合の処理
                this.MatchedQA = data.answersForIndividualPage.find(
                  (v: any) => v.impressionId === this.impressionId,
                );
                // 個別ページは一気に一覧を取得するので更新の必要がない
                if (!this.MatchedQA) { break; }
                if (data.answersForIndividualPage.length !== 1) {
                  const idx = data.answersForIndividualPage.indexOf(this.MatchedQA);
                  data.answersForIndividualPage.splice(idx, 1); // 削除する回答だけ削除
                }
            } else {
              console.info('不自然な処理です');
            }
            store.writeQuery({ query, variables, data });
          }
          // 終わったらリセットする
          this.MatchedQA = null;
        }, // updateの終わり
      });
      mutation
        .then(({ data }) => {
          if (!data) {
            throw new Error('data is undefined');
          }
          const res = data.deleteImpression;
          return res;
        })
        .then(({ ok, errors }) => {
          if (ok) {
            if (this.routeName === 'individual') {
              if (this.nextId === '' || this.nextId.length === 0) {
                // 個別ページで次ページのID指定がない場合はプロフィールに飛ぶ
                this.$router.push({ name: 'profile', params: { userName: this.$route.params.userName }});
              } else {
               // 個別ページで削除された場合は、次の質問へリダイレクト
               this.$router.push({
                 name: 'impression',
                 params: { impressionId: this.nextId, userName: this.$route.params.userName }},
               );
              }
            }
          }
        })
        .catch((error) => {
          console.log('catch error');
          console.log(error);
        });
    }
  }

  @Emit()
  public openImpressionModal() {
    this.$emit('modalToggle');
  }
  @Emit()
  public toggleShareModal() {
    this.$emit('toggleShareModal');
  }
}
</script>

<style lang="stylus" scoped>
.button-group
  padding 0px !important
  width -webkit-fill-available
  width -moz-available

.icon-button-group
  background #FFF !important
  width auto

.right-icon-group
  display flex
</style>
