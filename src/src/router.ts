import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/pages/Home.vue';
import Callback from './views/Callback.vue';
import Profile from './components/pages/Profile.vue';
import TermsTemplate from './components/pages/TermsTemplate.vue';
import PrivacyTemplate from './components/pages/PrivacyTemplate.vue';
import Impressions from './components/organisms/Impressions.vue';
import Questions from './components/organisms/Questions.vue';
import AccountSettings from './components/organisms/AccountSettings.vue';
import DeactivateForm from './components/organisms/DeactivateForm.vue';
import Faq from './components/pages/Faq.vue';
import auth from './auth/authService';
import About from './components/pages/About.vue';

Vue.use(Router);

// ログインしてなくてもアクセスできるページのパス
const UNLOGINDED_ALLOWED_PAGES = ['home', 'terms', 'privacy_policy', 'help', 'callback'];

const router = new Router({
  // デフォルトの挙動ではURLに#が含まれるが、
  // mode:historyを指定することでURLからhashを取り除くことができる。
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/settings/:userId',
      name: 'settings',
      component: AccountSettings,
    },
    {
      path: '/deactivate/:userId',
      name: 'deactivate',
      component: DeactivateForm,
    },
    {
      path: '/terms',
      name: 'terms',
      component: TermsTemplate,
    },
    {
      path: '/privacy_policy',
      name: 'privacy_policy',
      component: PrivacyTemplate,
    },
    {
      path: '/help',
      name: 'faq',
      component: Faq,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/callback',
      name: 'callback',
      component: Callback,
    },
    {
      path: '/profile/:userName',
      component: Profile,
      children: [
        {
          path: '',
          name: 'profile',
          component: Impressions,
        },
        {
          path: 'q/:categoryName',
          name: 'questions',
          component: Questions,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const nextPath = to.name as string;
  // 未ログインでアクセス許可されていないページに遷移しようとしたらトップページへリダイレクトする
  if (!auth.isAuthenticated() && !UNLOGINDED_ALLOWED_PAGES.includes(nextPath)) {
    return next({ name: 'home' });
  }

  return next();

});

export default router;
