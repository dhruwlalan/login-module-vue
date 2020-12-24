<template>
   <form class="form form--signup" autocomplete="off">
      <div class="form__header">
         <router-link :to="{ name: 'home' }" tabindex="-1"
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
      <svg class="form__footer--svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
         <path
            fill-opacity="1"
            d="M0,96L40,117.3C80,139,160,181,240,165.3C320,149,400,75,480,74.7C560,75,640,149,720,154.7C800,160,880,96,960,101.3C1040,107,1120,181,1200,176C1280,171,1360,85,1400,42.7L1440,0L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
         ></path>
      </svg>
   </form>
</template>
