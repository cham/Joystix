define(['lib/Modernizr.2.6.2-touch',
		'gamepadSupport',
		'MultiTouchJoystick',
		'KeyboardController',
		'lib/requestAnimationFrame'],
function(Modernizr,
		 gamepadSupport,
		 MultiTouchJoystick,
		 KeyboardController){
	'use strict';

	function Joystix(opts){
		this.$window = opts.$window;

		this.moveCb = function(){};
		this.buttonCb = function(){};

		this.numButtons = 15;
		this.keyboardSpeed = opts.keyboardSpeed || 5;

		gamepadSupport.init();
		gamepadSupport.startPolling();

		MultiTouchJoystick.init(this.$window.width(), this.$window.height());

		KeyboardController.init(this.$window);

		this.poll();
	}

	Joystix.prototype.onMove = function(cb){
		this.moveCb = cb;
	};

	Joystix.prototype.onButtonPress = function(cb){
		this.buttonCb = cb;
	};

	Joystix.prototype.getMovementForGamepad = function(axesStatus){
		return {
			x1: axesStatus[0],
			y1: axesStatus[1],
			x2: axesStatus[2],
			y2: axesStatus[3]
		};
	};

	Joystix.prototype.getMovementForMultiTouch = function(xy){
		return {
			x1: xy.x,
			y1: xy.y,
			x2: 0,
			y2: 0
		};
	};

	Joystix.prototype.getMovementForKeyboard = function(movementStatus){
		var x = movementStatus.RIGHT ? this.keyboardSpeed : (movementStatus.LEFT ? -this.keyboardSpeed : 0),
			y = movementStatus.DOWN ? this.keyboardSpeed : (movementStatus.UP ? -this.keyboardSpeed : 0);

		return {
			x1: x,
			y1: y,
			x2: 0,
			y2: 0
		};
	};

	Joystix.prototype.getButtonPressForMultiTouch = function(isPressed){
		var buttonArray = [];
		_(this.numButtons).times(function(){
			buttonArray.push(false);
		});
		buttonArray[0] = isPressed;
		return buttonArray;
	};

	Joystix.prototype.getButtonsForKeyboard = function(isPressed){
		var buttonArray = [];
		_(this.numButtons).times(function(){
			buttonArray.push(false);
		});
		buttonArray[0] = isPressed;
		return buttonArray;
	};

	Joystix.prototype.poll = function(){
		var self = this;

		function loop(){
			var status;
			if(gamepadSupport.gamepads.length){
				status = gamepadSupport.getStatus();
				self.moveCb(self.getMovementForGamepad(status.movedAxes));
				self.buttonCb(status.buttonPresses);
			}else if(Modernizr && Modernizr.touch){
				self.moveCb(self.getMovementForMultiTouch(MultiTouchJoystick.getMovementIntent()));
				self.buttonCb(self.getButtonPressForMultiTouch(MultiTouchJoystick.getButtonPress()));
			}else{
				self.moveCb(self.getMovementForKeyboard(KeyboardController.getMovement()));
				self.buttonCb(self.getButtonsForKeyboard(KeyboardController.getButtonPress()));
			}
			window.requestAnimationFrame(loop);
		}
		loop();
	};

	return Joystix;

});