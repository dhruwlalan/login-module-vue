<template>
   <form class="form form--signup" autocomplete="off">
      <div class="form__header">
         <back-link name="home"></back-link>
         <h3 class="form__header--title">Sign Up</h3>
      </div>
      <div class="form__body">
         <form-group type="fullName" @info="fullNameInfo" />
         <!-- <form-group type="email" @info="emailInfo" /> -->
         <!-- <form-group type="pass" @info="passInfo" /> -->
         <!-- <div class="form__group form__group--email">
            <input class="form__group-input" id="emailInput" type="email" v-model="email" />
            <label class="form__group-label" id="emailLabel" for="emailInput"> Email </label>
         </div> -->
         <!-- <div class="form__group form__group--pass">
            <input class="form__group-input" id="passInput" type="password" v-model="password" />
            <label class="form__group-label" id="passLabel" for="passInput"> Password </label>
            <img class="eye-svg" id="eyeSvgForPass" src="assets/svg/passShow.svg" />
         </div> -->
         <submit-btn :btnStatus="btnStatus" @click.prevent="submit">Creat Account</submit-btn>
      </div>
      <div class="form__footer">
         <span>I'm already a member,</span>
         <router-link :to="{ name: 'login' }" class="form__footer--link">Login</router-link>
      </div>
      <wave-svg></wave-svg>
   </form>
</template>

<script>
import axios from 'axios';
import BackLink from '../utils/BackLink.vue';
import WaveSvg from '../utils/WaveSvg.vue';
import SubmitBtn from '../utils/SubmitBtn.vue';
import FormGroup from '../utils/FormGroup.vue';

export default {
   components: {
      BackLink,
      WaveSvg,
      SubmitBtn,
      FormGroup,
   },
   data() {
      return {
         fullName: '',
         email: '',
         password: '',
         btnStatus: 'not-submited',
      };
   },
   methods: {
      fullNameInfo(info) {
         this.fullName = info;
      },
      submit() {
         // this.$store.dispatch('register', {
         //    email: this.email,
         //    password: this.password,
         // });
         console.log(this.fullName);
         console.log(this.email);
         console.log(this.password);
         // this.status = 'submited';
         // setTimeout(() => {
         //    this.status = 'success';
         //    this.showAlert('success', 'hahah');
         //    setTimeout(() => {
         //       this.status = 'not-submited';
         //    }, 1000);
         // }, 2000);
      },
      showAlert(type, msg) {
         this.$store.dispatch('alert', { type, msg });
      },
   },
};
</script>
