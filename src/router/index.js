import { createRouter, createWebHistory } from 'vue-router';
import EventList from '../views/EventList.vue';
import EventLayout from '@/views/event/Layout.vue';
import EventDetails from '@/views/event/Details.vue';
import EventRegister from '@/views/event/Register.vue';
import EventEdit from '@/views/event/Edit.vue';
import NotFound from '@/views/NotFound.vue';
import NetworkError from '@/views/NetworkError.vue';
import About from '../views/About.vue';
import NProgress from 'nprogress';
import EventService from '@/services/EventService.js';
import GlobalStore from '@/store';

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    path: '/events/:id',
    name: 'EventLayout',
    component: EventLayout,
    beforeEnter: (to) => {
      const { id } = to.params;
      return EventService.getEvent(id)
        .then((response) => {
          GlobalStore.event = response.data;
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            this.$router.push({
              name: '404Resource',
              params: { resource: 'event' },
            });
          } else {
            this.$router.push({ name: 'NetworkError' });
          }
        });
    },
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails,
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister,
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit,
      },
    ],
  },
  {
    path: '/event/:afterEvent(.*)',
    redirect: (to) => {
      return { path: '/events/' + to.params.afterEvent };
    },
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true,
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError,
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(() => {
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
