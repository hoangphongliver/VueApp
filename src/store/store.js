import Vuex from 'vuex'
import Vue from 'vue'
import { ServiceAPI } from '../service/service'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        bookList: [],
        cartList: [],
        allBook: [],
        bookDetail: {
            authur: "",
            content: "",
            desc: "",
            image: "",
            name: "",
            price: null,
            quantity: 0,
        },
        open: false,
        showSpinner: false,
        alertModel: {
            status: false,
            model: ''
        },
        currentUser: {
            name: '',
            id: '',
            picture: {
                data: ''
            }
        },
        logout: false,
        totalItem: 0,
        hideNavbar: true
    },
    actions: {
        // Here we will create Larry
        getAllBook({ commit, getters, dispatch }, param) {
            commit('GET_ALL_BOOK')
            ServiceAPI.getAllBook(param.page, param.limit, param.sortBy, param.search).then(res => {
                const payload = {
                    data: res.data,
                    alertModel: "Get All Book Successfully",
                }
                commit('GET_ALL_BOOK_SUCCESS', payload)
                dispatch('getBook');
            }).catch(err => {
                commit('GET_ALL_BOOK_FAIL', err)
            })
        },

        allBook({ commit, getters, dispatch }, param) {
            commit('ALL_BOOK')
            ServiceAPI.getAllBook(param.page, param.limit, param.sortBy, param.search).then(res => {
                const payload = {
                    data: res.data,
                    alertModel: "All Book Successfully",
                }
                commit('ALL_BOOK_SUCCESS', payload)
                dispatch('getBook');
            }).catch(err => {
                commit('ALL_BOOK_FAIL', err)
            })
        },

        getBook({ commit }) {
            commit('GET_BOOK')
            ServiceAPI.getAllBook('', '', '', '').then(res => {
                const totalItem = res.data.length
                commit('GET_BOOK_SUCCESS', totalItem)
            }).catch(err => {
                commit('GET_BOOK_FAIL', err)
            })
        },

        saveCartList({ commit }, cartList) {
            commit('SAVE_CART_LIST', cartList)
        },

        addBook({ commit, getters, dispatch }, payload) {
            commit('ADD_BOOK')
            ServiceAPI.addBook(payload.book).then(() => {
                commit('ADD_BOOK_SUCCESS', "Added Book Successfully");
                dispatch('getAllBook', payload.param);
            }).catch((err) => commit('ADD_BOOK_FAIL', err));
        },

        editBook({ commit, getters, dispatch }, payload) {
            commit('EDIT_BOOK')
            ServiceAPI.updateBook(payload.book.id, payload.book).then(() => {
                commit('EDIT_BOOK_SUCCESS', "Updated Book Successfully");
                dispatch('getAllBook', payload.param);
            }).catch((err) => commit('EDIT_BOOK_FAIL', err))
        },

        deleteBook({ commit, getters, dispatch }, payload) {
            commit('DELETE_BOOK');
            ServiceAPI.deleteBookByID(payload.book).then(res => {
                commit('DELETE_BOOK_SUCCESS', "Deleted Book Successfully");
                dispatch('getAllBook', payload.param);
            }).catch(err => commit('DELETE_BOOK_FAIL', err))
        },

        getBookByID({ commit }, bookID) {
            commit('GET_BOOK_BY_ID');
            ServiceAPI.getBookByID(bookID).then(res => {
                commit('GET_BOOK_BY_ID_SUCCESS', res.data);
            }).catch(err => commit('GET_BOOK_BY_ID_FAIL', err))
        },

        saveBookToStore({ commit }, book) {
            commit('SAVE_BOOK_TO_STORE', book)
        },

        closeCartPopup({ commit }, state) {
            commit('CLOSE_CART_POPUP', state)
        },

        saveAlertModel({ commit }, alertModel) {
            commit('SAVE_ALERT_MODEL', alertModel)
        },

        getInfoUserFB({ commit }, payload) {
            commit('GET_USER')
            ServiceAPI.getUserInfo(payload.userID, payload.accessToken)
                .then(res => commit('GET_USER_SUCCESS', res.data))
                .catch(err => {
                    if (err) {
                        window.location = '/login';
                        localStorage.removeItem('ACCESS-TOKEN');
                    }
                    commit('GET_USER_FAIL', err)
                });
        },
        triggerLogout({ commit }, payload) {
            commit('SAVE_LOGOUT_STATUS', payload)
        },
        saveTotalItem({ commit }, payload) {
            commit('SAVE_TOTAL_ITEM', payload)
        },

        hideNavbar({ commit }, payload) {
            commit('SAVE_MENU_STATE', payload)
        }
    },

    getters: {
        // Here we will create a getter
    },

    mutations: {
        // Here we will create Jenny

        GET_ALL_BOOK(state) {
            state.showSpinner = true
        },

        GET_ALL_BOOK_SUCCESS(state, payload) {
            state.bookList = payload.data;
            state.bookDetail = null;
            state.showSpinner = false;
        },

        GET_ALL_BOOK_FAIL(state, payload) {
            state.showSpinner = false;
            state.alertModel = {
                status: true,
                model: payload
            }
        },

        ALL_BOOK(state, payload) {
            state.showSpinner = true;
        },

        ALL_BOOK_SUCCESS(state, payload) {
            state.allBook = payload.data;
            state.showSpinner = false;
        },
        ALL_BOOK_FAIL(state, payload) {
            state.showSpinner = false;
        },


        SAVE_CART_LIST(state, cartList) {
            state.cartList = cartList
        },

        ADD_BOOK(state, payload) {
            state.showSpinner = true
        },

        ADD_BOOK_SUCCESS(state, payload) {
            state.showSpinner = false
            state.alertModel = {
                status: true,
                model: payload
            }
        },

        ADD_BOOK_FAIL(state, payload) {
            state.showSpinner = false;
            state.alertModel = {
                status: true,
                model: payload,
                duration: 3000
            }
        },

        EDIT_BOOK(state) {
            state.showSpinner = true
        },

        EDIT_BOOK_SUCCESS(state, payload) {
            state.showSpinner = false;
            state.alertModel = {
                status: true,
                model: payload
            }
        },

        EDIT_BOOK_FAIL(state, payload) {
            state.showSpinner = false;
            state.alertModel = {
                status: true,
                model: payload,
                duration: 3000
            }
        },

        DELETE_BOOK(state) {
            state.showSpinner = true
        },

        DELETE_BOOK_SUCCESS(state, payload) {
            state.showSpinner = false;
            state.alertModel = {
                status: true,
                model: payload
            }
        },

        DELETE_BOOK_FAIL(state, payload) {
            state.showSpinner = false;
            state.alertModel = {
                status: true,
                model: payload,
                duration: 3000
            }
        },

        CLOSE_CART_POPUP(state, popup) {
            state.open = popup
        },

        SAVE_BOOK_TO_STORE(state, book) {
            state.bookDetail = book
        },

        GET_BOOK_BY_ID(state) {
            state.showSpinner = true
        },

        GET_BOOK_BY_ID_SUCCESS(state, bookDetail) {
            state.showSpinner = false;
            state.bookDetail = bookDetail
        },

        GET_BOOK_BY_ID_FAIL(state) {
            state.showSpinner = false
        },

        SAVE_ALERT_MODEL(state, payload) {
            state.alertModel = payload
        },

        GET_USER(state, payload) {

        },

        GET_USER_SUCCESS(state, payload) {
            state.currentUser = payload
        },

        GET_USER_FAIL(state, payload) {

        },

        SAVE_LOGOUT_STATUS(state, payload) {
            state.logout = payload
        },

        GET_BOOK_SUCCESS(state, payload) {
            state.totalItem = payload
        },

        GET_BOOK(state, payload) {

        },

        SAVE_MENU_STATE(state, payload) {
            state.hideNavbar = payload
        }
    }
});