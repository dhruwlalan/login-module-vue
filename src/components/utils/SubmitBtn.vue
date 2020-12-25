<template>
   <button class="btn btn__signup" id="submit" type="submit">
      <slot v-if="notSubmited"></slot>
      <span v-else-if="spinner" class="spinner" />
      <span v-else-if="success">&#10003;</span>
      <span v-else-if="error">&#10007;</span>
   </button>
</template>

<script>
export default {
   props: ['status'],
   computed: {
      notSubmited() {
         return this.status === 'not-submited';
      },
      spinner() {
         return this.status === 'submited';
      },
      success() {
         return this.status === 'success';
      },
      error() {
         return this.status === 'error';
      },
   },
};
</script>
