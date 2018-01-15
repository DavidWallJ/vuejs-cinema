import Vue from 'vue';
import './style.scss';

import genres from './util/genres';

new Vue({
	el: '#app',
	data: {
		genre: [],
		time: []
	},
	methods: {
		checkFilter(category, title, checked) {
			if (checked) {
				this[category].push(title);
			} else {
				// check if genre title is in array
				// if not, index will equal `-1`
				let index = this[category].indexOf(title);
				if (index > -1) {
					// remove one item from array at value assigned to `index`
					this[category].splice(index, 1);
				}
			}
		}
	},
	components: {
		'movie-list': {
			template: `<div id="movie-list">
                  <div v-for="movie in movies" class="movie">{{ movie.title}}</div>
                </div>`,
			// data must be a function that returns values for reusability purposes. A function creats a new instance of the data
			data: function() {
				return {
					movies: [
						{ title: 'Pulp Fiction' },
						{ title: 'Home Alone' },
						{ title: 'Austin Powers' }
					]
				};
			},
			props: {}
		},
		'movie-filter': {
			data() {
				return {
					genres
				};
			},
			// here we are passing down the genre value as `title` to `check-filter
			template: `<div id="movie-filter">
                  <h2>Filter Results</h2>
                  <div class="filter-group">
                    <check-filter v-for="genre in genres" v-bind:title="genre" v-on:check-filter="checkFilter"></check-filter>
                  </div>
                </div>`,
			methods: {
				checkFilter: function(category, title, checked) {
					// re emitting this event so the parent of the parent of `check-filter` (#app) gets the check-filter call
					this.$emit('check-filter', category, title, checked);
				}
			},
			components: {
				'check-filter': {
					data() {
						return {
							checked: false
						};
					},
					props: ['title'],
					template: `<div v-bind:class="{ 'check-filter': true, active: checked }" v-on:click="checkFilter" class="check-filter">
						<span class="checkbox"></span>
						<span class="check-filter-title">{{title}}</span>
          </div>`,
					methods: {
						checkFilter() {
							this.checked = !this.checked;
							//source of check-filter emitter
							//arguments: category, title, checked
							this.$emit('check-filter', 'genre', this.title, this.checked);
						}
					}
				}
			}
		}
	}
});
