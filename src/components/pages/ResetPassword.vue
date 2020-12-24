<template>
   <form class="form form--reset-password" autocomplete="off">
      <div class="form__header">
         <back-link name="home"></back-link>
         <h3 class="form__header--title">Reset Password</h3>
      </div>
      <div class="form__body">
         <div class="form__group form__group--pass">
            <input class="form__group-input" id="passInput" type="password" /><label
               class="form__group-label"
               id="passLabel"
               for="passInput"
               >Password</label
            ><img class="eye-svg" id="eyeSvgForPass" src="/assets/svg/passShow.svg" />
         </div>
         <button class="btn btn__reset" id="submit" type="submit">
            <span class="btn__reset--text">Reset</span>
         </button>
      </div>
   </form>
</template>

<script>
import BackLink from '../utils/BackLink.vue';

export default {
   components: {
      BackLink,
   },
};
</script>
