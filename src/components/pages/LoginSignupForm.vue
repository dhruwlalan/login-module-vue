<template>
   <form class="form form--signup" autocomplete="off">
      <div class="form__header">
         <back-link name="home"></back-link>
         <h3 class="form__header--title" v-if="isSignup">Sign Up</h3>
         <h3 class="form__header--title" v-else>Login</h3>
      </div>
      <div class="form__body">
         <form-group type="fullName" @info="fullNameInfo" v-if="isSignup" />
         <form-group type="email" @info="emailInfo" />
         <form-group type="pass" @info="passInfo" />
         <submit-btn :btnStatus="btnStatus" @click.prevent="submit" v-if="isSignup">
            Creat Account
         </submit-btn>
         <submit-btn :btnStatus="btnStatus" @click.prevent="submit" v-else>Login</submit-btn>
         <router-link :to="{ name: 'forgetPassword' }" class="form__forget-password" v-if="isLogin">
            Forget your password?
         </router-link>
      </div>
      <div class="form__footer" v-if="isSignup">
         <span>I'm already a member, </span>
         <router-link :to="{ name: 'login' }" class="form__footer--link">Login</router-link>
      </div>
      <div class="form__footer" v-else>
         <span>I'm a new user, </span>
         <router-link :to="{ name: 'signup' }" class="form__footer--link">Sign Up</router-link>
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
      signup() {
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
                  }, 1000);
               } else {
                  this.btnStatus = 'error';
                  this.showAlert('error', res);
                  setTimeout(() => {
                     this.btnStatus = 'not-submited';
                  }, 1000);
               }
            });
      },
      login() {
         this.$store
            .dispatch('login', {
               email: this.email.email,
               password: this.password.pass,
            })
            .then((res) => {
               if (res === 'success') {
                  this.btnStatus = 'success';
                  this.showAlert('success', 'User Logged In Successfully!');
                  setTimeout(() => {
                     this.$router.push({ name: 'home' });
                  }, 1000);
               } else {
                  this.btnStatus = 'error';
                  this.showAlert('error', res);
                  setTimeout(() => {
                     this.btnStatus = 'not-submited';
                  }, 1000);
               }
            });
      },
      submit() {
         if (this.isSignup) {
            if (this.fullName.status === 'notEntered') {
               this.showAlert('error', 'Please enter your full name.');
            }
         }
         if (this.email.status === 'notEntered') {
            this.showAlert('error', 'Please enter your email address.');
         } else if (this.email.status === 'EnteredButInvalid') {
            this.showAlert('error', 'Please enter a valid email address.');
         } else if (this.password.status === 'notEntered') {
            this.showAlert('error', 'Please enter your password.');
         } else if (this.password.status === 'EnteredButInvalid') {
            this.showAlert('error', 'Password should be at least 8 characters long.');
         } else {
            this.btnStatus = 'submited';
            if (this.isSignup) {
               this.signup();
            } else {
               this.login();
            }
         }
      },
      showAlert(type, msg) {
         this.$store.dispatch('showAlert', { type, msg });
      },
   },
   computed: {
      formType() {
         return this.$route.name;
      },
      isSignup() {
         return this.formType === 'signup';
      },
      isLogin() {
         return this.formType === 'login';
      },
   },
};
</script>
