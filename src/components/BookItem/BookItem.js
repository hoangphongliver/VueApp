
export default {
  name: 'book-item',
  components: {},
  props: [],
  data() {
    return {

    }
  },
  computed: {
    bookHeight: function () {
      return this.$refs.bookOption.clientHeight;
    }
  },
  mounted() {
    this.$emit('bookHeight', this.bookHeight)
  },
  methods: {
    getBook: function () {
    }
  }
}


