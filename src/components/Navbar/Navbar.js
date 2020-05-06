import { mapState } from "vuex";
export default {
  name: 'navbar',
  components: {},
  props: {
    menu: {
      type: Boolean
    }
  },
  data() {
    return {
      active: false,
      currentModule: 'listmember'
    }
  },
  computed: {
    ...mapState([
      "hideNavbar",
    ]),
  },
  mounted() {
    const module = localStorage.getItem('module');
    this.currentModule = module;
  },
  methods: {
    closeMenu: function () {
      this.$store.dispatch("hideNavbar", true)
    },
    saveCurrentModule: function (current) {
      this.currentModule = current;
      this.$router.push(`/${current}`)
      localStorage.setItem("module", current);
      this.$store.dispatch("closeCartPopup", false);
    },
    logout: function () {
      // localStorage.removeItem('ACCESS-TOKEN');
      // localStorage.removeItem('currentUser');
      this.$store.dispatch('triggerLogout', true);
      location.reload(true);
      this.$router.push(`/login`)
    }
  }
}


