define(function(){
	'use strict';

	var gamepadSupport = {
	    TYPICAL_BUTTON_COUNT: 16,
	    TYPICAL_AXIS_COUNT: 4,
	    ticking: false,
	    gamepads: [],
	    prevRawGamepadTypes: [],
	    prevTimestamps: [],
		buttonPresses: [],
		movedAxes: [],
		normaliseAxisTo: 10,
		axisDeadZone: 4,
	    init: function () {
	        var gamepadSupportAvailable = !! navigator.webkitGetGamepads || !! navigator.webkitGamepads || (navigator.userAgent.indexOf('Firefox/') != -1);
	        if (!gamepadSupportAvailable) {
	            // tester.showNotSupported();
	        } else {
	            window.addEventListener('MozGamepadConnected', gamepadSupport.onGamepadConnect, false);
	            window.addEventListener('MozGamepadDisconnected', gamepadSupport.onGamepadDisconnect, false);
	            if ( !! navigator.webkitGamepads || !! navigator.webkitGetGamepads) {
	                gamepadSupport.startPolling();
	            }
	        }
	    },
	    onGamepadConnect: function (event) {
	        gamepadSupport.gamepads.push(event.gamepad);
	        // tester.updateGamepads(gamepadSupport.gamepads);
	        gamepadSupport.startPolling();
	    },
	    onGamepadDisconnect: function (event) {
	        for (var i in gamepadSupport.gamepads) {
	            if (gamepadSupport.gamepads[i].index == event.gamepad.index) {
	                gamepadSupport.gamepads.splice(i, 1);
	                break;
	            }
	        }
	        if (gamepadSupport.gamepads.length == 0) {
	            gamepadSupport.stopPolling();
	        }
	        // tester.updateGamepads(gamepadSupport.gamepads);
	    },
	    startPolling: function () {
	        if (!gamepadSupport.ticking) {
	            gamepadSupport.ticking = true;
	            gamepadSupport.tick();
	        }
	    },
	    stopPolling: function () {
	        gamepadSupport.ticking = false;
	    },
	    tick: function () {
	        gamepadSupport.pollStatus();
	        gamepadSupport.scheduleNextTick();
	    },
	    scheduleNextTick: function () {
	        if (gamepadSupport.ticking) {
	            if (window.requestAnimationFrame) {
	                window.requestAnimationFrame(gamepadSupport.tick);
	            } else if (window.mozRequestAnimationFrame) {
	                window.mozRequestAnimationFrame(gamepadSupport.tick);
	            } else if (window.webkitRequestAnimationFrame) {
	                window.webkitRequestAnimationFrame(gamepadSupport.tick);
	            }
	        }
	    },
	    pollStatus: function () {
	        gamepadSupport.pollGamepads();
	        for (var i in gamepadSupport.gamepads) {
	            var gamepad = gamepadSupport.gamepads[i];
	            if (gamepad.timestamp && (gamepad.timestamp == gamepadSupport.prevTimestamps[i])) {
	                continue;
	            }
	            gamepadSupport.prevTimestamps[i] = gamepad.timestamp;
	            gamepadSupport.updateStatus(i);
	        }
	    },
	    pollGamepads: function () {
	        var rawGamepads = (navigator.webkitGetGamepads && navigator.webkitGetGamepads()) || navigator.webkitGamepads;
	        if (rawGamepads) {
	            gamepadSupport.gamepads = [];
	            var gamepadsChanged = false;
	            for (var i = 0; i < rawGamepads.length; i++) {
	                if (typeof rawGamepads[i] != gamepadSupport.prevRawGamepadTypes[i]) {
	                    gamepadsChanged = true;
	                    gamepadSupport.prevRawGamepadTypes[i] = typeof rawGamepads[i];
	                }
	                if (rawGamepads[i]) {
	                    gamepadSupport.gamepads.push(rawGamepads[i]);
	                }
	            }
	            if (gamepadsChanged) {
	            	// console.log('Gamepads changed',gamepadSupport.gamepads);
	            }
	        }
	    },
	    normaliseAxis: function(pad, axisId){
	    	var normalised = Math.floor(pad.axes[axisId] * this.normaliseAxisTo);
	    	if(Math.abs(normalised)<this.axisDeadZone){ return 0; }
	    	return normalised;
	    },
	    updateStatus: function (gamepadId) {
	        var gamepad = gamepadSupport.gamepads[gamepadId],
	        	count;

	        this.buttonPresses = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
	        this.movedAxes = [0,0,0,0];

	        count = 16;
	        while(count--){
	        	this.buttonPresses[count] = !!gamepad.buttons[count];
	        }
	        count = 4;
	        while(count--){
	        	this.movedAxes[count] = (this.normaliseAxis(gamepad,count));
	        }
	    },
	    getStatus: function(){
	    	return {
	    		buttonPresses: this.buttonPresses,
	    		movedAxes: this.movedAxes
	    	};
	    }
	};

	return gamepadSupport;

});