<template>
<div class="movie">
  <div class="movie-col-left">
    <img v-bind:src="movie.Poster">
  </div>
  <div class="movie-col-right">
    <div class="movie-title">
      <h2>{{ movie.Title }}</h2>
      <span class="movie-rating">{{ movie.Rated }}</span>
    </div>
    <div class="movie-sessions">
      <div v-for="session in filteredSessions(sessions)" class="session-time-wrapper">
        <div class="session-time">{{ formatSessionTime(session.time) }}</div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  props: ['movie', 'sessions', 'day'],
  methods: {
    formatSessionTime(raw) {
      return this.$moment(raw).format('h:mm A');
    },
    filteredSessions(sessions) {
      return sessions.filter(session => {
        // `isSame` is a moment function
        // pass in the time string and check if it contains the same day as our `day`
        // which is the current day passed down from the root component
        return this.$moment(session.time).isSame(this.day, 'day');
      });
    }
  }
};
</script>
