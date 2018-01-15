import Vue from 'vue';
import './style.scss';

import genres from './util/genres';

new Vue({
	el: '#app',
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
			}
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
				checkFilter: function() {
					console.log('checkfilter');
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
							this.$emit('check-filter');
						}
					}
				}
			}
		}
	}
});
