Joystix
===========

Joystix is a javascript object that proxies several different input types to provide input for games

The following APIs and libraries are used, in this order of preference, depending on support:
* GamepadAPI
* Seb Lee-Delisle's MultiTouch joystick
* Keyboard controls (arrows / WASD to move and space bar for fire)

GamepadAPI support from http://www.html5rocks.com/en/tutorials/doodles/gamepad/

MultiTouch joystick from http://seb.ly/2011/04/multi-touch-game-controller-in-javascripthtml5-for-ipad/

===========

Joystix requires (and is bundled with)
* Require.js
* Underscore.js
* jQuery

===========

See js/main.js for example usage but here's the tl;dr

```js
var controller = new Joystix({
	$window: $(window)
});

controller.onMove(function(movement){
	if(movement.x1){
		if(movement.x1 > 0){
			console.log('Right!');
		}else if(movement.x1 < 0){
			console.log('Left!');
		}
	}
	if(movement.y1){
		if(movement.y1 > 0){
			console.log('Down!');
		}else if(movement.y1 < 0){
			console.log('Up!');
		}
	}
});

controller.onButtonPress(function(buttonPresses){
	if(buttonPresses[0]){
		console.log('Fire!');
	}
});
```
