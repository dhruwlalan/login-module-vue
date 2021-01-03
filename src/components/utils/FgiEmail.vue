<template>
   <div
      class="form__group"
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
         :value="modelValue"
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
import validator from 'email-validator';

export default {
   props: ['modelValue'],
   emits: ['update:modelValue', 'status'],
   data() {
      return {
         status: 'notEntered',
         shouldHover: false,
         shouldFocus: false,
      };
   },
   methods: {
      focusin() {
         this.shouldFocus = true;
         this.shouldHover = false;
      },
      focusout() {
         this.shouldFocus = false;
      },
      mouseEnter() {
         if (this.modelValue.length === 0 && !this.shouldFocus) {
            this.shouldHover = true;
         }
      },
      mouseLeave() {
         this.shouldHover = false;
      },
      updateStatus() {
         if (this.modelValue.length === 0) {
            this.status = 'notEntered';
         } else if (validator.validate(this.modelValue)) {
            this.status = 'EnteredAndValid';
         } else {
            this.status = 'EnteredButInvalid';
         }
         this.$emit('status', this.status);
      },
      async updateEmail(e) {
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
   },
   created() {
      this.updateStatus();
   },
};
</script>
