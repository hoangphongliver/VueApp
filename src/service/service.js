import axios from 'axios'
export const ServiceAPI = {
    getAllBook(page, limit, sortBy, search) {
        return axios({
            method: 'GET',
            url: `https://5e61c14e6f5c7900149bc641.mockapi.io/api/v1/book?page=${page}&limit=${limit}&sortBy=${sortBy}&search=${search}`
        })
    },
    addBook(param = {
        name: '',
        authur: '',
        price: '',
        desc: '',
        image: '',
        content: ''
    }) {
        return axios({
            method: 'POST',
            url: `https://5e61c14e6f5c7900149bc641.mockapi.io/api/v1/book`,
            data: param
        })
    },
    updateBook(bookID, param = {
        name: '',
        authur: '',
        price: '',
        desc: '',
        image: '',
        content: ''
    }) {
        return axios({
            method: 'PUT',
            url: `https://5e61c14e6f5c7900149bc641.mockapi.io/api/v1/book/${bookID}`,
            data: param
        })
    },
    getBookByID(bookID) {
        return axios({
            method: 'GET',
            url: `https://5e61c14e6f5c7900149bc641.mockapi.io/api/v1/book/${bookID}`
        })
    },
    deleteBookByID(bookID) {
        return axios({
            method: 'DELETE',
            url: `https://5e61c14e6f5c7900149bc641.mockapi.io/api/v1/book/${bookID}`
        })
    },

    getUserInfo(userID, accessToken) {
        return axios({
            method: 'GET',
            url: `https://graph.facebook.com/me?fields=id,name,picture,email`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
    },
    getUserInfo(userID, accessToken) {
        return axios({
            method: 'GET',
            url: `https://graph.facebook.com/me?fields=id,name,picture,email`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
    }
}