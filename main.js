document.addEventListener("DOMContentLoaded", function() {
	var imageBurn  = new burn();
	imageBurn.init();
	
	$('#makeburny').click(function(e){
		e.preventDefault();
		imageBurn.deleteArea();
	})
	
});


var burn = function()
{
	this.init = function(){
		
		this.img = {
			src:$('#burn > img').attr('src')
		}
	
		//create master canvas
		//this.masterCanvas = this.createCanvas('burnM',800,600,'#burn',false,this.img.src,false);
	
		//create BandW canvas
		this.greyscaleCanvas = this.createCanvas('burnBW',800,600,'#burn',false,this.img.src,true);
		
		//create colour canvas
		//this.colorCanvas = this.createCanvas('burnC',800,600,'#burn',false,this.img.src,false);
		
		
	}
	
	this.createCanvas = function(id,width,height,append,deleteEl,img,greyscale)
	{
		var canvas = document.createElement('canvas');
		
		canvas.height = height;
		canvas.width  = width;
		canvas.id = id + "canvas";
		
		var context = canvas.getContext('2d');
		
		//append canvas in correct place
		if(append) $(append).append(canvas);
		
		//delete old element
		if(deleteEl) $(deleteEl).remove();
		
		//draw image
		if(img){
			var imageObj = new Image();
			imageObj.onload = function(){
				context.drawImage(imageObj, 0, 0, 800, 600);
				
				if(greyscale)	grayScale(context, canvas);
			};
			imageObj.src = img;
		}
		
		
		function grayScale(context, canvas) {
			var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
				var pixels  = imgData.data;
				for (var i = 0, n = pixels.length; i < n; i += 4) {
				var grayscale = pixels[i] * .3 + pixels[i+1] * .59 + pixels[i+2] * .11;
				pixels[i  ] = grayscale;        // red
				pixels[i+1] = grayscale;        // green
				pixels[i+2] = grayscale;        // blue
				//pixels[i+3]              is alpha
			}
			//redraw the image in black & white
			context.putImageData(imgData, 0, 0);
		  }
		

		return {canvas:canvas,context:context};
	}
	
	
	this.burncontroller = new Controller(100);
	
	this.deleteArea = function(x,y)
	{
		var burnobj = {
			maxParticles:1500,
			position : Vector.create( 375, 200 ),
			positionRandom : Vector.create( 0, 0 ),
			size : 200,
			sizeRandom : 0,
			speed : 1,
			speedRandom : 50,
			lifeSpan : 50,
			lifeSpanRandom : 0,
			angle : 360,
			angleRandom : 360,
			gravity : Vector.create( 0, 0 ),
			startColour : [ 255, 255, 255, 1 ],
			startColourRandom : [ 0, 0, 0, 0 ],
			finishColour : [ 255, 255, 255, 0 ],  
			finishColourRandom : [ 0, 0, 0, 0 ],
			sharpness : 0,
			sharpnessRandom : 0,
			clearrect:false,
			increaseRandomPosition:true,
			deletearea:true,
			hasStars:false,
			fixedStartColor:'rgba(255,255,255,0)',
			fixedEndColor:'rgba(255,255,255,0)'
		}
		
		this.burncontroller.init(this.greyscaleCanvas.canvas,0,0,burnobj);
		this.animating = true;
		this.runAnimation();
	}
	this.time = 0;
	
	this.runAnimation = function()
	{
		this.time+=100;
		var _this = this;

		if(this.time >= 5000)
		{
			this.animating = false;
		}
			
		if(!this.animating)
		{	
			//$(this.offscreen.canvas).remove();
			this.burncontroller.pe.active = false;
			this.burncontroller.pe.stopParticleEmitter();
			this.burncontroller.stop = true;
			if(this.callback) this.callback.call();
		}

		/*this.masterCanvas.context.clearRect(0,0,800,600);
		this.masterCanvas.context.globalCompositeOperation = "source-over";
		this.masterCanvas.context.drawImage(this.greyscaleCanvas.canvas,0,0,800,600);*/

		
		setTimeout(function()
		{
			if(_this.animating) 
			{
				_this.runAnimation();
			}
		},50);
	}
	
}



window.requestAnimFrame = (function(callback){
	return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(callback){
		window.setTimeout(callback, 1000 / 60);
	};
})();