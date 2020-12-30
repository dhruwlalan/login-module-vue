<template>
   <span class="spinner" :class="spinnerColor" v-if="spinner"></span>
</template>

<script>
export default {
   props: ['spinner', 'color'],
   computed: {
      spinnerColor() {
         if (this.color === 'blue') {
            return {
               'spinner-blue': true,
            };
         }
         return {
            'spinner-white': true,
         };
      },
   },
};
</script>
