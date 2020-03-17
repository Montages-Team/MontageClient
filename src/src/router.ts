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
const Individual = () => import(
  /* webpackChunkName: "individual" */
  './components/organisms/Individual.vue');

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
    'impression',
  ];

const router = new Router({
  // デフォルトの挙動ではURLに#が含まれるが、
  // mode:historyを指定することでURLからhashを取り除くことができる。
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    // 遷移時に画面最上部へh移動
    if (from.name !== to.name) {
      return { x: 0, y: 0 };
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/settings',
      name: 'settings',
      component: AccountSettings,
    },
    {
      path: '/deactivate',
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
          path: 'category/:categoryId',
          name: 'questions',
          component: Questions,
        },
        {
          path: 'impression/:impressionId',
          name: 'impression',
          component: Individual,
        },
      ],
    },
    {
      path: '/profile/:userName/404',
      name: 'notfound',
      component: NotFound,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});



router.beforeEach((to: any, from: any, next: any) => {
  const toPath = to.name as string;

  if (auth.isAuthenticated() && toPath === 'home') {
    // 認証済みでhome画面へ遷移しようとした際は自身のプロフィールへ遷移する
    return next({ name: 'callback' });
  }

  // 未ログインでアクセス許可されていないページに遷移しようとしたらトップページへリダイレクトする
  if (!auth.isAuthenticated() && !PUBLIC_ALLOWED_ACCESS.includes(toPath)) {
    return next({ name: 'home' });
  }

  if (toPath === 'callback') {
    // 認証済みでhome画面へ遷移しようとした際は自身のプロフィールへ遷移する
    if ( auth.profile === undefined ) {
      return next();
    }
    return next({ name: 'profile', params: {userName: auth.profile['https://montage.bio/screen_name'] }});
  }

  return next();
});



export default router;
