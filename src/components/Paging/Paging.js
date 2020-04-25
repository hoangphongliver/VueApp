import { mapState } from 'vuex';
export default {
  name: 'paging',
  components: {},
  props: {
    currentPagee: {
      type: Number
    },
    pageSizee: {
      type: Number
    }
  },
  data() {
    return {
      pageIndex: 1,
      pageSize: this.pageSizee,
      currentPage: 1,
      listOption: [1,2, 4, 8, 16, 24, 32, 40],
      totalListPage: 5,
      currentListPage: 1,
      totalPage: 0
    }
  },
  computed: {
    ...mapState([
      'totalItem'
    ]),
    listTotalPage: function () {
      let listPage = []
      let listTotalPage = []
      if (this.totalItem > 0) {
        this.totalPage = Math.ceil(this.totalItem / this.pageSize);
        for (let i = 1; i <= this.totalPage; i++) {
          listPage.push(i)
        }
      }
      while (listPage.length) {
        listTotalPage.push(listPage.splice(0, this.totalListPage));
      }
      return listTotalPage
    }
  },
  mounted() {
  },
  methods: {
    changePage: function (page) {
      this.currentPage = page;
      this.$emit('currentPage', this.currentPage)
    },
    prevPage: function () {
      this.currentPage = this.currentPage - 1;
      this.$emit('currentPage', this.currentPage)
    },
    nextPage: function () {
      this.currentPage = this.currentPage + 1;
      if(this.currentPage === this.listTotalPage[this.currentListPage - 1][0]){
        this.currentListPage +=1
      }
      this.$emit('currentPage', this.currentPage)
    },
    getItemPerPage: function (e) {
      this.pageSize = e.target.value;
      setTimeout(() => {
        this.$emit('itemPerPage', this.pageSize)
      }, 100);
      this.currentPage = 1;
      this.currentListPage = 1
      this.$emit('currentPage', this.currentPage)
    },
    prevListPage: function () {
      this.currentListPage -= 1;
      this.currentPage = this.listTotalPage[this.currentListPage - 1][0];
      this.$emit('currentPage', this.currentPage)
    },
    nextListPage: function () {
      this.currentListPage += 1;
      this.currentPage = this.listTotalPage[this.currentListPage - 1][0];
      this.$emit('currentPage', this.currentPage)
    }
  },
  watch: {
    currentPagee: function (currentPage) {
      this.currentPage = currentPage;
    },
    pageSizee: function(pageSize){
      this.pageSize = pageSize
    }
  },
}


