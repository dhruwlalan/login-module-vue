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
         id="emailInput"
         type="email"
         @focusin="focusin"
         @focusout="focusout"
         :value="email"
         @input="updateEmail"
      />
      <label
         class="form__group-label"
         id="emailLabel"
         for="emailInput"
         :class="labelState"
         :style="labelStyle"
      >
         Email
      </label>
   </div>
</template>

<script>
import validator from 'validator';

export default {
   emits: ['info'],
   data() {
      return {
         email: '',
         status: '',
         msg: '',
         shouldHover: false,
         shouldFocus: false,
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
         if (this.email.length === 0 && !this.shouldFocus) {
            this.shouldHover = true;
         }
      },
      mouseLeave() {
         this.shouldHover = false;
      },
      updateEmail(e) {
         this.email = e.target.value;
         if (this.email.length === 0) {
            this.status = 'notEntered';
         } else if (validator.isEmail(this.email)) {
            this.status = 'EnteredAndValid';
         } else {
            this.status = 'EnteredButInvalid';
         }
         this.$emit('info', {
            email: this.email,
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
         return null;
      },
      labelStyle() {
         if (this.status === 'EnteredAndValid') {
            return {
               color: '#002fff',
            };
         }
         return null;
      },
   },
};
</script>
