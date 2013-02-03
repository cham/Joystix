/*
	main.js file
*/
require(['lib/DependencyLoader',
		 'Joystix'],
function(DependencyLoader,
		 Joystix){
	'use strict';

	new DependencyLoader({
		onLoaded: function(){

			var controller = new Joystix({
				$window: $(window)
			});

			controller.onMove(function(x,y){
				console.log('Move',x,y);
			});

		},
		domready: true
	}).load();
});