
import { mapState } from 'vuex';
import BookItem from '../BookItem/index.vue'
import Autocomplete from 'vuejs-auto-complete'
export default {
  name: 'auto-complete',
  components: {
    BookItem,
    Autocomplete
  },
  props: {},
  data() {
    return {
      searchPhase: '',
      displaySearchResult: false,
      currentItem: -1,
      placeholder: 'Enter book name or authur or description',
      bookHeight: 0
    }
  },
  filters: {
  },
  computed: {
    ...mapState([
      'allBook'
    ]),
    filterUser() {
      if (!this.allBook || !this.searchPhase) {
        return this.allBook
      }
      return this.allBook.filter(x => x.name.toLowerCase().indexOf(this.searchPhase.toLowerCase()) !== -1);
    }
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  methods: {
    autoComptete(e) {
      this.displaySearchResult = true;
    },

    addDistributionGroup(group) {
      console.log(group);

      this.$refs.autocomplete.clear()
    },

    formattedDisplay(result) {
      return result.name
    },

    getBook: function (value, index) {
      this.searchPhase = value
      this.currentItem = index
      this.displaySearchResult = false
      this.$emit('searchPhase', this.searchPhase);
    },

    focusInput: function () {
      this.displaySearchResult = true;
      this.$emit('focusInput', true)
    },

    enter: function (e) {
      const keySearch = this.filterUser[this.currentItem]
      this.searchPhase = keySearch ? keySearch.name : e.target.value;
      this.$emit('searchPhase', this.searchPhase);
      this.displaySearchResult = false;
      this.$nextTick(() => {
        this.$refs["inputSearch"].blur()
      })
    },

    down: function (e) {
      this.currentItem += 1;
      if (this.currentItem > this.filterUser.length - 1) {
        this.currentItem = 0
        this.$refs.scrollContainer.scrollTop = 0
      };
      const keySearch = this.filterUser[this.currentItem];
      this.placeholder = keySearch ? keySearch.name : e.target.value;
      this.fixScrolling();
    },

    up: function (e) {
      this.currentItem -= 1;
      if (this.currentItem < 0) {
        this.currentItem = this.filterUser.length - 1
        this.$refs.scrollContainer.scrollTop = this.bookHeight * this.currentItem;
      }
      const keySearch = this.filterUser[this.currentItem]
      this.placeholder = keySearch ? keySearch.name : e.target.value;
      this.$refs.scrollContainer.scrollTop = this.bookHeight * this.currentItem;
      this.fixScrolling()
    },

    fixScrolling() {
      const cartHeight = this.$refs.scrollContainer.clientHeight;
      if (this.bookHeight * (this.currentItem + 1) >= cartHeight) {
        this.$refs.scrollContainer.scrollTop = this.bookHeight * (this.currentItem);
      }
    },

    getBookHeight(value) {
      this.bookHeight = value
    },

    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.displaySearchResult = false;
        this.currentItem = -1;
      }
    }

  },
  directives() {

  },
  destroyed() {
    document.removeEventListener("click", this.handleClickOutside);
  },
}


