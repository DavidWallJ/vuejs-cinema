import Overview from '../components/Overview.vue';
import Detail from '../components/Detail.vue';

export default [
	{ path: '/', component: Overview, name: 'home' },
	{ path: '/movie', component: Detail, name: 'movie' },
	// everything else go to the home page; redirect
	{ path: '*', redirect: { name: 'home' } }
];
