define(function(){
	
	function SimpleAvatar(opts){
		this.$el = $('<div style="position:absolute;width:25px;height:27px;background:url(img/zelda.gif)"/>');

		this.speed =5;
		this.top = 50;
		this.left = 50;

		this.$el.css({top:this.top,left:this.left});
		opts.$body.append(this.$el);
	}
	SimpleAvatar.prototype.moveUp = function(){
		this.top -= this.speed;
		this.updatePosition();
	};
	SimpleAvatar.prototype.moveDown = function(){
		this.top += this.speed;
		this.updatePosition();
	};
	SimpleAvatar.prototype.moveLeft = function(){
		this.left -= this.speed;
		this.updatePosition();
	};
	SimpleAvatar.prototype.moveRight = function(){
		this.left += this.speed;
		this.updatePosition();
	};
	SimpleAvatar.prototype.updatePosition = function(){
		this.$el.css({
			top: this.top,
			left: this.left
		});
	};
	SimpleAvatar.prototype.fire = function(){
		var self = this;

		this.$el.css({backgroundColor:'red'});
		setTimeout(function(){
			self.$el.css({backgroundColor:'transparent'});
		},100);
	};

	return SimpleAvatar;

});