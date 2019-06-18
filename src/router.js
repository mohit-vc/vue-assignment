import Vue from 'vue';
import VueRouter from 'vue-router'
import jwtDecode from 'jwt-decode'
import Login from './pages/Login.vue'
import BooksIndex from './pages/books/Index.vue'
import BooksAdd from './pages/books/Add.vue'
import BooksView from './pages/books/View.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/books/index',
        meta: { requiresAuth: true },
        name: 'BooksIndex',
        component: BooksIndex
    },
    {
        path: '/books/add',
        meta: { requiresAuth: true },
        name: 'BooksAdd',
        component: BooksAdd
    },
    {
        path: '/books/view/:id',
        meta: { requiresAuth: true },
        name: 'BooksView',
        component: BooksView
    },
    {
        path: '/books/edit/:id',
        meta: { requiresAuth: true },
        name: 'BooksEdit',
        component: BooksAdd
    },
];

const router = new VueRouter({
   routes
});


router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0);
    next();
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const isLoggedIn = !!localStorage.auth_token;

        const expiredToken = (token) => {
            let decodedToken = jwtDecode(token);
            let now = Date.now() / 1000;
            return decodedToken.exp < Number(now.toFixed(0))
        };

        if(!isLoggedIn) {
            next({
                path: '/'
            })
        } else if (isLoggedIn && expiredToken(localStorage.auth_token)) {
            localStorage.clear()
            next({
                path: '/'
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router
