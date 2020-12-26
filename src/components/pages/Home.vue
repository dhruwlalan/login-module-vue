<template>
   <login-signup v-if="!user"></login-signup>
   <template v-else>
      <the-navbar></the-navbar>
      <hori-pipes></hori-pipes>
      <div class="section">
         <h1 class="home__title">Welcome,</h1>
         <div class="home__profile">
            <img class="home__profile--img" :src="user.photoURL" />
            <span class="home__profile--name">{{ nameCapitalized }}</span>
         </div>
      </div>
      <hori-pipes></hori-pipes>
      <div class="section">
         <div class="home__details">
            <div class="home__details__row">
               <div class="home__details__heading">Your Details:</div>
            </div>
            <div class="home__details__row">
               <div class="home__details--key">Full Name</div>
               <div class="home__details--value">{{ user.displayName }}</div>
            </div>
            <div class="home__details__row">
               <div class="home__details--key">Email</div>
               <div class="home__details--value">{{ user.email }}</div>
            </div>
         </div>
      </div>
   </template>
</template>

<script>
import { mapGetters } from 'vuex';
import TheNavbar from '../layout/TheNavbar.vue';
import HoriPipes from '../layout/HoriPipes.vue';
import LoginSignup from './LoginSignup.vue';

export default {
   components: {
      TheNavbar,
      LoginSignup,
      HoriPipes,
   },
   computed: {
      ...mapGetters(['user']),
      nameCapitalized() {
         let name = this.user.displayName;
         name = name.split(' ')[0];
         return name.charAt(0).toUpperCase() + name.slice(1);
      },
   },
   methods: {
      logout() {
         this.$store.dispatch('logout');
      },
   },
};
</script>
