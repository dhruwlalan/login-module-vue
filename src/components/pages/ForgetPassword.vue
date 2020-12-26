<template>
   <form class="form form--forget-password" autocomplete="off">
      <div class="form__header">
         <back-link name="login"></back-link>
         <h3 class="form__header--title">Forget Password?</h3>
         <h5 class="form__header--subtitle">Enter your email address to reset your password.</h5>
      </div>
      <div class="form__body">
         <form-group type="email" @info="emailInfo" />
         <submit-btn :btnStatus="btnStatus" @click.prevent="submit">Login</submit-btn>
      </div>
   </form>
</template>

<script>
import BackLink from '../utils/BackLink.vue';
import SubmitBtn from '../utils/SubmitBtn.vue';
import FormGroup from '../utils/FormGroup.vue';

export default {
   components: {
      BackLink,
      SubmitBtn,
      FormGroup,
   },
   data() {
      return {
         email: '',
         btnStatus: 'not-submited',
      };
   },
   methods: {
      emailInfo(info) {
         this.email = info;
      },
      submit() {
         if (this.email.status === 'notEntered') {
            this.showAlert('error', 'Please enter your email address.');
         } else if (this.email.status === 'EnteredButInvalid') {
            this.showAlert('error', 'Please enter a valid email address.');
         } else {
            this.btnStatus = 'submited';
            this.$store
               .dispatch('forgetPassword', {
                  email: this.email.email,
               })
               .then((res) => {
                  if (res === 'success') {
                     this.btnStatus = 'success';
                     this.showAlert('success', 'Email sent.');
                     setTimeout(() => {
                        this.$router.push({ name: 'login' });
                     }, 1000);
                  } else {
                     this.btnStatus = 'error';
                     this.showAlert('error', res);
                     setTimeout(() => {
                        this.btnStatus = 'not-submited';
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
