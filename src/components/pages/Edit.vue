<template>
   <the-navbar page="edit"></the-navbar>
   <hori-pipes></hori-pipes>
   <div class="section section--edit">
      <form class="form form--edit--data" autocomplete="off">
         <div class="form__body">
            <fgi-name v-model="fullName" @status="getFullNameStatus" />
            <fgi-email v-model="email" @status="getEmailStatus" />
            <submit-btn :btnStatus="editDataBtnStatus" @click.prevent="editDataBtnSubmit">
               Update Data
            </submit-btn>
         </div>
      </form>
   </div>
   <hori-pipes></hori-pipes>
   <div class="section section--edit"></div>
   <hori-pipes></hori-pipes>
   <div class="section section--edit">
      <form class="form form--edit--pass" autocomplete="off">
         <h3 class="form__header--midtitle">Change Your Password.</h3>
         <div class="form__body">
            <fgi-pass name="curPass" v-model="curPass" @status="getCurPassStatus" />
            <fgi-pass name="newPass" v-model="newPass" @status="getNewPassStatus" />
            <submit-btn :btnStatus="changePassBtnStatus" @click.prevent="changePassBtnSubmit">
               Change Password
            </submit-btn>
         </div>
      </form>
   </div>
</template>

<script>
import TheNavbar from '../layout/TheNavbar.vue';
import HoriPipes from '../layout/HoriPipes.vue';
import FgiName from '../utils/FgiName.vue';
import FgiEmail from '../utils/FgiEmail.vue';
import FgiPass from '../utils/FgiPass.vue';
import SubmitBtn from '../utils/SubmitBtn.vue';

export default {
   components: {
      TheNavbar,
      HoriPipes,
      FgiName,
      FgiEmail,
      FgiPass,
      SubmitBtn,
   },
   data() {
      return {
         fullName: this.$store.getters.user.displayName,
         fullNameStatus: '',
         email: this.$store.getters.user.email,
         emailStatus: '',
         editDataBtnStatus: 'not-submited',
         curPass: '',
         curPassStatus: '',
         newPass: '',
         newPassStatus: '',
         changePassBtnStatus: 'not-submited',
      };
   },
   methods: {
      getFullNameStatus(status) {
         this.fullNameStatus = status;
      },
      getEmailStatus(status) {
         this.emailStatus = status;
      },
      editDataBtnSubmit() {
         console.log(this.fullName);
         console.log(this.email);
      },
      getCurPassStatus(status) {
         this.curPassStatus = status;
      },
      getNewPassStatus(status) {
         this.newPassStatus = status;
      },
      changePassBtnSubmit() {
         console.log(this.curPass);
         console.log(this.curPassStatus);
         console.log(this.newPass);
         console.log(this.newPassStatus);
      },
   },
};
</script>
