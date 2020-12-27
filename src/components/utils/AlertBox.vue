<template>
   <teleport to="body">
      <transition enter-active-class="slideInDown" leave-active-class="slideOutUp">
         <div class="alert" :class="alertType" v-show="alert.alert">
            {{ alert.msg }}
         </div>
      </transition>
   </teleport>
</template>

<script>
export default {
   computed: {
      alert() {
         return this.$store.getters.alert;
      },
      alertType() {
         return {
            'alert--success': this.alert.type === 'success',
            'alert--error': this.alert.type === 'error',
         };
      },
   },
};
</script>
