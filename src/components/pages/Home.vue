<template>
   <not-logged-in v-if="!user"></not-logged-in>
   <template v-else>
      <teleport to="body">
         <div class="view-photo-backdrop" @click="closePhoto" v-show="viewProfilePhoto"></div>
      </teleport>
      <the-navbar page="home"></the-navbar>
      <hori-pipes></hori-pipes>
      <div class="section">
         <h1 class="home__title">Welcome,</h1>
         <div class="home__profile">
            <transition enter-active-class="profile-zoom-in" leave-active-class="profile-zoom-out">
               <img class="view-photo" v-if="viewProfilePhoto" :src="user.photoURL" />
            </transition>
            <img class="home__profile--img" v-if="true" :src="user.photoURL" @click="viewPhoto" />
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
      nameCapitalized() {
         let name = this.user.displayName;
         name = name.split(' ')[0];
         return name.charAt(0).toUpperCase() + name.slice(1);
      },
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
