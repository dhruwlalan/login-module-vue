<template>
   <form class="form form--signup" autocomplete="off">
      <div class="form__header">
         <back-link name="home"></back-link>
         <h3 class="form__header--title">Sign Up</h3>
      </div>
      <div class="form__body">
         <div class="form__group form__group--name">
            <input class="form__group-input" id="nameInput" type="text" /><label
               class="form__group-label"
               id="nameLabel"
               for="nameInput"
               >Full Name</label
            >
         </div>
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
         <button class="btn btn__signup" id="submit" type="submit">
            <span class="btn__signup--text">Creat Account</span>
         </button>
      </div>
      <div class="form__footer">
         <span>I'm already a member,</span>
         <router-link :to="{ name: 'login' }" class="form__footer--link">Login</router-link>
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
