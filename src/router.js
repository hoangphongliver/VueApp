import ListMembers from './components/ListMembers/index.vue'
import NotFound from './components/NotFound/index.vue'
import CartPreview from './components/Cart/CartPreview/index.vue'
import CartList from './components/Cart/CartList/index.vue'
import BookDetail from './components/BookDetail/index.vue'
import Login from './components/Authentication/Login/index.vue'
import AutoComplete from './components/AutoComplete/index.vue'
import ParentComponent from './components/Slots/ParentComponent/index.vue'
import Home from './views/Home'

function guardMyroute(to, from, next) {
    var isAuthenticated = false;
    const accessToken = JSON.parse(localStorage.getItem('ACCESS-TOKEN'));

    isAuthenticated = accessToken ? true : false;

    if (isAuthenticated) {
        next();
    } else {
        next('/login');
    }
}

export const routes = [
    {
        path: '',
        name: 'a',
        component: Login,
        meta: { title: 'Login' }
    },
    {
        path: '/login',
        name: 'a',
        component: Login,
        meta: { title: 'Login' }
    },
    {
        path: '/home',
        name: '',
        component: () => import('./views/Home'),
        beforeEnter: guardMyroute,
        children: [
            {
                path: '/listmember',
                name: '',
                component: () => import('./components/ListMembers'),
                meta: { title: 'List Member' }
            },
            {
                path: '/cartpreview',
                name: '',
                component: () => import('./views/ProductList'),
                meta: { title: 'List Book' }
            },
            {
                path: '/cartpreview/detail/:id',
                name: '',
                component: ()=> import('./views/BookDetail'),
                meta: { title: 'Book Detail' }
            },
            {
                path: '/cartlist',
                name: '',
                component: () => import('./views/CartList'),
                meta: { title: 'Cart List' }
            },
            {
                path: '/notfound',
                name: '',
                component: NotFound,
                meta: { title: 'Not Found' }
            },
            {
                path: '/autocomplete',
                name: '',
                component: AutoComplete,
                meta: { title: 'Auto Complete' }
            },
            {
                path: '/slots',
                name: '',
                component: ParentComponent,
                meta: { title: 'Auto Complete' }
            }
        ]
    },
    {
        path: '*',
        name: '',
        component: NotFound,
        meta: { title: 'Not Found' }
    }
]