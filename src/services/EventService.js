import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://my-json-server.typicode.com/ilexwg/real-world-vue3-demo',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  getEvents() {
    return apiClient.get('/events');
  },
};
