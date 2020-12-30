<template>
   <teleport to="body">
      <transition enter-active-class="slideInDown" leave-active-class="slideOutUp">
         <div class="alert" :class="alertType" v-show="showAlert">
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
      showAlert() {
         return this.alert.showAlert;
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
