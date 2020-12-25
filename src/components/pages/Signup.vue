<template>
   <form class="form form--signup" autocomplete="off">
      <div class="form__header">
         <back-link name="home"></back-link>
         <h3 class="form__header--title">Sign Up</h3>
      </div>
      <div class="form__body">
         <div class="form__group form__group--name">
            <input class="form__group-input" id="nameInput" type="text" v-model="fullName" />
            <label class="form__group-label" id="nameLabel" for="nameInput">Full Name</label>
         </div>
         <div class="form__group form__group--email">
            <input class="form__group-input" id="emailInput" type="email" v-model="email" />
            <label class="form__group-label" id="emailLabel" for="emailInput"> Email </label>
         </div>
         <div class="form__group form__group--pass">
            <input class="form__group-input" id="passInput" type="password" v-model="password" />
            <label class="form__group-label" id="passLabel" for="passInput"> Password </label>
            <img class="eye-svg" id="eyeSvgForPass" src="assets/svg/passShow.svg" />
         </div>
         <submit-btn :status="status" @click.prevent="submit">Creat Account</submit-btn>
      </div>
      <div class="form__footer">
         <span>I'm already a member,</span>
         <router-link :to="{ name: 'login' }" class="form__footer--link">Login</router-link>
      </div>
      <wave-svg></wave-svg>
   </form>
</template>

<script>
import BackLink from '../utils/BackLink.vue';
import WaveSvg from '../utils/WaveSvg.vue';
import SubmitBtn from '../utils/SubmitBtn.vue';

export default {
   components: {
      BackLink,
      WaveSvg,
      SubmitBtn,
   },
   data() {
      return {
         fullName: '',
         email: '',
         password: '',
         status: 'not-submited',
      };
   },
   methods: {
      submit() {
         // this.$store.dispatch('register', {
         //    email: this.email,
         //    password: this.password,
         // });
         this.status = 'submited';
         setTimeout(() => {
            this.status = 'success';
            this.showAlert('success', 'hahah');
            setTimeout(() => {
               this.status = 'not-submited';
            }, 1000);
         }, 2000);
      },
      showAlert(type, msg) {
         this.$store.dispatch('alert', { type, msg });
      },
   },
};
</script>
