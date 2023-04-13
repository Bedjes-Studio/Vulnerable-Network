import HelloWorld from '@/views/HelloWorld.vue';
import ExampleView from '@/views/ExampleView.vue';
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {path: "/", component: HelloWorld},
    {path: "/ailleurs", component: ExampleView},
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;