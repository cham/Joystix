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
				// Joystix accepts the following options:
				//   $window		required	jQuery object representing the window
				//   keyboardSpeed 	optional	the speed a keyboard press should send. Defaults to 5.
				controller = new Joystix({
					$window: $(window)
				});

			controller.onMove(function(movement){
				// x1,y1,x2 and y2 here refer to the four axes
				// only x1 and y1 will be present for MultiTouch and keyboard
				// and yes they are analogue, normalised on a scale of 0 to 10
				// keyboard always sends 5 - you can change this with the 'keyboardSpeed' option passed to Joystix
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
				// up to 15 buttons, but keyboard and MultiTouch only have one
				if(buttonPresses[0]){
					player.fire();
				}
			});

		},
		domready: true
	}).load();
});