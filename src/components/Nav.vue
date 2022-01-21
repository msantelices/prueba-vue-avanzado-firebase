<template>
  <div>
    <v-app-bar app light flat class="back">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"  v-if="auth"></v-app-bar-nav-icon>
      <img class="mr-3" :src="require('../assets/image1.png')" height="85" />
      <v-toolbar-title>AlfaWeb</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn elevation="0" color="#f5f5f5" v-if="auth">
          {{userEmail}}
          <v-icon @click="logout">mdi-logout</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute left temporary >
      <v-list nav dense>
        <v-list-item-group active-class="purple-text text--darken-4">
          <v-list-item>
            <v-list-item-title
              ><router-link to="/" class="enlace"
                >Inicio</router-link
              ></v-list-item-title
            >
          </v-list-item>

          <v-list-item>
            <v-list-item-title
              ><router-link to="/admin" class="enlace"
                >Admin</router-link
              ></v-list-item-title
            >
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Acerca de</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { logout } from "../firebase/firebase.js";
export default {
  data: () => ({
    drawer: false,
    auth: false,
  }),

  methods: {
    logout() {
      logout();
      this.$store.commit("eraseEmail")
    },
  },

  computed:{
    userEmail(){
      return this.$store.state.email;
    }
  },

  watch:{
    userEmail(){
      if(this.userEmail == ""){
        this.auth = false;
      }else{
        this.auth = true;
      }
    }
  },
};
</script>

<style scoped>
.enlace {
  color: black;
  text-decoration: none;
}
.back{
  background: rgb(255,255,255);
background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(247,247,247,1) 50%, rgba(245,245,245,1) 100%);

}
</style>