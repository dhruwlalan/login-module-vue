<template>
   <form class="form form--signup" autocomplete="off">
      <div class="form__header">
         <back-link name="home"></back-link>
         <h3 class="form__header--title">Sign Up</h3>
      </div>
      <div class="form__body">
         <form-group type="fullName" @info="fullNameInfo" />
         <form-group type="email" @info="emailInfo" />
         <form-group type="pass" @info="passInfo" />
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
      emailInfo(info) {
         this.email = info;
      },
      passInfo(info) {
         this.password = info;
      },
      submit() {
         if (this.fullName.status === 'notEntered') {
            this.showAlert('error', 'Please enter your full name.');
         } else if (this.email.status === 'notEntered') {
            this.showAlert('error', 'Please enter your email address.');
         } else if (this.email.status === 'EnteredButInvalid') {
            this.showAlert('error', 'Please enter a valid email address.');
         } else if (this.password.status === 'notEntered') {
            this.showAlert('error', 'Please enter your password.');
         } else if (this.password.status === 'EnteredButInvalid') {
            this.showAlert('error', 'Password should be at least 8 characters long.');
         } else {
            this.btnStatus = 'submited';
            this.$store
               .dispatch('register', {
                  fullName: this.fullName.fullName,
                  email: this.email.email,
                  password: this.password.pass,
               })
               .then((res) => {
                  if (res === 'success') {
                     this.btnStatus = 'success';
                     this.showAlert('success', 'User Created Successfully!');
                     setTimeout(() => {
                        this.$router.push({ name: 'home' });
                     }, 1500);
                  } else {
                     this.btnStatus = 'error';
                     this.showAlert('error', res);
                     setTimeout(() => {
                        this.btnStatus = 'not-submited';
                     }, 1500);
                  }
               });
         }
      },
      showAlert(type, msg) {
         this.$store.dispatch('showAlert', { type, msg });
      },
   },
};
</script>
