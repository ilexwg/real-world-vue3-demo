import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import GlobalStore from './store';
import 'nprogress/nprogress.css';

createApp(App).use(router).provide('GlobalStore', GlobalStore).mount('#app');
