<template>
  <section class="home-page">
    <div class="menu">
      <div @click="openMennu()">
        <md-icon class="fa fa-bars"></md-icon>
      </div>
      <div class="user-info">
        <img
          :src="currentUser.picture.data.url"
          alt
          :style="{
            width: currentUser.picture.data.width + 'px',
            height: currentUser.picture.data.height + 'px',
          }"
        />
        <p>{{ currentUser.name }}</p>
      </div>
      <div class="cart" @click="viewCart()">
        <i class="fa fa-cart-plus"></i>
        <div class="count">{{ this.cartList.length }}</div>
      </div>
      <div class="viewcart">
        <ViewCart v-if="open"></ViewCart>
      </div>
    </div>
    <div class="content">
      <Navbar :menu="hideMenu" @childToParent="getMenu"></Navbar>
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import Navbar from "../components/Navbar/index.vue";
import ViewCart from "../components/Cart/ViewCart/index.vue";
export default {
  name: "App",
  components: {
    Navbar,
    ViewCart,
  },
  data() {
    return {
      hideMenu: true,
      position: "center",
      duration: 2500,
    };
  },
  computed: {
    ...mapState([
      "cartList",
      "open",
      "showSpinner",
      "alertModel",
      "currentUser",
    ]),
  },
  methods: {
    openMennu: function() {
      this.hideMenu = !this.hideMenu;
    },
    getMenu: function(menu) {
      this.hideMenu = menu;
    },
    viewCart: function() {
      const open = !this.open;
      this.$store.dispatch("closeCartPopup", open);
    },
  },
  mounted() {
    const path = localStorage.getItem("module");
    const token = JSON.parse(localStorage.getItem("ACCESS-TOKEN"));
    if (path && token) {
      this.$router.push(`/${path}`);
    }
    if (!token) {
      this.$router.push(`login`);
    }
    if (token) {
      // this.$router.push(`/cartpreview`);
      const payload = {
        userID: token.userID,
        accessToken: token.accessToken,
      };
      this.$store.dispatch("getInfoUserFB", payload);
    }
  },
  directives: {},
};
</script>

<style>
.content {
  margin-top: 60px;
}
</style>
