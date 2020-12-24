<template>
   <div class="comp">
      <h2>{{ $route.fullPath }}</h2>
      <h1>404 Page not found!</h1>
      <button @click="$router.push('/')">Go Home</button>
   </div>
</template>

<script>
export default {
   props: ['notFound'],
};
</script>

<style scoped>
h2 {
   color: white;
}
button {
   outline: none;
   border: none;
   height: 2rem;
   width: 8rem;
   margin-top: 2rem;
   background-color: lavender;
   box-shadow: 0 0 12px rgb(0 0 0 / 30%);
   color: teal;
   border-radius: 1rem;
   cursor: pointer;
   margin-right: 2rem;
}
button:active {
   box-shadow: none;
}
</style>
