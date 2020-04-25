import { mapState } from "vuex";
import * as Shared from '../../../Shared/shared';
export default {
  name: 'view-cart',
  components: {},
  props: [],
  data() {
    return {
      path: '',
      shared: Shared
    }
  },
  computed: {
    ...mapState(["cartList", "open"])
  },
  mounted() {
    // this.cart = localStorage.getItem("cartList") ? JSON.parse(localStorage.getItem("cartList")) : [];
    // this.$store.dispatch("saveCartList", this.cart);
    this.path = this.$router.history.current.path
  },
  methods: {
    goToListCart: function () {
      this.$router.push("/cartlist");
      this.$store.dispatch("closeCartPopup", false);
      const module = `cartlist`;
      localStorage.setItem("module", module);
    },
    deleteBookOnCart: function (bookID) {
      const cart = this.cartList.filter(x => x.id !== bookID);
      this.$store.dispatch("saveCartList", cart);
      localStorage.setItem("cartList", JSON.stringify(cart));
    },
    totalPrice: function (cartList) {
      if (cartList.length > 0) {
        return cartList.map(x => x.quantity * x.price).reduce((a, b) => a + b)
      } else {
        return 0
      }
    },
    closeCart: function(){
      this.$store.dispatch("closeCartPopup", false);
    }
  }
}


