<template>
   <button class="btn">
      <slot v-if="notSubmited"></slot>
      <span v-else-if="spinner" class="spinner-white" />
      <span v-else-if="success">&#10003;</span>
      <span v-else-if="error">&#10007;</span>
   </button>
</template>

<script>
export default {
   props: {
      btnStatus: {
         type: String,
         default: 'not-submitted',
         required: true,
         validator(value) {
            return ['not-submitted', 'submitted', 'success', 'error'].indexOf(value) !== -1;
         },
      },
   },
   computed: {
      notSubmited() {
         return this.btnStatus === 'not-submitted';
      },
      spinner() {
         return this.btnStatus === 'submitted';
      },
      success() {
         return this.btnStatus === 'success';
      },
      error() {
         return this.btnStatus === 'error';
      },
   },
};
</script>
