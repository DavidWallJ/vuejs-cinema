<template>
<div id="movie-filter">
  <h2>Filter Results</h2>
  <h3>By time of day</h3>
  <div class="filter-group">
    <check-filter v-for="genre in genres" v-bind:title="genre" v-on:check-filter="checkFilter" category="genre"></check-filter>
  </div>
  <h3>By genre</h3>
  <div class="filter-group">
    <check-filter v-for="time in times" v-bind:title="time" v-on:check-filter="checkFilter" category="time"></check-filter>
  </div>
</div>
</template>
<script>
import times from '../util/times';
import genres from '../util/genres';
import CheckFilter from './CheckFilter.vue';
export default {
	data() {
		return {
			genres,
			times
		};
	},
	// here we are passing down the genre value as `title` to `check-filter
	methods: {
		checkFilter: function(category, title, checked) {
			// re emitting this event so the parent of the parent of `check-filter` (#app) gets the check-filter call
			this.$emit('check-filter', category, title, checked);
		}
	},
	components: {
		CheckFilter
	}
};
</script>
