<template>
   <teleport to="body">
      <transition enter-active-class="fade-in" leave-active-class="fade-out">
         <div class="backdrop" v-show="modelValue"></div>
      </transition>
   </teleport>
   <spinner :spinner="spinner" if="modelValue"></spinner>
   <transition enter-active-class="slide-down" leave-active-class="slide-up">
      <div class="ic__container" v-show="showModal">
         <div class="ic__header">
            <div class="ic__header--title">Image Cropper</div>
            <span class="ic__header--cancel-btn" @click="closeModal">×</span>
         </div>
         <div class="ic__body">
            <div class="ic__body--canvas">
               <img class="ic__body--canvas--img" ref="ic" :src="img" />
            </div>
         </div>
         <div class="ic__footer" @click="cropImage">
            <span v-if="notCropped">crop</span>
            <span v-else-if="cropping">cropping</span>
            <span v-else-if="cropped">&#10003;</span>
         </div>
      </div>
   </transition>
</template>

<script>
import Cropper from 'cropperjs';
import spinner from './spinner.vue';

export default {
   components: {
      spinner,
   },
   props: ['modelValue', 'img'],
   emits: ['update:modelValue', 'cropped'],
   data() {
      return {
         spinner: false,
         showModal: false,
         cropper: null,
         cropStatus: 'not-cropped',
      };
   },
   watch: {
      modelValue() {
         if (this.modelValue === true) {
            this.spinner = true;
            setTimeout(() => {
               this.spinner = false;
               this.showModal = true;
               this.cropStatus = 'not-cropped';
               this.createNewCropperInstance();
            }, 800);
         }
      },
   },
   methods: {
      createNewCropperInstance() {
         this.cropper = new Cropper(this.$refs.ic, {
            aspectRatio: 1 / 1,
            viewMode: 2,
            dragMode: 'move',
            guides: false,
            highlight: false,
            center: true,
            autoCropArea: 1,
            movable: false,
            rotatable: false,
            scalable: false,
            zoomable: false,
            fillColor: '#000000',
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'high',
         });
      },
      closeModal() {
         this.showModal = false;
         this.$emit('update:modelValue', false);
         setTimeout(() => {
            this.cropper.destroy();
         }, 500);
      },
      cropImage() {
         this.cropStatus = 'cropping';
         const base64 = this.cropper
            .getCroppedCanvas({ maxWidth: 1000, maxHeight: 1000 })
            .toDataURL();
         this.cropper.getCroppedCanvas({ maxWidth: 1000, maxHeight: 1000 }).toBlob(
            (blob) => {
               const photo = this.blobToFile(blob, 'testing.jpeg');
               this.$emit('cropped', { base64, photo });
               setTimeout(() => {
                  this.cropStatus = 'cropped';
                  setTimeout(() => {
                     this.closeModal();
                  }, 200);
               }, 500);
            },
            'image/jpeg',
            1,
         );
      },
      blobToFile(blob, fileName) {
         const lastModifiedDate = new Date();
         const file = new File([blob], fileName, { lastModified: lastModifiedDate });
         return file;
      },
   },
   computed: {
      notCropped() {
         return this.cropStatus === 'not-cropped';
      },
      cropping() {
         return this.cropStatus === 'cropping';
      },
      cropped() {
         return this.cropStatus === 'cropped';
      },
   },
};
</script>
