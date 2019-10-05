import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/pages/Home.vue';
import Callback from './views/Callback.vue';
import Profile from './components/pages/Profile.vue';
import Impressions from './components/organisms/Impressions.vue';
import Questions from './components/organisms/Questions.vue';
import Terms from './components/organisms/Terms.vue';
import SettingsMenu from './components/molecules/SettingsMenu.vue';
import AccountSettings from './components/organisms/AccountSettings.vue';
import ChangePasswordForm from './components/organisms/ChangePasswordForm.vue';
import ChangeMailForm from './components/organisms/ChangeMailForm.vue';
import DeactivateForm from './components/organisms/DeactivateForm.vue';
import Privacy from './components/organisms/Privacy.vue';
import Faq from './components/organisms/Faq.vue';
import auth from './auth/authService';

Vue.use(Router);

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
      path: '/settings',
      name: 'settings',
      component: SettingsMenu,
    },
    {
      path: '/account',
      name: 'account',
      components: {
        settings: AccountSettings,
      },
    },
    {
      path: '/change_password',
      name: 'change_password',
      component: ChangePasswordForm,
    },
    {
      path: '/change_mail',
      name: 'change_mail',
      component: ChangeMailForm,
    },
    {
      path: '/deactivate',
      name: 'deactivate',
      components: {
        settings: DeactivateForm,
      },
    },
    {
      path: '/terms',
      name: 'terms',
      component: Terms,
    },
    {
      path: '/privacy_policy',
      name: 'privacy_policy',
      component: Privacy,
    },
    {
      path: '/help',
      name: 'faq',
      component: Faq,
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
  if (to.path === '/' || to.path === '/callback' || auth.isAuthenticated()) {
    return next();
  }

  // 認証後に返されるパスをcustomStateパラメータとして指定する。
  auth.login({ target: to.path });
});

export default router;
