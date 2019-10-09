<template lang='pug'>
div.body
    .menu-wrapper
        .header-menu(v-for='i in menuItems')
            .menu-item(@click="goto(i.link)")
                i.icon.column-icon(:class="i.icon" v-if="i.icon")
                | {{ i.itemName }}
                .sub-item(v-if="i.subItem") {{ i.subItem }}
</template>

<script lang='ts'>
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

@Component({})
export default class HeaderMenu extends Vue {
    @Prop({ type: String }) private userName!: string;
    @Prop({ type: String }) private userId!: string;
    private menuItems: any = [
        {
            itemName: this.userName,
            subItem: this.userId,
            link: null,
            icon: null,
        },
        {
            itemName: 'Profile',
            link: `/profile/${this.userId}`,
            icon: 'user',
         },
        {
            itemName: '設定',
            link: '/settings',
            icon: 'cog',
        },
        {
            itemName: '利用規約',
            link: '/terms',
            icon: 'info',
        },
        {
            itemName: 'プライバシーポリシー',
            link: '/privacy_policy',
            icon: 'privacy',
        },
        {
            itemName: 'ログアウト',
            link: 'logout',
            icon: 'logout',
        },
    ];
    private closeModal(e: any) {
        if (e.target.className === this.$el.className) {
            this.$emit('toggleHeaderMenu');
        }
    }
    private goto(link: string) {
        if (link === null) {
            return;
        }
        if (link === 'logout') {
            this.$auth.logOut();
            return;
        }
        this.$emit('toggleHeaderMenu');
        this.$router.push(link);
    }
    private created() {
        window.addEventListener('click', this.closeModal);
    }
    private beforeDestroy() {
        window.removeEventListener('click', this.closeModal);
    }
}
</script>

<style lang='stylus' scoped>
a:link, a:visited
    color #333
.body
    position absolute
    top 0
    margin 0
    overflow hidden
    background-color rgba(0, 0, 0, 0.3)
    width 100vw
    height 100vh

.menu-wrapper
    position absolute
    margin 0
    right 0
    font-size 120%
    width 60vw
    height 100vh
    background #fafafa
    .menu-item
        display block
        padding 12px
        border-bottom 1px #ddd solid
        pointer cursor
        .column-icon
            color: #807DBA
            margin-right 10px
        .sub-item
            color #999
            padding-top 5px
</style>