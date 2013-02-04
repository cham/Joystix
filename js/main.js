/*
	main.js file
*/
require(['lib/DependencyLoader',
		 'Joystix',
		 'SimpleAvatar'],
function(DependencyLoader,
		 Joystix,
		 SimpleAvatar){
	'use strict';

	new DependencyLoader({
		onLoaded: function(){

			// example Joystix code
			// SimpleAvatar is just a div on the screen that moves around when you tell it to
			var player = new SimpleAvatar({
					$body: $('body')
				}),
				controller = new Joystix({
					$window: $(window)
				});

			controller.onMove(function(movement){
				if(movement.x1){
					if(movement.x1>0){
						player.moveRight();
					}else if(movement.x1<0){
						player.moveLeft();
					}
				}
				if(movement.y1){
					if(movement.y1>0){
						player.moveDown();
					}else if(movement.y1<0){
						player.moveUp();
					}
				}
			});

			controller.onButtonPress(function(buttonPresses){
				if(buttonPresses[0]){
					player.fire();
				}
			});

		},
		domready: true
	}).load();
});