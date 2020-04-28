
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
      hideMenu: true,
      active: false,
      currentModule: 'listmember'
    }
  },
  computed: {
  },
  mounted() {
    const module = localStorage.getItem('module');
    this.currentModule = module
  },
  methods: {
    closeMenu: function () {
      this.hideMenu = !this.hideMenu;
      this.$emit('childToParent', this.hideMenu);
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
  },
  watch: {
    menu: function (menu) {
      this.hideMenu = menu;
    }
  }
}


