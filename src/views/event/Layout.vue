<template>
  <div v-if="GlobalStore.event">
    <h1>{{ GlobalStore.event.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'EventDetails' }">Details</router-link>
      |
      <router-link :to="{ name: 'EventRegister' }">Register</router-link>
      |
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </div>
    <router-view :event="GlobalStore.event" />
  </div>
</template>

<script>
export default {
  name: 'EventLayout',

  inject: ['GlobalStore'],
};
</script>
