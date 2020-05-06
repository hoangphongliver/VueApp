<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div class="spinner" v-if="showSpinner">
      <img
        src="https://i.pinimg.com/originals/3f/2c/97/3f2c979b214d06e9caab8ba8326864f3.gif"
        alt
      />
    </div>
    <md-snackbar
      :md-position="position"
      :md-duration="alertModel.duration ? alertModel.duration : duration"
      :md-active.sync="alertModel.status"
    >
      <span>{{ alertModel.model }}</span>
    </md-snackbar>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",
  components: {},
  data() {
    return {
      position: "center",
      duration: 2500,
    };
  },
  computed: {
    ...mapState(["showSpinner", "alertModel"]),
  },
  methods: {},
  mounted() {},
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
  margin-right: 20px;
  padding-right: 20px;
  cursor: pointer;
}

.menu .viewcart {
  position: absolute;
  right: 52px;
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
