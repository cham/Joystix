/**
* JSTouchController by Seb Lee Delisle
*/
define(['Vector2'],
function(Vector2){
	'use strict';

	return {

		cw: -1,
		ch: -1,
		canvas: null,
		context: null,
		container: null,
		mouseX: -1,
		mouseY: -1, 
		touchable: true,//'createTouch' in document,
		touches: [], // array of touch vectors
		halfWidth: -1,
		halfHeight: -1,
		leftTouchID: -1, 
		leftTouchPos: new Vector2(0,0),
		leftTouchStartPos: new Vector2(0,0),
		rightTouchId: -1,
		leftVector: new Vector2(0,0),

		init: function init(w,h){
			var self = this;
			this.cw = w;
			this.ch = h;
			function onTouchStart(e){
				for(var i = 0; i<e.changedTouches.length; i++){
					var touch = e.changedTouches[i];
					if((self.leftTouchID<0) && (touch.clientX<self.halfWidth)){
						self.leftTouchID = touch.identifier; 
						self.leftTouchStartPos.reset(touch.clientX, touch.clientY); 	
						self.leftTouchPos.copyFrom(self.leftTouchStartPos); 
						self.leftVector.reset(0,0);
						continue;
					} else {
						self.rightTouchId = touch.identifier;
					}	
				}
				self.touches = e.touches;
			}
			function onTouchMove(e) {
				 // Prevent the browser from doing its default thing (scroll, zoom)
				e.preventDefault();
				for(var i = 0; i<e.changedTouches.length; i++){
					var touch =e.changedTouches[i]; 
					if(self.leftTouchID === touch.identifier){
						self.leftTouchPos.reset(touch.clientX, touch.clientY); 
						self.leftVector.copyFrom(self.leftTouchPos); 
						self.leftVector.minusEq(self.leftTouchStartPos); 	
						break;
					}
				}
				self.touches = e.touches; 
			} 
			function onTouchEnd(e) { 
			   	self.touches = e.touches; 

				for(var i = 0; i<e.changedTouches.length; i++){
					var touch = e.changedTouches[i]; 
					if(self.leftTouchID === touch.identifier){
						self.leftTouchID = -1; 
						self.leftVector.reset(0,0); 
						break; 		
					}else if(self.rightTouchId === touch.identifier){
						self.rightTouchId = -1;
					}
				}
			}

			if(!this.touchable) {
				return;
			}

			this.setupCanvas(w,h);

			this.canvas.addEventListener( 'touchstart', onTouchStart, false );
			this.canvas.addEventListener( 'touchmove', onTouchMove, false );
			this.canvas.addEventListener( 'touchend', onTouchEnd, false );
			window.onorientationchange = this.resetCanvas;  
			window.onresize = this.resetCanvas

			setInterval(function draw() {

				self.context.clearRect(0,0,self.canvas.width, self.canvas.height); 
				
				if(self.touchable && self.touches && self.touches.length) {
					for(var i=0; i<self.touches.length; i++){
						var touch = self.touches[i]; 
						if(touch.identifier === self.leftTouchID){
							self.context.beginPath(); 
							self.context.strokeStyle = "cyan"; 
							self.context.lineWidth = 6; 
							self.context.arc(self.leftTouchStartPos.x, self.leftTouchStartPos.y, 40,0,Math.PI*2,true); 
							self.context.stroke();
							self.context.beginPath(); 
							self.context.strokeStyle = "cyan"; 
							self.context.lineWidth = 2; 
							self.context.arc(self.leftTouchStartPos.x, self.leftTouchStartPos.y, 60,0,Math.PI*2,true); 
							self.context.stroke();
							self.context.beginPath(); 
							self.context.strokeStyle = "cyan"; 
							self.context.arc(self.leftTouchPos.x, self.leftTouchPos.y, 40, 0,Math.PI*2, true); 
							self.context.stroke(); 
						} else {
							self.context.beginPath(); 
							self.context.fillStyle = "white";
							self.context.fillText("touch id : "+touch.identifier+" x:"+touch.clientX+" y:"+touch.clientY, touch.clientX+30, touch.clientY-30); 

							self.context.beginPath(); 
							self.context.strokeStyle = "red";
							self.context.lineWidth = "6";
							self.context.arc(touch.clientX, touch.clientY, 40, 0, Math.PI*2, true); 
							self.context.stroke();
						}
					}
				}

			}, 1000/35); 
		},

		resetCanvas: function resetCanvas(e) {  
		 	// resize the canvas - but remember - this clears the canvas too. 
		  	this.canvas.width = this.cw; 
			this.canvas.height = this.ch;
			
			this.halfWidth = this.canvas.width/2; 
			this.halfHeight = this.canvas.height/2;
		},

		setupCanvas: function setupCanvas(w,h) {
			this.canvas = document.createElement( 'canvas' );
			this.canvas.style.position = 'absolute';
			this.context = this.canvas.getContext( '2d' );
			this.container = document.createElement( 'div' );
			this.container.className = "container";

			this.canvas.width = w; 
			this.canvas.height = h; 
			this.halfWidth = this.canvas.width/2; 
			this.halfHeight = this.canvas.height/2;
			document.body.appendChild(this.container);
			this.container.appendChild(this.canvas);	
			
			this.context.strokeStyle = "#ffffff";
			this.context.lineWidth =2;	
		},

		getMovementIntent: function getMovementIntent(){
			var distFact = 7,
				maxSpeed = 10,
				moveX = Math.ceil(this.leftVector.x / distFact),
				moveY = Math.ceil(this.leftVector.y / distFact);

			return {
				x:  moveX < -maxSpeed ? -maxSpeed : moveX > maxSpeed ? maxSpeed : moveX,
				y:  moveY < -maxSpeed ? -maxSpeed : moveY > maxSpeed ? maxSpeed : moveY
			};
		},

		getButtonPress: function getButtonPress(){
			return this.rightTouchId !== -1;
		}

	};
});