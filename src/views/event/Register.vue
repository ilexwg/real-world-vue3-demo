<template>
  <p>Register for the event here</p>
  <button @click="register">Register Me!</button>
</template>

<script>
export default {
  name: 'EventRegister',

  props: ['event'],

  inject: ['GlobalStore'],

  methods: {
    register() {
      this.GlobalStore.flashMessage = `You are successfully registered for ${this.event.title}`;

      setTimeout(() => {
        this.GlobalStore.flashMessage = '';
      }, 3000);

      this.$router.replace({
        name: 'EventDetails',
        params: { id: this.event.id },
      });
    },
  },
};
</script>
