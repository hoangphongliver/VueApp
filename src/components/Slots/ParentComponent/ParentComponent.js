import ChildComponent from '../ChildComponent/index.vue'
export default {
  name: 'parent-component',
  components: {
    ChildComponent
  },
  props: [],
  data() {
    return {
      text: 'HOANG PHONG'
    }
  },
  filters: {
    toLowerCase(text) {
      return text.toUpperCase()
    },
    customFilter(item , searchKey){
      if(!item || !searchKey){
        return item
      }
      return item.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1;
    }
  }
  ,
  computed: {

  },
  mounted() {

  },
  methods: {

  }
}


