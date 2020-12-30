<template>
   <form class="form form--fit" autocomplete="off" v-if="isInvalidCode">
      <div class="form__header">
         <h3 class="form__header--title">Reset Password</h3>
         <h5 class="form__header--subtitle">
            Password reset code is invalid or expired! Try resetting your password again.
         </h5>
         <div class="form__body">
            <submit-btn
               :btnStatus="btnStatus"
               @click.prevent="$router.push({ name: 'forgetPassword' })"
               >Reset Password Again</submit-btn
            >
         </div>
      </div>
   </form>
   <form class="form form--fit" autocomplete="off" v-if="!isInvalidCode && showForm">
      <div class="form__header">
         <h3 class="form__header--title">Reset Password</h3>
         <h5 class="form__header--subtitle">{{ accountEmail }}</h5>
      </div>
      <div class="form__body">
         <fgi-pass name="newPass" v-model="newPass" @status="getNewPassStatus" />
         <submit-btn :btnStatus="submitBtnStatus" @click.prevent="submit">
            Reset Password
         </submit-btn>
      </div>
   </form>
</template>

<script>
import FgiPass from '../utils/FgiPass.vue';
import SubmitBtn from '../utils/SubmitBtn.vue';

export default {
   components: {
      FgiPass,
      SubmitBtn,
   },
   props: ['mode', 'actionCode', 'apiKey'],
   data() {
      return {
         newPass: '',
         newPassStatus: '',
         accountEmail: '',
         isInvalidCode: false,
         showForm: false,
         submitBtnStatus: 'not-submitted',
      };
   },
   methods: {
      getNewPassStatus(status) {
         this.newPassStatus = status;
      },
      submit() {
         if (this.newPassStatus === 'notEntered') {
            this.showAlert('error', 'Please enter your new password.');
         } else if (this.newPassStatus === 'EnteredButInvalid') {
            this.showAlert('error', 'Password should be at least 8 characters long.');
         } else {
            this.submitBtnStatus = 'submitted';
            this.$store
               .dispatch('confirmPasswordReset', {
                  actionCode: this.actionCode,
                  newPass: this.newPass,
               })
               .then((res) => {
                  if (res === 'success') {
                     this.submitBtnStatus = 'success';
                     this.showAlert('success', 'Password Reseted Successfully!');
                     setTimeout(() => {
                        this.$router.push({ name: 'login' });
                     }, 1000);
                  } else {
                     this.submitBtnStatus = 'error';
                     this.showAlert('error', res);
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
   created() {
      this.$store.dispatch('verifyPasswordResetCode', this.actionCode).then((res) => {
         if (res === 'InvalidActionCode') {
            this.isInvalidCode = true;
         } else {
            this.showForm = true;
            this.accountEmail = res;
         }
      });
   },
};
</script>
