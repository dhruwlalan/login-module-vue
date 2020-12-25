<template>
   <alert-box></alert-box>
   <div class="container">
      <router-view></router-view>
   </div>
</template>

<script>
import AlertBox from './components/utils/AlertBox.vue';

export default {
   components: {
      AlertBox,
   },
};
</script>
