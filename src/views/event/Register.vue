<template>
  <p>Register for the event here</p>
  <button @click="register">Register Me!</button>
</template>

<script>
export default {
  name: 'EventRegister',

  props: ['event'],

  methods: {
    register() {
      this.$router.replace({
        name: 'EventDetails',
        params: { id: this.event.id },
      });
    },
  },
};
</script>
