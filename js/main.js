/*
	main.js file
*/
require(['lib/DependencyLoader',
		 'gamepadSupport'],
function(DependencyLoader,
		 gamepadSupport){
	'use strict';

	new DependencyLoader({
		onLoaded: function(){

			console.log('Dependencies loaded');
			// your code here

			gamepadSupport.init();
			gamepadSupport.startPolling();

		},
		// domready: true
		// preload: true
		// dependencies: [{symbol:$.fn.scrollTo, path:'lib/jquery-scrollTo.js'}]
	}).add({
		// symbol: $.fn.scrollTo,
		// path:'lib/jquery-scrollTo.js'
	}).load();
});