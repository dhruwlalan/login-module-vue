<template>
   <teleport to="body">
      <div class="backdrop" v-show="modelValue"></div>
   </teleport>
   <div class="ic__container" v-if="modelValue">
      <div class="ic__header">
         <div class="ic__header--title">Image Cropper</div>
         <span class="ic__header--cancel-btn" @click="cancel()">×</span>
      </div>
      <div class="ic__body">
         <div class="ic__body--canvas">
            <img class="ic__body--canvas--img" ref="mc" :src="img" v-show="croploaded" />
         </div>
      </div>
      <div class="ic__footer" @click="cropImage">crop</div>
   </div>
</template>

<script>
import '../../cropper.css';
import Cropper from 'cropperjs';

export default {
   props: ['modelValue', 'img'],
   emits: ['update:modelValue', 'cropped'],
   data() {
      return {
         cropper: null,
         croploaded: false,
      };
   },
   watch: {
      modelValue() {
         if (this.modelValue === true) {
            this.croploaded = false;
            setTimeout(() => {
               setTimeout(() => {
                  this.croploaded = true;
               }, 100);
               this.newImage();
            }, 100);
         }
      },
   },
   computed: {},
   methods: {
      cancel() {
         this.$emit('update:modelValue', false);
         this.cropper.destroy();
      },
      cropImage() {
         const base64 = this.cropper
            .getCroppedCanvas({ maxWidth: 3072, maxHeight: 3072 })
            .toDataURL();
         this.cropper.getCroppedCanvas({ maxWidth: 1000, maxHeight: 1000 }).toBlob(
            (blob) => {
               blob = this.blobToFile(blob, 'testing.jpeg');
               this.$emit('cropped', { base64, blob });
               this.$emit('update:modelValue', false);
            },
            'image/jpeg',
            1,
         );
      },
      newImage() {
         this.cropper = new Cropper(this.$refs.mc, {
            aspectRatio: 1 / 1,
            viewMode: 2,
            dragMode: 'move',
            guides: false,
            highlight: false,
            center: false,
            autoCropArea: 1,
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

<style lang="scss">
.backdrop {
   position: fixed;
   height: 100vh;
   width: 100vw;
   top: 0;
   left: 0;
   z-index: 100;
   background-color: rgb(0 5 14 / 70%);
}
.ic {
   &__container {
      position: fixed;
      top: 5rem;
      left: 50%;
      transform: translateX(-50%);
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
      background-color: black;
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
</style>
