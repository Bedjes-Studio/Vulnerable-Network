import LoginView from '@/views/LoginView.vue';
import ImagesView from '@/views/ImagesView.vue';
import ImageView from '@/views/ImageView.vue';
import AdminView from '@/views/AdminView.vue';
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {path: "/", component: LoginView},
    {path: "/images", component: ImagesView},
    {path: "/image/:id", component: ImageView},
    {path: "/admin", component: AdminView, name: "admin"}
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;