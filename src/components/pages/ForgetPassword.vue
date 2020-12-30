<template>
   <form class="form form--fit" autocomplete="off">
      <div class="form__header">
         <back-link to-route="login"></back-link>
         <h3 class="form__header--title">Forget Password?</h3>
         <h5 class="form__header--subtitle">Enter your email address to reset your password.</h5>
      </div>
      <div class="form__body">
         <fgi-email v-model="email" @status="getEmailStatus" />
         <submit-btn :btnStatus="submitBtnStatus" @click.prevent="submit">
            Send Reset Link
         </submit-btn>
      </div>
   </form>
</template>

<script>
import BackLink from '../utils/BackLink.vue';
import SubmitBtn from '../utils/SubmitBtn.vue';
import FgiEmail from '../utils/FgiEmail.vue';

export default {
   components: {
      BackLink,
      SubmitBtn,
      FgiEmail,
   },
   data() {
      return {
         email: '',
         emailStatus: '',
         submitBtnStatus: 'not-submitted',
      };
   },
   methods: {
      getEmailStatus(status) {
         this.emailStatus = status;
      },
      submit() {
         if (this.emailStatus === 'notEntered') {
            this.showAlert('error', 'Please enter your email address.');
         } else if (this.emailStatus === 'EnteredButInvalid') {
            this.showAlert('error', 'Please enter a valid email address.');
         } else {
            this.submitBtnStatus = 'submitted';
            this.$store.dispatch('forgetPassword', this.email).then((res) => {
               if (res === 'success') {
                  this.showAlert('success', 'Link sent to email successfully!');
                  this.submitBtnStatus = 'success';
                  setTimeout(() => {
                     this.$router.push({ name: 'login' });
                  }, 1000);
               } else {
                  this.showAlert('error', res);
                  this.submitBtnStatus = 'error';
                  setTimeout(() => {
                     this.submitBtnStatus = 'not-submitted';
                  }, 1000);
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
