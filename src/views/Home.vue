<template>
  <section class="home-page">
    <AppHeader></AppHeader>
    <div class="content">
      <Navbar></Navbar>
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import Navbar from "../components/Navbar/index.vue";
import ViewCart from "../components/Cart/ViewCart/index.vue";
import AppHeader from "@/components/AppHeader";
export default {
  name: "App",
  components: {
    Navbar,
    ViewCart,
    AppHeader,
  },
  data() {
    return {
      hideMenu: true,
    };
  },
  computed: {
    ...mapState([
      "open",
    ]),
  },
  methods: {
    openMennu: function() {
      this.hideMenu = !this.hideMenu;
    },
    getMenu: function(menu) {
      this.hideMenu = menu;
    }
  },
  mounted() {
    
  }
};
</script>

<style>
.content {
  margin-top: 60px;
}
</style>
