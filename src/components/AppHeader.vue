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
  </section>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import ViewCart from "./Cart/ViewCart";
export default {
  name: "AppHeader",
  components: {
    ViewCart,
  },
  data() {
    return {
      position: "center",
      duration: 2500,
    };
  },
  computed: {
    ...mapState(["cartList", "open", "currentUser", "hideNavbar"]),
  },
  methods: {
    openMennu: function() {
      this.$store.dispatch("hideNavbar", false);
    },
    viewCart: function() {
      this.$store.dispatch("closeCartPopup", true);
    },
  },
  mounted() {
    const path = localStorage.getItem("module");
    const token = JSON.parse(localStorage.getItem("ACCESS-TOKEN"));
    if (!token) {
      this.$router.push(`login`);
    }
    if (token) {
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
