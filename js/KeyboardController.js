define(function(){
	
	var KEYMAP = {
			'UP': [38,87],
			'DOWN': [40,83],
			'LEFT': [37,65],
			'RIGHT': [39,68],
			'FIRE': [32]
		},
		MOVEMENT = {
			'UP': false,
			'DOWN': false,
			'LEFT': false,
			'RIGHT': false
		},
		BUTTON_PRESSED = false;

	return {

		init: function($window){
			this.$window = $window;
			
			this.bind();
		},

		bind: function(){
			this.$window.bind('keydown',function(e){
				var kcode = e.which;
				if(_(KEYMAP.UP).indexOf(kcode)>-1){
					MOVEMENT.UP = true;
				}
				if(_(KEYMAP.DOWN).indexOf(kcode)>-1){
					MOVEMENT.DOWN = true;
				}
				if(_(KEYMAP.LEFT).indexOf(kcode)>-1){
					MOVEMENT.LEFT = true;
				}
				if(_(KEYMAP.RIGHT).indexOf(kcode)>-1){
					MOVEMENT.RIGHT = true;
				}
				if(_(KEYMAP.FIRE).indexOf(kcode)>-1){
					BUTTON_PRESSED = true;
				}
			}).bind('keyup',function(e){
				var kcode = e.which;
				if(_(KEYMAP.UP).indexOf(kcode)>-1){
					MOVEMENT.UP = false;
				}
				if(_(KEYMAP.DOWN).indexOf(kcode)>-1){
					MOVEMENT.DOWN = false;
				}
				if(_(KEYMAP.LEFT).indexOf(kcode)>-1){
					MOVEMENT.LEFT = false;
				}
				if(_(KEYMAP.RIGHT).indexOf(kcode)>-1){
					MOVEMENT.RIGHT = false;
				}
				if(_(KEYMAP.FIRE).indexOf(kcode)>-1){
					BUTTON_PRESSED = false;
				}
			});
		},

		getMovement: function(){
			return MOVEMENT;
		},

		getButtonPress: function(){
			return BUTTON_PRESSED;
		}

	};

});