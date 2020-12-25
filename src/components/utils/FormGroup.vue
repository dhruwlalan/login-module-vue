<template>
   <form-input-name v-if="type === 'fullName'" @info="emitInfo"></form-input-name>
   <form-input-email v-else-if="type === 'email'" @info="emitInfo"></form-input-email>
   <form-input-pass v-else-if="type === 'pass'" @info="emitInfo"></form-input-pass>
</template>

<script>
import FormInputName from './FormInputName.vue';
import FormInputEmail from './FormInputEmail.vue';
import FormInputPass from './FormInputPass.vue';

export default {
   components: {
      FormInputName,
      FormInputEmail,
      FormInputPass,
   },
   props: ['type'],
   emits: ['info'],
   methods: {
      emitInfo(info) {
         this.$emit('info', info);
      },
   },
};
</script>
