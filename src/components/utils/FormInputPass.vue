<template>
   <div
      class="form__group form__group--name"
      @mouseenter="mouseEnter"
      @mouseleave="mouseLeave"
      :class="groupState"
      :style="groupStyle"
   >
      <input
         class="form__group-input"
         id="passInput"
         :class="passClass"
         :type="passwordVisibility"
         @focusin="focusin"
         @focusout="focusout"
         :value="pass"
         @input="updatePass"
      />
      <label
         class="form__group-label"
         id="passLabel"
         for="passInput"
         :class="labelState"
         :style="labelStyle"
      >
         Password
      </label>
      <img
         class="eye-svg"
         id="eyeSvgForPass"
         :class="{ showeyesvg: showEyeSvg }"
         :style="eyeSvgStyle"
         :src="eyeSvgIcon"
         @click="tooglePassword"
      />
   </div>
</template>

<script>
import validator from 'validator';

export default {
   emits: ['info'],
   data() {
      return {
         pass: '',
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
         if (this.pass.length === 0 && !this.shouldFocus) {
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
      updatePass(e) {
         this.pass = e.target.value;
         if (this.pass.length === 0) {
            this.status = 'notEntered';
         } else if (this.pass.length > 7) {
            this.status = 'EnteredAndValid';
         } else {
            this.status = 'EnteredButInvalid';
         }
         this.$emit('info', {
            pass: this.pass,
            status: this.status,
         });
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
      passClass() {
         return {
            'form__group-input--showpassword': this.showPassword,
         };
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
   },
   created() {
      this.$emit('info', {
         pass: this.pass,
         status: this.status,
      });
   },
};
</script>
