<template>
  <div class="event-details" v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.name }} on {{ event.date }} @ {{ event.time }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<script>
import EventService from '@/services/EventService.js';

export default {
  name: 'EventDetails',

  props: {
    id: {
      type: [Number, String],
      required: true,
    },
  },

  data() {
    return {
      event: null,
    };
  },

  created() {
    EventService.getEvent(this.id)
      .then((response) => {
        this.event = response.data;
      })
      .catch((error) => {
        console.log(error, '👀');
      });
  },
};
</script>
