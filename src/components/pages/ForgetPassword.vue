<template>
   <form class="form form--forget-password" autocomplete="off">
      <div class="form__header">
         <router-link :to="{ name: 'login' }" tabindex="-1"
            ><svg
               class="form__header--back"
               xmlns="http://www.w3.org/2000/svg"
               xmlns:xlink="http://www.w3.org/1999/xlink"
               aria-hidden="true"
               focusable="false"
               role="img"
               width="1em"
               height="1em"
               preserveAspectRatio="xMidYMid meet"
               viewBox="0 0 512 512"
               style="transform: rotate(360deg)"
            >
               <path
                  d="M401.4 224h-214l83-79.4c11.9-12.5 11.9-32.7 0-45.2s-31.2-12.5-43.2 0L89 233.4c-6 5.8-9 13.7-9 22.4v.4c0 8.7 3 16.6 9 22.4l138.1 134c12 12.5 31.3 12.5 43.2 0 11.9-12.5 11.9-32.7 0-45.2l-83-79.4h214c16.9 0 30.6-14.3 30.6-32 .1-18-13.6-32-30.5-32z"
               ></path></svg
         ></router-link>
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
            <spann class="btn__forget-password--text">Send Reset Link</spann>
         </button>
      </div>
   </form>
</template>
