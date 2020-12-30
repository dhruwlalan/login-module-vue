export default () => {
   const loader = document.getElementById('pre-loader');
   window.addEventListener('load', () => {
      setTimeout(() => {
         loader.remove();
      }, 400);
   });
};
