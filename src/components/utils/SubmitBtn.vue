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
   props: ['btnStatus'],
   computed: {
      notSubmited() {
         return this.btnStatus === 'not-submited';
      },
      spinner() {
         return this.btnStatus === 'submited';
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
