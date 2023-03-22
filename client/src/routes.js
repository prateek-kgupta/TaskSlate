import { createRouter, createWebHistory } from "vue-router";
import adminView from "./components/adminView.vue"
import loginPage from "./components/loginPage.vue"
import taskPage from "./components/taskPage.vue"
import viewUsers from './components/viewUsers.vue'
import searchUser from './components/searchUser.vue'
import userRole from './components/userRole.vue'
import userDelete from './components/userDelete.vue'
import usersTask from './components/usersTask.vue'
import pageNotFound from './components/pageNotFound.vue'

const routes = [
    {
        name: 'adminView',
        component: adminView,
        path: '/admin'
    },
    {
        name: 'loginPage',
        component: loginPage,
        path: '/'
    },
    {
        name: 'taskPage',
        component: taskPage,
        path: '/tasks'
    },
    {
        name: 'viewUsers',
        component: viewUsers,
        path: '/users-list'
    },
    {
        name: 'searchUser',
        component: searchUser,
        path: '/searchUser'
    },
    {
        name: 'userRole',
        component: userRole,
        path: '/userRole'
    },
    {
        name: 'userDelete',
        component: userDelete,
        path: '/userDelete'
    },
    {
        name: 'usersTask',
        component: usersTask,
        path: '/usersTask/:username'
    },
    {
        name: 'pageNotFound',
        component: pageNotFound,
        path: '/:pathMatch(.*)*'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router