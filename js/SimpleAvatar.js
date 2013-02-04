define(function(){
	
	function SimpleAvatar(opts){
		this.$el = $('<div style="position:absolute;width:20px;height:20px;border-radius:12px;border:2px solid red"/>');

		this.speed =5;
		this.top = 50;
		this.left = 50;
		this.colour = '#faa';

		this.$el.css({background:this.colour,top:this.top,left:this.left});
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

		this.$el.css({background:'red'});
		setTimeout(function(){
			self.$el.css({background:self.colour});
		},100);
	};

	return SimpleAvatar;

});