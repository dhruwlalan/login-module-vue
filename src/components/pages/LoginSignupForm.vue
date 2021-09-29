<template>
   <form class="form" autocomplete="off">
      <div class="form__header">
         <back-link to-route="home"></back-link>
         <h3 class="form__header--title" v-if="isSignup">Sign Up</h3>
         <h3 class="form__header--title" v-else>Login</h3>
      </div>
      <div class="form__body">
         <fgi-name v-model="fullName" @status="getFullNameStatus" v-if="isSignup" />
         <fgi-email v-model="email" @status="getEmailStatus" />
         <fgi-pass name="pass" v-model="pass" @status="getPassStatus" />
         <submit-btn :btnStatus="submitBtnStatus" @click.prevent="submit" v-if="isSignup">
            Creat Account
         </submit-btn>
         <submit-btn :btnStatus="submitBtnStatus" @click.prevent="submit" v-else>Login</submit-btn>
         <router-link
            :to="{ name: 'forgetPassword' }"
            class="form__body--forget-password"
            v-if="isLogin"
         >
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
import WaveSvg from '../layout/WaveSvg.vue';
import SubmitBtn from '../utils/SubmitBtn.vue';
import FgiName from '../utils/FgiName.vue';
import FgiEmail from '../utils/FgiEmail.vue';
import FgiPass from '../utils/FgiPass.vue';

export default {
   components: {
      BackLink,
      WaveSvg,
      SubmitBtn,
      FgiName,
      FgiEmail,
      FgiPass,
   },
   data() {
      return {
         fullName: '',
         email: '',
         pass: '',
         fullNameStatus: '',
         emailStatus: '',
         passStatus: '',
         submitBtnStatus: 'not-submitted',
      };
   },
   methods: {
      getFullNameStatus(status) {
         this.fullNameStatus = status;
      },
      getEmailStatus(status) {
         this.emailStatus = status;
      },
      getPassStatus(status) {
         this.passStatus = status;
      },

      signup() {
         this.$store
            .dispatch('signup', {
               fullName: this.fullName,
               email: this.email,
               pass: this.pass,
            })
            .then((res) => {
               if (res === 'success') {
                  this.showAlert('success', 'User Created Successfully!');
                  this.submitBtnStatus = 'success';
                  setTimeout(() => {
                     this.$router.push({ name: 'home' });
                  }, 1000);
               } else {
                  this.submitBtnStatus = 'error';
                  this.showAlert('error', res);
                  setTimeout(() => {
                     this.submitBtnStatus = 'not-submitted';
                  }, 1000);
               }
            });
      },
      login() {
         this.$store
            .dispatch('login', {
               email: this.email,
               pass: this.pass,
            })
            .then((res) => {
               if (res === 'success') {
                  this.showAlert('success', 'User Logged In Successfully!');
                  this.submitBtnStatus = 'success';
                  setTimeout(() => {
                     this.$router.push({ name: 'home' });
                  }, 1000);
               } else {
                  this.showAlert('error', res);
                  this.submitBtnStatus = 'error';
                  setTimeout(() => {
                     this.submitBtnStatus = 'not-submitted';
                  }, 1000);
               }
            });
      },

      submit() {
         if (this.isSignup) {
            if (this.fullNameStatus === 'notEntered') {
               this.showAlert('error', 'Please enter your full name.');
            }
         }
         if (this.emailStatus === 'notEntered') {
            this.showAlert('error', 'Please enter your email address.');
         } else if (this.emailStatus === 'EnteredButInvalid') {
            this.showAlert('error', 'Please enter a valid email address.');
         } else if (this.passStatus === 'notEntered') {
            this.showAlert('error', 'Please enter your password.');
         } else if (this.passStatus === 'EnteredButInvalid') {
            this.showAlert('error', 'Password should be at least 8 characters long.');
         } else {
            this.submitBtnStatus = 'submitted';
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
      isSignup() {
         return this.$route.name === 'signup';
      },
      isLogin() {
         return this.$route.name === 'login';
      },
   },
};
</script>
