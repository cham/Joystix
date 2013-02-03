define(['gamepadSupport',
		'MultiTouchJoystick'],
function(gamepadSupport,
		 MultiTouchJoystick){
	'use strict';

	function Joystix(opts){
		this.$window = opts.$window;
		this.moveCb = function(){};
		this.buttonCb = function(){};

		gamepadSupport.init();
		gamepadSupport.startPolling();

		MultiTouchJoystick.init(this.$window.width(), this.$window.height());

		this.poll();
	}

	Joystix.prototype.onMove = function(cb){
		this.moveCb = cb;
	};

	Joystix.prototype.onButtonPress = function(cb){
		this.buttonCb = cb;
	};

	Joystix.prototype.poll = function(){
		var self = this;
		function loop(){
			var status;
			if(gamepadSupport.gamepads.length){
				status = gamepadSupport.getStatus();
			}else{
				status = MultiTouchJoystick.getMovementIntent();
			}
			console.log(status);
			window.requestAnimationFrame(loop);
		}
		loop();
	};

	return Joystix;

});