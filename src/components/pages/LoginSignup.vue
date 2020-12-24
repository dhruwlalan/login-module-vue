<template>
   <div class="ls">
      <div class="ls__heading">Welcome!</div>
      <div class="ls__desc">
         This is just a simple Login and Sign Up module. Login to your account or Sign-Up if you
         haven't created one.
      </div>
      <div class="ls__links">
         <router-link :to="{ name: 'login' }" class="ls__links--link">Login</router-link>
         <router-link :to="{ name: 'signup' }" class="ls__links--link">Sign Up</router-link>
      </div>
   </div>
</template>
