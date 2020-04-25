import { mapState } from 'vuex';
import * as Shared from '../../Shared/shared'
export default {
  name: 'book-detail',
  components: {},
  props: [],
  data() {
    return {
      shared: Shared,
    }
  },
  computed: {
    ...mapState([
      'bookDetail',
      'cartList'
    ])
  },
  mounted() {
    const bookID = this.$route.params.id;
    this.$store.dispatch("getBookByID", bookID);
  },
  methods: {
    backToList() {
      this.$router.push('/cartpreview');
      const module = `cartpreview`;
      localStorage.setItem("module", module);
      // this.$store.dispatch("closeCartPopup", false);
    },
    addToCart: function (book) {
      book.quantity = 1;
      let isExisted = false;
      const alertModel = {
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
    }
  }
}


