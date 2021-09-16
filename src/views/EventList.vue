<template>
  <h1>Events for Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
      >
        &#60; Previous
      </router-link>

      <router-link
        id="page-next"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
      >
        Next &#62;
      </router-link>
    </div>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
import EventService from '@/services/EventService.js';

export default {
  name: 'EventList',

  components: {
    EventCard,
  },

  props: {
    page: {
      type: Number,
      default: 1,
    },
  },

  data() {
    return {
      events: null,
      totalEvents: 0,
    };
  },

  computed: {
    hasNextPage() {
      const totalPages = Math.ceil(this.totalEvents / 2);
      return this.page < totalPages;
    },
  },

  beforeRouteEnter(routeTo, routeFrom, next) {
    const page = parseInt(routeTo.query.page) || 1;
    EventService.getEvents(2, page)
      .then((response) => {
        next((comp) => {
          comp.events = response.data;
          comp.totalEvents = parseInt(response.headers['x-total-count']);
        });
      })
      .catch((error) => {
        console.error(error, '🚥');
        next({ name: 'NetworkError' });
      });
  },

  beforeRouteUpdate(routeTo) {
    const page = parseInt(routeTo.query.page) || 1;
    return EventService.getEvents(2, page)
      .then((response) => {
        this.events = response.data;
        this.totalEvents = parseInt(response.headers['x-total-count']);
        return true;
      })
      .catch((error) => {
        console.error(error, '🚥');
        return { name: 'NetworkError' };
      });
  },
};
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
