import { mapState } from 'vuex';
import { mapActions } from 'vuex'
import * as Shared from '../../../Shared/shared';
import Paging from '../../Paging/index'
import AutoComplete from '../../AutoComplete/index.vue'
export default {
  name: 'cart-preview',
  components: {
    Paging,
    AutoComplete
  },
  props: [],
  data() {
    return {
      cart: [],
      showDialog: false,
      book: {
        name: '',
        authur: '',
        price: null,
        desc: '',
        image: '',
        content: '',
      },
      shared: Shared,
      title: '',
      active: false,
      sortOption: [
        { name: 'Name', value: 'name' },
        { name: 'Authur', value: 'authur' },
        { name: 'Price', value: 'price' },
      ],
      searchPhase: '',
      sortBy: 'name',
      showOption: false,
      currentPage: 1,
      arrFormatMoney: [],
      showMoneyForm: false,
      pageSize: 16,
      totalItem: 0
    }
  },
  computed: {
    ...mapState([
      'bookList',
      'cartList',
      'showSpinner'
    ])
  },
  mounted() {
    const param = {
      page: '',
      limit: '',
      sortBy: 'name',
      search: ''
    }
    this.$store.dispatch("allBook", param);
    this.getAllBook(this.buildParam());
    this.cart = localStorage.getItem("cartList") ? JSON.parse(localStorage.getItem("cartList")) : [];
    this.$store.dispatch("saveCartList", this.cart);
  },
  methods: {
    ...mapActions({
      getAllBook: 'getAllBook',
      saveTotalItem: 'saveTotalItem'
    }),
    goToBookDetail: function (book) {
      this.$router.push(`/cartpreview/detail/${book.id}`);
      const module = `cartpreview/detail/${book.id}`;
      this.$store.dispatch('closeCartPopup', false)
      localStorage.setItem("module", module);
    },
    saveToCartList: function (book) {
      book.quantity = 1;
      this.showSnackbar = true;
      let isExisted = false;
      let alertModel = {
        status: true,
        model: 'Add To Cart Successfully',
        duration: 2000
      }
      this.cartList.forEach((bookCart) => {
        if (bookCart.id === book.id) {
          isExisted = true
        }
      })
      if (!isExisted) {
        this.cartList.push({
          ...book
        });
        this.$store.dispatch('saveAlertModel', alertModel)
      } else {
        this.cartList.forEach((bookCart) => {
          if (bookCart.id === book.id) {
            bookCart.quantity++;
          }
        });
        this.$store.dispatch('saveAlertModel', alertModel)
      }

      this.$store.dispatch("saveCartList", this.cartList);
      localStorage.setItem("cartList", JSON.stringify(this.cartList));
    },
    saveBook: function () {
      this.currentPage = 1;
      // this.arrFormatMoney = []
      this.book.price = Number(this.book.price);
      if (this.book.price < this.arrFormatMoney[0]) {
        this.book.price = this.arrFormatMoney[0]
      }
      console.log(this.book.price, this.arrFormatMoney);

      if (this.book.id) {
        this.$store.dispatch("editBook", { book: this.book, param: this.buildParam() });
      } else {
        this.$store.dispatch("addBook", { book: this.book, param: this.buildParam() });
      }

      this.showDialog = false;
      this.resetBook()
    },
    deleteBook: function (book) {
      this.bookID = book.id;
      this.active = true;
      this.title = `Are you want to delele "${book.name}" ?`
    },
    editBook: function (book) {
      this.currentPage = 1;
      this.book = JSON.parse(JSON.stringify(book));
      this.showDialog = true;
      this.arrFormatMoney = []
      this.$store.dispatch('saveBookToStore', book)
    },
    closeDialog: function () {
      this.showDialog = false;
      this.resetBook()
    },
    resetBook() {
      this.book = {
        name: '',
        authur: '',
        price: null,
        desc: '',
        image: '',
        content: '',
        timeout: null
      }
    },
    onConfirm() {
      this.currentPage = 1;
      this.value = 'Agreed';
      const param = this.buildParam()
      const payload = {
        book: this.bookID, param
      }
      this.$store.dispatch('deleteBook', payload)
    },
    onCancel() {
      this.value = 'NO'
      this.active = false
    },
    searchBook: function () {
      this.getAllBook(this.buildParam())
    },
    sortBook: function () {
      this.getAllBook(this.buildParam())
    },
    onSearch() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.getAllBook(this.buildParam())
      }, 1000);
    },
    clickOutsite: function () {
      this.resetBook();
    },
    format: function (price) {
      this.arrFormatMoney = []
      this.showMoneyForm = true
      let arrMoney = [0, 1, 2, 3, 4, 5, 6];
      if (price > 0) {
        this.arrFormatMoney = arrMoney.map(x => price * Math.pow(10, x))
          .filter(m => m >= 10000 && m <= 10000000)
      } else {
        this.arrFormatMoney = []
      }
    },
    getMoney: function (price) {
      this.book.price = price;
      this.showMoneyForm = false
    },
    iisNumber: function (evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    checknum: function (event) {
      this.value = this.value.replace(/[^0-9]/g, '');
    },
    getCurrentPage: function (currentPage) {
      this.currentPage = currentPage
      this.getAllBook(this.buildParam());
    },
    buildParam() {
      const param = {
        page: this.currentPage,
        limit: this.pageSize,
        sortBy: this.sortBy,
        search: this.searchPhase
      };
      return param;
    },
    getItemPerPage: function (pageSize) {
      this.pageSize = Number(pageSize);
      this.getAllBook(this.buildParam());
    },
    getSearchPhase(searchPhase) {
      this.searchPhase = searchPhase;
      console.log(searchPhase);
      
      if(searchPhase == ''){
        this.searchPhase = ''
      }
      this.getAllBook(this.buildParam());
    }
  }
}


