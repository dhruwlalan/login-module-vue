<template>
   <nav class="navbar">
      <div class="navbar__link" id="edit" v-if="isHomePage" @click="gotoEdit">
         <div class="navbar__link--svgbox">
            <svg
               class="navbar__link--svg"
               xmlns="http://www.w3.org/2000/svg"
               xmlns:xlink="http://www.w3.org/1999/xlink"
               aria-hidden="true"
               focusable="false"
               role="img"
               preserveAspectRatio="xMidYMid meet"
               viewBox="0 -1 24 24"
               style="transform: rotate(360deg)"
            >
               <path
                  fill="#002fff"
                  d="M8.999 3.999a4.002 4.002 0 0 0 0 8.003a3.999 3.999 0 0 0 3.998-4.005A3.998 3.998 0 0 0 9 4zm0 10C6.329 13.999 1 15.332 1 17.997V20H12.08a6.233 6.233 0 0 1-.078-1.001c0-1.514.493-2.988 1.407-4.199c-1.529-.523-3.228-.801-4.41-.801zm8.99 0a.261.261 0 0 0-.25.21l-.19 1.319a4.091 4.091 0 0 0-.85.492l-1.24-.502a.265.265 0 0 0-.308.112l-1.001 1.729a.255.255 0 0 0 .059.322l1.06.83a3.95 3.95 0 0 0 0 .981l-1.06.83a.26.26 0 0 0-.059.318l1.001 1.729c.059.111.19.151.308.111l1.24-.497c.258.2.542.366.85.488l.19 1.318c.02.122.122.21.25.21h2.001c.122 0 .23-.088.25-.21l.19-1.318c.297-.132.59-.288.84-.488l1.25.497c.111.04.239 0 .313-.111l.996-1.729a.256.256 0 0 0-.059-.317l-1.07-.83c.02-.162.04-.323.04-.494c0-.171-.01-.328-.04-.488l1.06-.83c.087-.084.121-.21.059-.322l-.996-1.729a.263.263 0 0 0-.313-.113l-1.24.503c-.26-.2-.543-.37-.85-.492l-.19-1.32a.238.238 0 0 0-.24-.21M18.989 17.5c.83 0 1.5.669 1.5 1.499c0 .83-.67 1.498-1.5 1.498S17.49 19.83 17.49 19s.669-1.499 1.499-1.499z"
               ></path>
            </svg>
         </div>
         <div class="navbar__link--text">Edit</div>
      </div>
      <div class="navbar__link" id="home" v-if="isEditPage" @click="gotoHome">
         <div class="navbar__link--svgbox">
            <svg
               class="navbar__link--svg"
               xmlns="http://www.w3.org/2000/svg"
               xmlns:xlink="http://www.w3.org/1999/xlink"
               aria-hidden="true"
               focusable="false"
               role="img"
               width="1em"
               height="1em"
               preserveAspectRatio="xMidYMid meet"
               viewBox="0 -27 512 512"
               style="transform: rotate(360deg)"
            >
               <path
                  fill="#002fff"
                  d="M401.4 224h-214l83-79.4c11.9-12.5 11.9-32.7 0-45.2s-31.2-12.5-43.2 0L89 233.4c-6 5.8-9 13.7-9 22.4v.4c0 8.7 3 16.6 9 22.4l138.1 134c12 12.5 31.3 12.5 43.2 0 11.9-12.5 11.9-32.7 0-45.2l-83-79.4h214c16.9 0 30.6-14.3 30.6-32 .1-18-13.6-32-30.5-32z"
               ></path>
            </svg>
         </div>
         <div class="navbar__link--text">Home</div>
      </div>
      <div class="navbar__link" id="logout" @click="logout">
         <div class="navbar__link--text">Logout</div>
         <div class="navbar__link--svgbox">
            <svg
               class="navbar__link--svg"
               xmlns="http://www.w3.org/2000/svg"
               xmlns:xlink="http://www.w3.org/1999/xlink"
               aria-hidden="true"
               focusable="false"
               role="img"
               width="1em"
               height="1em"
               preserveAspectRatio="xMidYMid meet"
               viewBox="0 -1 24 24"
               style="transform: rotate(360deg)"
            >
               <g fill="none">
                  <path
                     d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1"
                     stroke="#002fff"
                     stroke-width="2"
                     stroke-linecap="round"
                     stroke-linejoin="round"
                  ></path>
               </g>
            </svg>
         </div>
      </div>
   </nav>
</template>

<script>
export default {
   props: ['page'],
   methods: {
      gotoHome() {
         this.$router.push({ name: 'home' });
      },
      gotoEdit() {
         this.$router.push({ name: 'edit' });
      },
      logout() {
         this.$store.dispatch('logout').then(() => {
            this.$router.push({ name: 'home' });
         });
      },
   },
   computed: {
      isHomePage() {
         return this.page === 'home';
      },
      isEditPage() {
         return this.page === 'edit';
      },
   },
};
</script>
