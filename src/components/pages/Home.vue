<template>
   <not-logged-in v-if="!user"></not-logged-in>
   <template v-else>
      <teleport to="body">
         <div v-show="viewProfilePhoto">
            <div class="view-photo-backdrop" @click="closePhoto"></div>
         </div>
      </teleport>
      <the-navbar page="home"></the-navbar>
      <hori-pipes></hori-pipes>
      <div class="section">
         <h1 class="home__title">Welcome,</h1>
         <div class="home__profile">
            <transition name="profile">
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
      logout() {
         this.$store.dispatch('logout');
      },
   },
};
</script>

<style scoped>
.home__profile--img {
   box-shadow: 0 0 0 2px rgb(0 49 255 / 25%);
   cursor: pointer;
}
.home__profile--img:hover {
   box-shadow: 0 0 0 3px rgb(0 49 255 / 25%);
}
.view-photo-backdrop {
   position: fixed;
   height: 100vh;
   width: 100vw;
   top: 0;
   left: 0;
}
.view-photo {
   position: absolute;
   z-index: 99;
   transform: translateY(58px);
   border-radius: 50%;
   height: 50rem;
   width: 50rem;
}
@keyframes zoom-in {
   from {
      height: 5rem;
      width: 5rem;
      transform: translateX(-57.2px);
      margin-right: 1rem;
      border-radius: 50%;
   }
}
@keyframes zoom-out {
   to {
      height: 5rem;
      width: 5rem;
      transform: translateX(-57.2px);
      margin-right: 1rem;
      border-radius: 50%;
   }
}
.profile-enter-active {
   animation: zoom-in 0.3s;
}
.profile-leave-active {
   animation: zoom-out 0.3s;
}
</style>
