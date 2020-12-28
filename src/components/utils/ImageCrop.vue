<template>
   <teleport to="body">
      <transition enter-active-class="animate fade-in" leave-active-class="animate fade-out">
         <div class="backdrop" v-show="modelValue"></div>
      </transition>
   </teleport>
   <spinner :spinner="spinner" color="white" if="modelValue"></spinner>
   <transition enter-active-class="animate slide-down" leave-active-class="animate slide-up">
      <div class="ic__container" v-show="showModal">
         <div class="ic__header">
            <div class="ic__header--title">Image Cropper</div>
            <span class="ic__header--cancel-btn" @click="closeModal">×</span>
         </div>
         <div class="ic__body">
            <div class="ic__body--canvas">
               <img class="ic__body--canvas--img" ref="mc" :src="img" />
            </div>
         </div>
         <div class="ic__footer" @click="cropImage">crop</div>
      </div>
   </transition>
</template>

<script>
import '../../cropper.css';
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
      };
   },
   watch: {
      modelValue() {
         if (this.modelValue === true) {
            this.spinner = true;
            setTimeout(() => {
               this.spinner = false;
               this.showModal = true;
               this.createNewCropperInstance();
            }, 500);
         }
      },
   },
   methods: {
      closeModal() {
         this.$emit('update:modelValue', false);
         this.showModal = false;
         setTimeout(() => {
            this.cropper.destroy();
         }, 500);
      },
      cropImage() {
         this.closeModal();
         const base64 = this.cropper
            .getCroppedCanvas({ maxWidth: 1000, maxHeight: 1000 })
            .toDataURL();
         this.cropper.getCroppedCanvas({ maxWidth: 1000, maxHeight: 1000 }).toBlob(
            (blob) => {
               const photo = this.blobToFile(blob, 'testing.jpeg');
               this.$emit('cropped', { base64, photo });
            },
            'image/jpeg',
            1,
         );
      },
      createNewCropperInstance() {
         this.cropper = new Cropper(this.$refs.mc, {
            aspectRatio: 1 / 1,
            viewMode: 2,
            dragMode: 'move',
            guides: false,
            highlight: false,
            center: false,
            autoCropArea: 0.8,
            movable: false,
            rotatable: false,
            scalable: false,
            zoomable: false,
            fillColor: '#fff',
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'high',
         });
      },
      blobToFile(blob, fileName) {
         const lastModifiedDate = new Date();
         const file = new File([blob], fileName, { lastModified: lastModifiedDate });
         return file;
      },
   },
};
</script>

<style lang="scss" scoped>
.backdrop {
   position: fixed;
   top: 0;
   right: 0;
   bottom: 0;
   left: 0;
   z-index: 100;
   background-color: rgb(0 5 14 / 70%);
}
.ic {
   &__container {
      position: fixed;
      top: 5rem;
      margin: 0 auto;
      z-index: 200;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      user-select: none;
   }
   &__header {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      height: 4.5rem;
      background-color: var(--pri-blue);
      &--title {
         color: lavender;
         font-family: Roboto, sans-serif;
         font-size: 2rem;
      }
      &--cancel-btn {
         position: absolute;
         right: 1.5rem;
         font-family: Roboto, sans-serif;
         font-size: 3rem;
         color: lavender;
         font-weight: 400;
         cursor: pointer;
      }
   }
   &__body {
      background: linear-gradient(to bottom, var(--pri-blue), var(--success-bc));
      padding: 4px;
      &--canvas {
         width: 400px;
         height: 400px;
         &--img {
            display: block;
            max-width: 100%;
         }
      }
   }
   &__footer {
      color: var(--success-c);
      font-family: Roboto, sans-serif;
      font-size: 2rem;
      height: 4.5rem;
      background-color: var(--success-bc);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
   }
}

.animate {
   -webkit-animation-duration: 0.3s;
   animation-duration: 0.3s;
}
@keyframes fade-in {
   0% {
      opacity: 0;
   }
   100% {
      opacity: 1;
   }
}
.fade-in {
   -webkit-animation-name: fade-in;
   animation-name: fade-in;
}
@keyframes fade-out {
   0% {
      opacity: 1;
   }
   100% {
      opacity: 0;
   }
}
.fade-out {
   -webkit-animation-name: fade-out;
   animation-name: fade-out;
}
@keyframes slide-down {
   0% {
      -webkit-transform: translateY(-200px);
      transform: translateY(-200px);
   }
   100% {
      -webkit-transform: none;
      transform: none;
   }
}
.slide-down {
   -webkit-animation-name: slide-down;
   animation-name: slide-down;
}
@keyframes slide-up {
   0% {
      -webkit-transform: none;
      transform: none;
   }
   100% {
      -webkit-transform: translateY(-200px);
      transform: translateY(-200px);
      opacity: 0;
   }
}
.slide-up {
   -webkit-animation-name: slide-up;
   animation-name: slide-up;
}
</style>
