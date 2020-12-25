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
         id="nameInput"
         type="text"
         @focusin="focusin"
         @focusout="focusout"
         :value="fullName"
         @input="updateFullName"
      />
      <label
         class="form__group-label"
         id="nameLabel"
         for="nameInput"
         :class="labelState"
         :style="labelStyle"
      >
         Full Name
      </label>
   </div>
</template>

<script>
import validator from 'validator';

export default {
   emits: ['info'],
   data() {
      return {
         fullName: '',
         status: 'notEntered',
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
         if (this.fullName.length === 0 && !this.shouldFocus) {
            this.shouldHover = true;
         }
      },
      mouseLeave() {
         this.shouldHover = false;
      },
      updateFullName(e) {
         this.fullName = e.target.value;
         if (this.fullName.length === 0) {
            this.status = 'notEntered';
         } else {
            this.status = 'EnteredAndValid';
         }
         this.$emit('info', {
            fullName: this.fullName,
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
   created() {
      this.$emit('info', {
         fullName: this.fullName,
         status: this.status,
      });
   },
};
</script>
