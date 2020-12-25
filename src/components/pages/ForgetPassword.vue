<template>
   <form class="form form--forget-password" autocomplete="off">
      <div class="form__header">
         <back-link name="login"></back-link>
         <h3 class="form__header--title">Forget Password?</h3>
         <h5 class="form__header--subtitle">Enter your email address to reset your password.</h5>
      </div>
      <div class="form__body">
         <div class="form__group form__group--email">
            <input class="form__group-input" id="emailInput" type="email" /><label
               class="form__group-label"
               id="emailLabel"
               for="emailInput"
               >Email</label
            >
         </div>
         <button class="btn btn__forget-password" id="submit" type="submit">
            <span class="btn__forget-password--text">Send Reset Link</span>
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
