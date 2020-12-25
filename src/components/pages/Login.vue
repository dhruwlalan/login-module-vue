<template>
   <form class="form form--login" autocomplete="off">
      <div class="form__header">
         <back-link name="home"></back-link>
         <h3 class="form__header--title">Login</h3>
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
         <div class="form__group form__group--pass">
            <input class="form__group-input" id="passInput" type="password" /><label
               class="form__group-label"
               id="passLabel"
               for="passInput"
               >Password</label
            ><img class="eye-svg" id="eyeSvgForPass" src="assets/svg/passShow.svg" />
         </div>
         <button class="btn btn__login" id="submit" type="submit">
            <span class="btn__login--text">Login</span>
         </button>
         <router-link :to="{ name: 'forgetPassword' }" class="form__forget-password"
            >Forget your password?
         </router-link>
      </div>
      <div class="form__footer">
         <span>I'm a new user,</span>
         <router-link :to="{ name: 'signup' }" class="form__footer--link">Sign Up</router-link>
      </div>
      <wave-svg></wave-svg>
   </form>
</template>

<script>
import BackLink from '../utils/BackLink.vue';
import WaveSvg from '../utils/WaveSvg.vue';

export default {
   components: {
      BackLink,
      WaveSvg,
   },
};
</script>
