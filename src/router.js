import ListMembers from './components/ListMembers/index.vue'
import SearchMember from './components/SearchMember/index.vue'
import NotFound from './components/NotFound/index.vue'
import CartPreview from './components/Cart/CartPreview/index.vue'
import CartList from './components/Cart/CartList/index.vue'
import BookDetail from './components/BookDetail/index.vue'
import Login from './components/Authentication/Login/index.vue'
import AutoComplete from './components/AutoComplete/index.vue'
import ParentComponent from './components/Slots/ParentComponent/index.vue'

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
        path: '/',
        name: '',
        component: ListMembers,
        // beforeEnter: guardMyroute,
        meta: { title: 'Home' }
    },
    // {
    //     path: '/login',
    //     name: 'a',
    //     component: Login,
    //     meta: { title: 'Login' }
    // },
    {
        path: '/listmember',
        name: '',
        component: ListMembers,
        // beforeEnter: guardMyroute,
        meta: { title: 'List Member' }
    },
    {
        path: '/searchmember',
        name: '',
        // beforeEnter: guardMyroute,
        component: SearchMember
    },
    {
        path: '/cartpreview',
        name: '',
        // beforeEnter: guardMyroute,
        component: CartPreview,
        meta: { title: 'List Book' }
    },
    {
        path: '/cartpreview/detail/:id',
        name: '',
        // beforeEnter: guardMyroute,
        component: BookDetail,
        meta: { title: 'Book Detail' }
    },
    {
        path: '/cartlist',
        name: '',
        component: CartList,
        // beforeEnter: guardMyroute,
        meta: { title: 'Cart List' }
    },
    {
        path: '/notfound',
        name: '',
        component: NotFound,
        // beforeEnter: guardMyroute,
        meta: { title: 'Not Found' }
    },
    {
        path: '/autocomplete',
        name: '',
        component: AutoComplete,
        // beforeEnter: guardMyroute,
        meta: { title: 'Auto Complete' }
    },
    {
        path: '/slots',
        name: '',
        component: ParentComponent,
        // beforeEnter: guardMyroute,
        meta: { title: 'Auto Complete' }
    },
    {
        path: '*',
        name: '',
        // beforeEnter: guardMyroute,
        component: NotFound,
        meta: { title: 'Not Found' }
    }
]