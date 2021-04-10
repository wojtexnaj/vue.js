import Vue from 'vue';
import Router from 'vue-router';
// import PageNotFound from '@/views/page-not-found';
// import AddOnwHero from './views/add-own-hero';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/todo',
    },
    {
      path: '/todo',
      name: 'todo',
      component: () =>
        import(/* webpackChunkName: "bundle.todos" */ './views/todo.vue'),
    },
    {
      path: '/super-heroes',
      name: 'super-heroes',
      component: () =>
        import(/* webpackChunkName: "bundle.heroes" */ './views/superheroes.vue'),
    },
    {
      path: '/add-own-hero',
      name: 'add-own-hero',
      component: () =>
      import(/* webpackChunkName: "bundle.heroes" */ './views/add-own-hero.vue'),
    },
    {
      path: '/super-heroes/:id',
      name: 'super-hero-detail',
      component: () =>
        import(/* webpackChunkName: "bundle.heroes" */ './views/superhero-detail.vue'),
    }
    // {
    //   path: '*',
    //   component: PageNotFound,
    // },
  ],
});
