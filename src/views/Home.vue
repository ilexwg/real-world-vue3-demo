<template>
  <div class="home">
    <EventCard />
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';

export default {
  name: 'Home',

  components: {
    EventCard,
  },
};
</script>
