<template>
   <div
      class="form__group"
      :class="groupState"
      :style="groupStyle"
      @mouseenter="mouseEnter"
      @mouseleave="mouseLeave"
   >
      <input
         class="form__group-input form__group-input--pass"
         :id="`${name}Input`"
         :type="passwordVisibility"
         :value="modelValue"
         @focusin="focusin"
         @focusout="focusout"
         @input="updatePass"
      />
      <label
         class="form__group-label"
         :id="`${name}Label`"
         :for="`${name}Input`"
         :class="labelState"
         :style="labelStyle"
      >
         {{ labelName }}
      </label>
      <pass-show
         v-if="showPassword"
         :class="{ showeyesvg: showEyeSvg }"
         :style="eyeSvgStyle"
         @click="tooglePassword"
      />
      <pass-hide
         v-if="!showPassword"
         :class="{ showeyesvg: showEyeSvg }"
         :style="eyeSvgStyle"
         @click="tooglePassword"
      />
   </div>
</template>

<script>
import PassShow from './PassShow.vue';
import PassHide from './PassHide.vue';

export default {
   components: {
      PassShow,
      PassHide,
   },
   props: ['modelValue', 'name'],
   emits: ['update:modelValue', 'status'],
   data() {
      return {
         status: 'notEntered',
         shouldHover: false,
         shouldFocus: false,
         showEyeSvg: false,
         showPassword: false,
      };
   },
   methods: {
      focusin(e) {
         this.shouldFocus = true;
         this.shouldHover = false;
      },
      focusout(e) {
         this.shouldFocus = false;
      },
      mouseEnter() {
         if (this.modelValue.length === 0 && !this.shouldFocus) {
            this.shouldHover = true;
         }
         this.showEyeSvg = true;
      },
      mouseLeave() {
         this.shouldHover = false;
         this.showEyeSvg = false;
      },
      tooglePassword() {
         this.showPassword = !this.showPassword;
      },
      updateStatus() {
         if (this.modelValue.length === 0) {
            this.status = 'notEntered';
         } else if (this.modelValue.length > 7) {
            this.status = 'EnteredAndValid';
         } else {
            this.status = 'EnteredButInvalid';
         }
         this.$emit('status', this.status);
      },
      async updatePass(e) {
         await this.$emit('update:modelValue', e.target.value);
         this.updateStatus();
      },
   },
   computed: {
      groupState() {
         return {
            'hover-input': this.shouldHover,
            'focus-input': this.shouldFocus,
         };
      },
      labelState() {
         return {
            'hover-label': this.shouldHover,
            'focus-label': this.shouldFocus,
         };
      },
      groupStyle() {
         if (this.status === 'EnteredAndValid') {
            return {
               border: '1px solid #002fff',
            };
         }
         if (this.status === 'EnteredButInvalid') {
            return {
               border: '1px solid tomato',
            };
         }
         return null;
      },
      labelStyle() {
         if (this.status === 'EnteredAndValid') {
            return {
               color: '#002fff',
            };
         }
         if (this.status === 'EnteredButInvalid') {
            return {
               color: 'tomato',
            };
         }
         return null;
      },
      eyeSvgStyle() {
         if (this.showPassword) {
            return {
               display: 'inline-block',
            };
         }
         return null;
      },
      eyeSvgIcon() {
         if (this.showPassword) {
            return '/src/assets/svg/passHide.svg';
         }
         return '/src/assets/svg/passShow.svg';
      },
      passwordVisibility() {
         return this.showPassword ? 'text' : 'password';
      },
      labelName() {
         if (this.name === 'curPass') {
            return 'Current Password';
         }
         if (this.name === 'newPass') {
            return 'New Password';
         }
         return 'Password';
      },
   },
   created() {
      this.updateStatus();
   },
};
</script>
