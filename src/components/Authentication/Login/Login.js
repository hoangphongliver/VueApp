import facebookLogin from 'facebook-login-vuejs';
import { mapState } from 'vuex';

export default {
  name: 'login',
  components: {
    facebookLogin
  },
  props: [],
  data() {
    return {
      currentUser: {
        name: '',
        id: ''
      },
      appID: "170803640303814",
      isConnected: false,
      FB: undefined
    }
  },
  computed: {
    ...mapState([
      'logout'
    ])
  },
  mounted() {
    const token = JSON.parse(localStorage.getItem("ACCESS-TOKEN"));
    if (token) {
      this.$router.push(`/cartpreview`);
    }
    if (this.logout) {
      this.onLogout()
    }
  },
  methods: {
    sdkLoaded(payload) {
      this.isConnected = payload.isConnected
      this.FB = payload.FB
      if (this.isConnected) this.getUserData()
    },
    getUserData: function (data) {
      this.isConnected = true
      if (data && data.response) {
        const token = data.response.authResponse;
        localStorage.setItem('ACCESS-TOKEN', JSON.stringify(token));
        location.reload(true);
      }

    },
    onLogout: function (lo) {
      localStorage.removeItem('ACCESS-TOKEN');
      localStorage.removeItem('currentUser');
      this.isConnected = false;
    }
  }
}


