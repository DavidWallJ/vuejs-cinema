

<template>
<div id="movie-list">
  <!-- if there is a list of filtered movies show them -->
  <div v-if="filteredMovies.length">
    <movie-item v-for="movie in filteredMovies" v-bind:movie="movie.movie" v-bind:sessions="movie.sessions" v-bind:day="day"></movie-item>
  </div>
  <!-- no `filteredMovies`, yet `movies` do exist -->
  <div v-else-if="movies.length" class="no-results">
    No results.
  </div>
  <!-- no `filteredMovies` and no `movies` -->
  <div v-else>
    Loading...
  </div>
</div>
</template>

<script>
import genres from '../util/genres';
import times from '../util/times';
import MovieItem from './MovieItem.vue';

export default {
	// data must be a function that returns values for reusability purposes. A function creats a new instance of the data
	props: ['genre', 'time', 'movies', 'day'],
	methods: {
		movieGenreFilter(movie) {
			// if no genres are clicked return all movies
			if (!this.genre.length) {
				return true;
			} else {
				let movieGenres = movie.movie.Genre.split(', ');
				let matched = true;
				this.genre.forEach(genre => {
					if (movieGenres.indexOf(genre) === -1) {
						matched = false;
					}
				});
				return matched;
			}
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
	},
	computed: {
		filteredMovies() {
			return this.movies
				.filter(this.movieGenreFilter)
				.filter(movie => movie.sessions.find(this.sessionPassesTimeFilter));
		}
	},
	components: {
		MovieItem
	}
};
</script>
