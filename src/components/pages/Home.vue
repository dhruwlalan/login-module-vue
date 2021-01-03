<template>
   <not-logged-in v-if="!user"></not-logged-in>
   <template v-else>
      <teleport to="body">
         <div class="home__profile--backdrop" @click="closePhoto" v-show="viewProfilePhoto"></div>
      </teleport>
      <the-navbar page="home"></the-navbar>
      <hori-pipes></hori-pipes>
      <div class="section">
         <h1 class="home__title">Welcome!</h1>
         <div class="home__profile" @click="viewPhoto">
            <transition enter-active-class="profile-zoom-in" leave-active-class="profile-zoom-out">
               <img
                  class="home__profile--view-photo"
                  v-if="viewProfilePhoto"
                  :src="user.photoURL"
               />
            </transition>
            <img class="home__profile--photo" v-if="true" :src="user.photoURL" />
         </div>
      </div>
      <hori-pipes></hori-pipes>
      <div class="section">
         <div class="home__details">
            <div class="home__details__row">
               <div class="home__details__heading">Your Details:</div>
            </div>
            <div class="home__details__row">
               <div class="home__details--key">Name</div>
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
import NotLoggedIn from './NotLoggedIn.vue';

export default {
   components: {
      TheNavbar,
      NotLoggedIn,
      HoriPipes,
   },
   data() {
      return {
         viewProfilePhoto: false,
      };
   },
   computed: {
      ...mapGetters(['user']),
   },
   methods: {
      viewPhoto() {
         this.viewProfilePhoto = true;
      },
      closePhoto() {
         this.viewProfilePhoto = false;
      },
   },
};
</script>
