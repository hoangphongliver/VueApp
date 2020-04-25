import { mapState } from 'vuex';
import * as Shared from '../../../Shared/shared';
export default {
  name: 'cart-list',
  components: {

  },
  props: [],
  data() {
    return {
      totalPrice: 0,
      arrayCheckbox: [],
      shared: Shared,
      cart: []
    }
  },
  computed: {
    ...mapState([
      'cartList'
    ]),
    totalPriceSelected() {
      return this.arrayCheckbox.length > 0 ? this.shared.formatMoney(this.arrayCheckbox.map(x => x.quantity * x.price).reduce((a, b) => a + b)) : 0
    }
  },
  mounted() {
    this.cart = localStorage.getItem("cartList") ? JSON.parse(localStorage.getItem("cartList")) : [];
    this.$store.dispatch("saveCartList", this.cart);
    this.arrayCheckbox = [...this.cartList];
    if (this.cartList.length > 0) {
      this.getTotalPrice(this.cartList)
    } else if (this.cart.length > 0) {
      this.getTotalPrice(this.cart)
    }
  },
  methods: {
    backToList: function () {
      this.$router.push('/cartpreview');
      this.$store.dispatch("closeCartPopup", false);
      const module = `cartpreview`;
      localStorage.setItem("module", module);
    },
    deleteBookOnCart: function (bookID) {
      const cartList = this.cartList.filter(x => x.id !== bookID);
      this.arrayCheckbox = this.arrayCheckbox.filter(x => x.id !== bookID)
      this.$store.dispatch("saveCartList", cartList);
      localStorage.setItem("cartList", JSON.stringify(cartList));
      this.getTotalPrice(cartList);
    },
    minusQuantity: function (book) {
      let quantity = book.quantity;
      quantity--;
      if (quantity < 1) {
        quantity = 1
      }
      this.cartList.forEach((cartBook) => {
        if (cartBook.id === book.id) {
          cartBook.quantity = quantity
        }
      });
      this.$store.dispatch("saveCartList", this.cartList);
      this.saveLocalStorage(this.cartList)
      this.getTotalPrice(this.cartList)
    },
    plusQuantity: function (book) {
      let quantity = book.quantity;
      quantity++;
      this.cartList.forEach((cartBook) => {
        if (cartBook.id === book.id) {
          cartBook.quantity = quantity
        }
      });
      this.$store.dispatch("saveCartList", this.cartList);
      this.saveLocalStorage(this.cartList)
      this.getTotalPrice(this.cartList)
    },
    resetCart() {
      this.$store.dispatch("saveCartList", []);
      this.saveLocalStorage([])
      this.totalPrice = 0
    },
    getQuantity(bookID, e) {
      this.cartList.forEach((cartBook) => {
        if (cartBook.id === bookID) {
          cartBook.quantity = e.target.value
        }
      });
      this.saveLocalStorage(this.cartList)
      this.getTotalPrice(this.cartList)
    },
    deleleSelectedBook: function () {
      let newCart = this.cartList;

      if (this.arrayCheckbox.length > 0) {
        this.arrayCheckbox.forEach(bookID => {
          newCart = newCart.filter(b => b.id !== bookID.id);
        })
      }

      this.$store.dispatch("saveCartList", newCart);
      this.saveLocalStorage(newCart);
      this.getTotalPrice(newCart)
      this.arrayCheckbox = [];
    },
    getTotalPrice: function (cartList) {
      if (cartList.length > 0) {
        this.totalPrice = cartList.map(x => x.quantity * x.price).reduce((a, b) => a + b);
      } else {
        this.totalPrice = 0
      }
    },
    saveLocalStorage: function (cartList) {
      localStorage.setItem("cartList", JSON.stringify(cartList));
    }
  }
}


