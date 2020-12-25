<template>
   <div class="ls" v-if="!user">
      <div class="ls__heading">Welcome!</div>
      <div class="ls__desc">
         This is just a simple Login and Sign Up module. Login to your account or Sign-Up if you
         haven't created one.
      </div>
      <div class="ls__links">
         <router-link :to="{ name: 'login' }" class="ls__links--link">Login</router-link>
         <router-link :to="{ name: 'signup' }" class="ls__links--link">Sign Up</router-link>
      </div>
   </div>
   <div class="ls" v-else>
      <h4>uid: {{ user.uid }}</h4>
      <h4>uid: {{ user.fullName }}</h4>
      <h4>email: {{ user.email }}</h4>
      <button @click="logout">logout</button>
   </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
   computed: {
      ...mapGetters(['user']),
   },
   methods: {
      logout() {
         this.$store.dispatch('logout');
      },
   },
};
</script>
