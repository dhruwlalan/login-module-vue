<template>
   <teleport to="body" v-if="modelValue">
      <div class="backdrop"></div>
   </teleport>
   <div class="main-cropper-container" v-if="modelValue">
      <div class="bestcropper">
         <div class="main-cropper">
            <img class="cropperjs" ref="mc" :src="img" v-show="croploaded" />
         </div>
      </div>
      <div class="main-cropper__handlers">
         <div class="mch--btn mch--btn--cancel" @click="cancel()">cancel</div>
         <div class="mch--btn mch--btn--save" @click="cropImage">save</div>
      </div>
   </div>
</template>

<script>
import 'cropperjs/dist/cropper.css';
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
         const base64 = this.cropper.getCroppedCanvas({ width: 200, height: 200 }).toDataURL();
         this.cropper.getCroppedCanvas({ width: 200, height: 200 }).toBlob((blob) => {
            blob = this.blobToFile(blob, 'haha.png');
            this.$emit('cropped', { base64, blob });
            this.$emit('update:modelValue', false);
         });
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
            imageSmoothingEnabled: false,
            imageSmoothingQuality: 'high',
         });
      },
      blobToFile(theBlob, fileName) {
         const lastModifiedDate = new Date();
         const file = new File([theBlob], fileName, { lastModified: lastModifiedDate });
         return file;
      },
   },
};
</script>

<style scoped>
.main-cropper-container {
   position: fixed;
   background-color: rgb(149 149 149);
   top: 2rem;
   left: 50%;
   transform: translateX(-50%);
   z-index: 9999;
   overflow: hidden;
   border-radius: 5px;
   user-select: none;
   display: flex;
   paddint: 1rem;
   flex-direction: column;
}
.bestcropper {
   padding: 6px;
   background: linear-gradient(to right, var(--error-bc) 40%, var(--success-bc) 60%);
}
.main-cropper {
   background-color: rgb(149 149 149);
   width: 360px;
   height: 360px;
}
.cropperjs {
   display: block;
   max-width: 100%;
}
.main-cropper__handlers {
   height: 6rem;
   width: 100%;
   background-color: rgb(149 149 149);
   display: flex;
   justify-content: center;
   align-items: center;
}
.mch--btn {
   height: 100%;
   width: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   font-family: Roboto, sans-serif;
   font-size: 2rem;
   cursor: pointer;
}
.mch--btn--cancel {
   background-color: var(--error-bc);
   color: var(--error-c);
}
.mch--btn--cancel:hover,
.mch--btn--cancel:active {
   background-color: var(--error-c);
   color: var(--error-bc);
}
.mch--btn--save {
   background-color: var(--success-bc);
   color: var(--success-c);
}
.mch--btn--save:hover,
.mch--btn--save:active {
   color: var(--success-bc);
   background-color: var(--success-c);
}
.backdrop {
   position: fixed;
   height: 100vh;
   width: 100vw;
   top: 0;
   left: 0;
   z-index: 100;
   background-color: rgb(0 5 14 / 61%);
}
.cropBack {
   background-color: deeppink;
}
</style>
