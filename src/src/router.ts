import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/pages/Home.vue';
import Login from './components/pages/Login.vue';
import TopPage from './components/pages/TopPage.vue';
import Callback from './views/Callback.vue';
import Profile from './components/pages/Profile.vue';
import Impressions from './components/organisms/Impressions.vue';
import Questions from './components/organisms/Questions.vue';
import Terms from './components/organisms/Terms.vue';
import Privacy from './components/organisms/Privacy.vue';
import Faq from './components/organisms/Faq.vue';


Vue.use(Router);

export default new Router({
  // デフォルトの挙動ではURLに#が含まれるが、
  // mode:historyを指定することでURLからhashを取り除くことができる。
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/top',
          name: 'top',
          component: TopPage,
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
       ],
    },

    {
      path: '/login/',
      name: 'login',
      component: Login,
    },
    {
      path: '/auth/twitter/callback/',
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
          path: 'questions/:categoryType',
          name: 'questions',
          component: Questions,
        },
      ],
    },

  ],
});
