import Vue from 'vue';
import Router from 'vue-router';
import auth from './auth/authService';

const Home = () => import(
  /* webpackChunkName: "home" */
  './components/pages/Home.vue');
const Callback = () => import(
  /* webpackChunkName: "callback" */
  './views/Callback.vue');
const Profile = () => import(
  /* webpackChunkName: "profile" */
  './components/pages/Profile.vue');
const TermsTemplate = () => import(
  /* webpackChunkName: "terms" */
  './components/pages/TermsTemplate.vue');
const PrivacyTemplate = () => import(
  /* webpackChunkName: "privacy" */
  './components/pages/PrivacyTemplate.vue');
const Impressions = () => import(
  /* webpackChunkName: "impressions" */
  './components/organisms/Impressions.vue');
const Questions = () => import(
  /* webpackChunkName: "questions" */
  './components/organisms/Questions.vue');
const AccountSettings = () => import(
  /* webpackChunkName: "settings" */
  './components/organisms/AccountSettings.vue');
const DeactivateForm = () => import(
  /* webpackChunkName: "deactivate" */
  './components/organisms/DeactivateForm.vue');
const Faq = () => import(
  /* webpackChunkName: "faq" */
  './components/pages/Faq.vue');
const About = () => import(
  /* webpackChunkName: "about" */
  './components/pages/About.vue');
const NotFound = () => import(
  /* webpackChunkName: "notfound" */
  './components/pages/NotFound.vue');

Vue.use(Router);

// ログインしてなくてもアクセスできるページのパス名
const PUBLIC_ALLOWED_ACCESS = [
    'home',
    'terms',
    'privacy_policy',
    'help',
    'about',
    'faq',
    'callback',
    'profile',
    'questions',
    'notfound',
  ];

const router = new Router({
  // デフォルトの挙動ではURLに#が含まれるが、
  // mode:historyを指定することでURLからhashを取り除くことができる。
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    // 遷移時に画面最上部へh移動
    return { x: 0, y: 0 };
  },
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
      path: '/faq',
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
    {
      path: '/profile/:userName/404',
      name: 'notfound',
      component: NotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const nextPath = to.name as string;
  // 未ログインでアクセス許可されていないページに遷移しようとしたらトップページへリダイレクトする
  if (!auth.isAuthenticated() && !PUBLIC_ALLOWED_ACCESS.includes(nextPath)) {
    return next({ name: 'home' });
  }

  return next();

});

export default router;
