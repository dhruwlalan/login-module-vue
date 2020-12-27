<template>
   <the-navbar page="edit"></the-navbar>
   <hori-pipes></hori-pipes>
   <div class="section section--edit">
      <form class="form form--edit--data" autocomplete="off">
         <h3 class="form__header--midtitle">Update Your Profile</h3>
         <div class="form__body">
            <fgi-name v-model="fullName" @status="getFullNameStatus" />
            <div class="form__group__profile">
               <img class="form__group__profile--preview" id="uploadImagePreview" :src="photoUrl" />
               <input
                  class="form__group__profile--input"
                  id="uploadImageInput"
                  type="file"
                  accept="image/*"
                  name="photo"
                  @change="previewImage"
                  ref="uploadImageInput"
               />
               <div class="form__group__profile--links">
                  <label
                     class="form__group__profile--remove"
                     id="removeImageLabel"
                     @click="setProfilePicToDefault"
                  >
                     Remove Photo
                  </label>
                  <label
                     class="form__group__profile--select"
                     id="uploadImageLabel"
                     for="uploadImageInput"
                  >
                     Select New Photo
                  </label>
               </div>
            </div>
            <submit-btn :btnStatus="updateProfileBtnStatus" @click.prevent="updateProfileBtnSubmit">
               Update Profile
            </submit-btn>
         </div>
      </form>
   </div>
   <hori-pipes></hori-pipes>
   <div class="section section--edit">
      <form class="form form--edit--data" autocomplete="off">
         <h3 class="form__header--midtitle">Update Your Email</h3>
         <div class="form__body">
            <fgi-email v-model="email" @status="getEmailStatus" />
            <fgi-pass name="pass" v-model="pass" @status="getPassStatus" />
            <submit-btn :btnStatus="updateEmailBtnStatus" @click.prevent="updateEmailBtnSubmit">
               Update Email
            </submit-btn>
         </div>
      </form>
   </div>
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
         email: this.$store.getters.user.email,
         photoUrl: this.$store.getters.user.photoURL,
         newProfile: '',
         pass: '',
         curPass: '',
         newPass: '',
         fullNameStatus: '',
         emailStatus: '',
         passStatus: '',
         curPassStatus: '',
         newPassStatus: '',
         updateProfileBtnStatus: 'not-submited',
         updateEmailBtnStatus: 'not-submited',
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
      getPassStatus(status) {
         this.passStatus = status;
      },
      getCurPassStatus(status) {
         this.curPassStatus = status;
      },
      getNewPassStatus(status) {
         this.newPassStatus = status;
      },

      updateProfileBtnSubmit() {
         if (this.fullNameStatus === 'notEntered') {
            this.showAlert('error', 'Please enter your full name.');
         } else if (this.emailStatus === 'notEntered') {
            this.showAlert('error', 'Please enter your email address.');
         } else if (this.emailStatus === 'EnteredButInvalid') {
            this.showAlert('error', 'Please enter a valid email address.');
         } else {
            this.updateProfileBtnStatus = 'submited';
            const allPromises = [];
            let allSuccess = true;
            const errorMsg = [];
            allPromises.push(this.$store.dispatch('updateProfile', { fullName: this.fullName }));
            if (this.isDefaultPic) {
               allPromises.push(this.$store.dispatch('updateProfile', { photoUrl: this.photoUrl }));
            } else if (this.newProfile) {
               allPromises.push(this.$store.dispatch('uploadNewProfilePic', this.newProfile));
            }
            Promise.all(allPromises).then((values) => {
               values.forEach((element) => {
                  if (element !== 'success') {
                     errorMsg.push(element);
                     allSuccess = false;
                  }
               });
               if (allSuccess) {
                  this.updateProfileBtnStatus = 'success';
                  this.showAlert('success', 'Profile Updated Successfully!');
                  setTimeout(() => {
                     this.updateProfileBtnStatus = 'not-submited';
                  }, 1000);
               } else {
                  this.updateProfileBtnStatus = 'error';
                  this.showAlert('error', errorMsg[0]);
                  setTimeout(() => {
                     this.updateProfileBtnStatus = 'not-submited';
                  }, 1000);
               }
            });
         }
      },
      updateEmailBtnSubmit() {
         if (this.emailStatus === 'notEntered') {
            this.showAlert('error', 'Please enter your email address.');
         } else if (this.emailStatus === 'EnteredButInvalid') {
            this.showAlert('error', 'Please enter a valid email address.');
         } else if (this.passStatus === 'notEntered') {
            this.showAlert('error', 'Please enter your password to change your email');
         } else if (this.passStatus === 'EnteredButInvalid') {
            this.showAlert('error', 'Please enter your correct current password');
         } else {
            this.updateEmailBtnStatus = 'submited';
            this.$store
               .dispatch('updateEmail', {
                  newEmail: this.email,
                  password: this.pass,
               })
               .then((res) => {
                  if (res === 'success') {
                     this.updateEmailBtnStatus = 'success';
                     this.pass = '';
                     this.showAlert('success', 'Email Updated Successfully!');
                     setTimeout(() => {
                        this.updateEmailBtnStatus = 'not-submited';
                     }, 1000);
                  } else {
                     this.updateEmailBtnStatus = 'error';
                     this.pass = '';
                     this.showAlert('error', res);
                     setTimeout(() => {
                        this.updateEmailBtnStatus = 'not-submited';
                     }, 1000);
                  }
               });
         }
      },
      changePassBtnSubmit() {
         if (this.curPassStatus === 'notEntered') {
            this.showAlert('error', 'Please enter your current password.');
         } else if (this.curPassStatus === 'EnteredButInvalid') {
            this.showAlert('error', 'Please enter your valid current password.');
         } else if (this.newPassStatus === 'notEntered') {
            this.showAlert('error', 'Please enter your new password.');
         } else if (this.newPassStatus === 'EnteredButInvalid') {
            this.showAlert('error', 'Please enter a valid new password.');
         } else {
            this.changePassBtnStatus = 'submited';
            this.$store
               .dispatch('updatePassword', {
                  curPass: this.curPass,
                  newPass: this.newPass,
               })
               .then((res) => {
                  if (res === 'success') {
                     this.changePassBtnStatus = 'success';
                     this.curPass = '';
                     this.newPass = '';
                     this.showAlert('success', 'Password Updated Successfully!');
                     setTimeout(() => {
                        this.changePassBtnStatus = 'not-submited';
                     }, 1000);
                  } else {
                     this.changePassBtnStatus = 'error';
                     this.curPass = '';
                     this.newPass = '';
                     this.showAlert('error', res);
                     setTimeout(() => {
                        this.changePassBtnStatus = 'not-submited';
                     }, 1000);
                  }
               });
         }
      },

      showAlert(type, msg) {
         this.$store.dispatch('showAlert', { type, msg });
      },
      previewImage() {
         const photo = this.$refs.uploadImageInput.files[0];
         const reader = new FileReader();
         reader.readAsDataURL(photo);
         reader.onload = (e) => {
            this.photoUrl = e.target.result;
         };
         this.newProfile = photo;
      },
      setProfilePicToDefault() {
         this.photoUrl = this.$store.getters.defaultPhotoUrl;
      },
   },
   computed: {
      isDefaultPic() {
         return this.photoUrl === this.$store.getters.defaultPhotoUrl;
      },
   },
};
</script>
