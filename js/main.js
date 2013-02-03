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

			controller.onMove(function(movement){
				if(movement.x1){
					if(movement.x1>2){
						console.log('Right');
					}else if(movement.x1<-2){
						console.log('Left');
					}
				}
				if(movement.y1){
					if(movement.y1>2){
						console.log('Down');
					}else if(movement.y1<-2){
						console.log('Up');
					}
				}
			});

			controller.onButtonPress(function(buttonPresses){
				if(buttonPresses[0]){
					console.log('Fire!');
				}
			});

		},
		domready: true
	}).load();
});