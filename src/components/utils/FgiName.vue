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
         id="nameInput"
         type="text"
         @focusin="focusin"
         @focusout="focusout"
         :value="modelValue"
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
         } else {
            this.status = 'EnteredAndValid';
         }
         this.$emit('status', this.status);
      },
      async updateFullName(e) {
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
      this.updateStatus();
   },
};
</script>
