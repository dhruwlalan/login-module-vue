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
   <div class="section section--edit">
      <form class="form form--edit--profile" autocomplete="off">
         <h3 class="form__header--midtitle">Update Your Profile Photo.</h3>
         <div class="form__body">
            <div class="form__group__profile">
               <img class="form__group__profile--preview" id="uploadImagePreview" :src="picUrl" />
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
         picUrl: this.$store.getters.user.photoURL,
         newProfile: '',
         curPass: '',
         newPass: '',
         fullNameStatus: '',
         emailStatus: '',
         curPassStatus: '',
         newPassStatus: '',
         editDataBtnStatus: 'not-submited',
         changePassBtnStatus: 'not-submited',
         updateProfileBtnStatus: 'not-submited',
      };
   },
   methods: {
      getFullNameStatus(status) {
         this.fullNameStatus = status;
      },
      getEmailStatus(status) {
         this.emailStatus = status;
      },
      getCurPassStatus(status) {
         this.curPassStatus = status;
      },
      getNewPassStatus(status) {
         this.newPassStatus = status;
      },
      editDataBtnSubmit() {
         if (this.fullNameStatus === 'notEntered') {
            this.showAlert('error', 'Please enter your full name.');
         } else if (this.emailStatus === 'notEntered') {
            this.showAlert('error', 'Please enter your email address.');
         } else if (this.emailStatus === 'EnteredButInvalid') {
            this.showAlert('error', 'Please enter a valid email address.');
         } else {
            this.editDataBtnStatus = 'submited';
            this.$store.dispatch('updateFullName', this.fullName).then((res) => {
               if (res === 'success') {
                  this.editDataBtnStatus = 'success';
                  this.showAlert('success', 'Data Updated Successfully!');
                  setTimeout(() => {
                     this.editDataBtnStatus = 'not-submited';
                  }, 1000);
               } else {
                  this.editDataBtnStatus = 'error';
                  this.showAlert('error', res);
                  setTimeout(() => {
                     this.editDataBtnStatus = 'not-submited';
                  }, 1000);
               }
            });
         }
      },
      changePassBtnSubmit() {
         console.log(this.curPass);
         console.log(this.curPassStatus);
         console.log(this.newPass);
         console.log(this.newPassStatus);
      },
      updateProfileBtnSubmit() {
         if (this.isDefaultPic) {
            this.updateProfileBtnStatus = 'submited';
            this.$store
               .dispatch(
                  'updateProfilPic',
                  'https://firebasestorage.googleapis.com/v0/b/login-module-vue.appspot.com/o/default.png?alt=media&token=ac9c3618-ab29-42b5-8fc4-54d31cbe68a2',
               )
               .then((res) => {
                  if (res === 'success') {
                     this.updateProfileBtnStatus = 'success';
                     this.showAlert('success', 'Data Updated Successfully!');
                     setTimeout(() => {
                        this.updateProfileBtnStatus = 'not-submited';
                     }, 1000);
                  } else {
                     this.updateProfileBtnStatus = 'error';
                     this.showAlert('error', res);
                     setTimeout(() => {
                        this.updateProfileBtnStatus = 'not-submited';
                     }, 1000);
                  }
               });
         } else {
            this.updateProfileBtnStatus = 'submited';
            this.$store.dispatch('uploadNewProfilePic', this.newProfile).then((res) => {
               if (res === 'success') {
                  this.updateProfileBtnStatus = 'success';
                  this.showAlert('success', 'Data Updated Successfully!');
                  setTimeout(() => {
                     this.updateProfileBtnStatus = 'not-submited';
                  }, 1000);
               } else {
                  this.updateProfileBtnStatus = 'error';
                  this.showAlert('error', res);
                  setTimeout(() => {
                     this.updateProfileBtnStatus = 'not-submited';
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
            this.picUrl = e.target.result;
         };
         this.newProfile = photo;
      },
      setProfilePicToDefault() {
         this.picUrl =
            'https://firebasestorage.googleapis.com/v0/b/login-module-vue.appspot.com/o/default.png?alt=media&token=ac9c3618-ab29-42b5-8fc4-54d31cbe68a2';
      },
   },
   computed: {
      isDefaultPic() {
         return (
            this.picUrl ===
            'https://firebasestorage.googleapis.com/v0/b/login-module-vue.appspot.com/o/default.png?alt=media&token=ac9c3618-ab29-42b5-8fc4-54d31cbe68a2'
         );
      },
   },
};
</script>
