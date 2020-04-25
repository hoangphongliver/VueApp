
export default {
  name: 'add-member',
  components: {},
  props: {
    member: {
      type: Object
    }
  },
  data() {
    return {
      gender: ['Male', 'FeMale'],
      userModel: {
        name: '',
        age: null,
        email: '',
        gender: '',
        desc: ''
      }
    }
  },
  computed: {

  },
  methods: {
    submit: function () {
      const user = JSON.parse(JSON.stringify(this.userModel));
      this.$emit('childToParent', user);
      this.userModel = {
        name: '',
        age: null,
        email: '',
        gender: 'Male',
        desc: ''
      }
    }
  },
  watch: {
    member: function (member) {
      if (member) {
        this.userModel = JSON.parse(JSON.stringify(member));
      }
    }
  },
}


