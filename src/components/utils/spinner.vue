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

<style scoped>
.spinner {
   position: fixed;
   top: 2rem;
   left: 50%;
   transform: translateY(-50%);
   z-index: 99999;
   height: 2rem;
   width: 2rem;
   border-radius: 50%;
   animation: spin 1s linear infinite;
}
.spinner-blue {
   border: 2px solid var(--pri-blue);
   border-bottom: 2px solid transparent;
}
.spinner-white {
   border: 2px solid white;
   border-bottom: 2px solid transparent;
}
</style>
