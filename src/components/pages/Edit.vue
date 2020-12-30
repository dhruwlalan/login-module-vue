<template>
   <the-navbar page="edit"></the-navbar>
   <hori-pipes></hori-pipes>
   <div class="section section--edit">
      <form class="form form--edit" autocomplete="off">
         <h3 class="form__header--midtitle">Update Your Profile</h3>
         <div class="form__body">
            <fgi-name v-model="fullName" @status="getFullNameStatus" />
            <image-crop v-model="openImageCropModal" :img="newPhotoDataUrl" @cropped="onCropped" />
            <div class="form__group__profile">
               <img class="form__group__profile--preview" id="uploadImagePreview" :src="photoURL" />
               <input
                  class="form__group__profile--input"
                  id="uploadImageInput"
                  type="file"
                  accept="image/*"
                  name="photo"
                  @change="getNewPhotoFromUser"
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
      <form class="form form--edit" autocomplete="off">
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
      <form class="form form--edit" autocomplete="off">
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
import ImageCrop from '../utils/ImageCrop.vue';

export default {
   components: {
      TheNavbar,
      HoriPipes,
      FgiName,
      FgiEmail,
      FgiPass,
      SubmitBtn,
      ImageCrop,
   },
   data() {
      return {
         fullName: this.$store.getters.user.displayName,
         email: this.$store.getters.user.email,
         photoURL: this.$store.getters.user.photoURL,
         pass: '',
         curPass: '',
         newPass: '',
         fullNameStatus: '',
         emailStatus: '',
         passStatus: '',
         curPassStatus: '',
         newPassStatus: '',
         updateProfileBtnStatus: 'not-submitted',
         updateEmailBtnStatus: 'not-submitted',
         changePassBtnStatus: 'not-submitted',
         openImageCropModal: false,
         newPhotoDataUrl: null,
         newPhotoFile: null,
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
            this.updateProfileBtnStatus = 'submitted';
            const allPromises = [];
            let allSuccess = true;
            const errorMsg = [];
            allPromises.push(this.$store.dispatch('updateProfile', { fullName: this.fullName }));
            if (this.isDefaultPic) {
               allPromises.push(this.$store.dispatch('updateProfile', { photoURL: this.photoURL }));
            } else if (this.newPhotoFile) {
               allPromises.push(this.$store.dispatch('uploadNewProfilePic', this.newPhotoFile));
            }
            Promise.all(allPromises).then((values) => {
               values.forEach((element) => {
                  if (element !== 'success') {
                     errorMsg.push(element);
                     allSuccess = false;
                  }
               });
               if (allSuccess) {
                  this.showAlert('success', 'Profile Updated Successfully!');
                  this.updateProfileBtnStatus = 'success';
                  setTimeout(() => {
                     this.updateProfileBtnStatus = 'not-submitted';
                  }, 1000);
               } else {
                  this.showAlert('error', errorMsg[0]);
                  this.updateProfileBtnStatus = 'error';
                  setTimeout(() => {
                     this.updateProfileBtnStatus = 'not-submitted';
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
            this.updateEmailBtnStatus = 'submitted';
            this.$store
               .dispatch('updateEmail', {
                  newEmail: this.email,
                  pass: this.pass,
               })
               .then((res) => {
                  if (res === 'success') {
                     this.showAlert('success', 'Email Updated Successfully!');
                     this.updateEmailBtnStatus = 'success';
                     this.pass = '';
                     setTimeout(() => {
                        this.updateEmailBtnStatus = 'not-submitted';
                     }, 1000);
                  } else {
                     this.showAlert('error', res);
                     this.updateEmailBtnStatus = 'error';
                     this.pass = '';
                     setTimeout(() => {
                        this.updateEmailBtnStatus = 'not-submitted';
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
            this.changePassBtnStatus = 'submitted';
            this.$store
               .dispatch('updatePassword', {
                  curPass: this.curPass,
                  newPass: this.newPass,
               })
               .then((res) => {
                  if (res === 'success') {
                     this.showAlert('success', 'Password Updated Successfully!');
                     this.changePassBtnStatus = 'success';
                     this.curPass = '';
                     this.newPass = '';
                     setTimeout(() => {
                        this.changePassBtnStatus = 'not-submitted';
                     }, 1000);
                  } else {
                     this.showAlert('error', res);
                     this.changePassBtnStatus = 'error';
                     this.curPass = '';
                     this.newPass = '';
                     setTimeout(() => {
                        this.changePassBtnStatus = 'not-submitted';
                     }, 1000);
                  }
               });
         }
      },

      getNewPhotoFromUser() {
         const photo = this.$refs.uploadImageInput.files[0];
         const reader = new FileReader();
         reader.readAsDataURL(photo);
         reader.onload = (e) => {
            this.newPhotoDataUrl = e.target.result;
            this.$refs.uploadImageInput.value = '';
            this.openImageCropModal = true;
         };
      },
      onCropped(cropImageUrl) {
         this.newPhotoDataUrl = null;
         this.photoURL = cropImageUrl.base64;
         this.newPhotoFile = cropImageUrl.photo;
      },
      setProfilePicToDefault() {
         this.photoURL = this.$store.getters.defaultPhotoURL;
         this.newPhotoDataUrl = null;
         this.newPhotoFile = null;
      },
      showAlert(type, msg) {
         this.$store.dispatch('showAlert', { type, msg });
      },
   },
   computed: {
      isDefaultPic() {
         return this.photoURL === this.$store.getters.defaultPhotoURL;
      },
   },
   watch: {
      openImageCropModal() {
         if (this.openImageCropModal === true) {
            document.body.style.overflowY = 'hidden';
         } else {
            setTimeout(() => {
               document.body.removeAttribute('style');
            }, 600);
         }
      },
   },
};
</script>
