import Vue from 'vue';
import './style.scss';

import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

import VueResource from 'vue-resource';
Vue.use(VueResource);

import moment from 'moment-timezone';
// set default timezone
moment.tz.setDefault('UTC');
// we want to add moment to the Vue prototype so that we can use it from within any component
Object.defineProperty(Vue.prototype, '$moment', {
	get() {
		return this.$root.moment;
	}
});

new Vue({
	el: '#app',
	data: {
		genre: [],
		time: [],
		movies: [],
		moment,
		day: moment()
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
		MovieList,
		MovieFilter
	},
	created() {
		this.$http.get('/api').then(response => {
			this.movies = response.data;
		});
	}
});
