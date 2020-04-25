<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div class="menu">
      <div @click="openMennu()">
        <md-icon class="fa fa-bars"></md-icon>
      </div>
      <div class="user-info">
        <img
          :src="currentUser.picture.data.url"
          alt
          :style="{width: currentUser.picture.data.width + 'px' , height: currentUser.picture.data.height + 'px'}"
        />
        <p>{{currentUser.name}}</p>
      </div>
      <div class="cart" @click="viewCart()">
        <i class="fa fa-cart-plus"></i>
        <div class="count">{{this.cartList.length}}</div>
      </div>
      <div class="viewcart">
        <ViewCart v-if="open"></ViewCart>
      </div>
    </div>
    <Navbar :menu="hideMenu" @childToParent="getMenu"></Navbar>
    <div class="member">
      <router-view></router-view>
    </div>
    <div class="spinner" v-if="showSpinner">
      <img src="https://i.pinimg.com/originals/3f/2c/97/3f2c979b214d06e9caab8ba8326864f3.gif" alt />
    </div>
    <md-snackbar
      :md-position="position"
      :md-duration="alertModel.duration ? alertModel.duration : duration"
      :md-active.sync="alertModel.status"
    >
      <span>{{alertModel.model}}</span>
    </md-snackbar>
  </div>
</template>

<script>
import Navbar from "./components/Navbar/index";
import ViewCart from "./components/Cart/ViewCart/index";
import { mapState } from "vuex";
import ClickOutside from "vue-click-outside";
import { ServiceAPI } from "./service/service";
import axios from "axios";

export default {
  name: "App",
  components: {
    Navbar,
    ViewCart
  },
  data() {
    return {
      hideMenu: true,
      position: "center",
      duration: 2500
    };
  },
  computed: {
    ...mapState([
      "cartList",
      "open",
      "showSpinner",
      "alertModel",
      "currentUser"
    ])
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
    outside: function() {
      // this.$store.dispatch("closeCartPopup", false);
    }
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
        accessToken: token.accessToken
      };
      this.$store.dispatch("getInfoUserFB", payload);
    }
  },
  directives: {
    ClickOutside
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  width: 80%;
  margin: 0 auto;
  position: relative;
}
.menu {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 58px;
  background: #3fb984;
  display: flex;
  justify-content: space-between;
  z-index: 4;
}
.menu i {
  font-size: 40px !important;
  margin: 10px;
  margin-left: 15px;
  color: white !important;
  position: relative;
}

.menu .cart {
  position: relative;
  margin-right: 70px;
  padding-right: 20px;
  cursor: pointer;
}

.menu .viewcart {
  position: absolute;
  right: 110px;
  top: 52px;
}

.menu .user-info {
  display: flex;
  margin-top: 4px;
}

.menu .user-info img {
  border-radius: 50%;
  margin-right: 20px;
}

.menu .user-info p {
  color: white;
  font-weight: bold;
  margin-top: 16px;
}

.menu .cart .count {
  position: absolute;
  top: 10px;
  left: 60px;
  font-size: 16px;
  color: white;
  font-weight: bold;
}
.member {
  display: flex;
  margin-top: 60px;
}

.spinner {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.3;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.spinner img {
  width: 200px;
  height: 200px !important;
}

.snackbar {
  position: fixed;
  background: seagreen;
  bottom: 20px;
  width: 250px;
  height: 20px !important;
  left: 40%;
  color: white;
  border-radius: 10px;
}

.md-snackbar.md-theme-default {
  border-radius: 5px;
}

.md-snackbar .md-snackbar-content {
  justify-content: center;
  font-size: 16px;
}

.md-snackbar.md-position-center {
  margin: 0 auto;
  right: 0;
  bottom: 20px !important;
  left: 0;
  width: 300px !important;
}
</style>
