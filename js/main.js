/*
	main.js file
*/
require(['lib/DependencyLoader',
		 'gamepadSupport',
		 'MultiTouchJoystick'],
function(DependencyLoader,
		 gamepadSupport,
		 MultiTouchJoystick){
	'use strict';

	new DependencyLoader({
		onLoaded: function(){
			var $window = $(window);

			console.log('Dependencies loaded');
			// your code here

			gamepadSupport.init();
			gamepadSupport.startPolling();

			MultiTouchJoystick.init($window.width(),$window.height());

		},
		// domready: true
		// preload: true
		// dependencies: [{symbol:$.fn.scrollTo, path:'lib/jquery-scrollTo.js'}]
	}).add({
		// symbol: $.fn.scrollTo,
		// path:'lib/jquery-scrollTo.js'
	}).load();
});