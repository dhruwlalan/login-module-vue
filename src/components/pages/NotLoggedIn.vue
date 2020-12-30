<template>
   <div class="nli">
      <div class="nli__heading">Welcome!</div>
      <div class="nli__desc">
         This is just a simple Login and Sign Up module. Login to your account or Sign Up if you
         haven't created one.
      </div>
      <div class="nli__links">
         <router-link :to="{ name: 'login' }" class="nli__links--link">Login</router-link>
         <router-link :to="{ name: 'signup' }" class="nli__links--link">Sign Up</router-link>
      </div>
   </div>
</template>
