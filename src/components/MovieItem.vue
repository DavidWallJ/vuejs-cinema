<template>
<div class="movie">
  <div class="movie-col-left">
    <img v-bind:src="movie.Poster">
  </div>
  <div class="movie-col-right">
    <div class="movie-title">
      <router-link v-bind:to="{ name: 'movie'}">
        <h2>{{ movie.Title }}</h2>
      </router-link>
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
import times from '../util/times';
export default {
	props: ['movie', 'sessions', 'day', 'time'],
	methods: {
		formatSessionTime(raw) {
			return this.$moment(raw).format('h:mm A');
		},
		filteredSessions(sessions) {
			return sessions.filter(this.sessionPassesTimeFilter);
		},
		sessionPassesTimeFilter(session) {
			// `day` is today passed down from root component
			// `session.time` has to be passed into $moment because it's a string
			// isSame is a `$moment` function
			if (!this.day.isSame(this.$moment(session.time), 'day')) {
				return false;
			} else if (this.time.length === 0 || this.time.length === 2) {
				// if `before 6` and `after 6` or neither
				return true;
				// at this point there can only be one MovieItem
				// either 'before 6' or `after 6` (18)
			} else if (this.time[0] === times.AFTER_6PM) {
				return this.$moment(session.time).hour() >= 18;
			} else {
				// times.BEFORE_6PM (18)
				return this.$moment(session.time).hour() < 18;
			}
		}
	}
};
</script>
