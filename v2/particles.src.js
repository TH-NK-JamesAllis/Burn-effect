var Controller = function(time)
{
	this.time = time;
	this.canvas = null;
	this.context = null,
	this.w = null;
	this.h = null;
	this.blendMode = 1;
	this.blendModes = [ "source-over", "lighter", "darker", "xor" ];
	
	this.init = function(canvas,w,h,obj){
		this.canvas = canvas;
		this.context = this.canvas.getContext( "2d" );
		this.setBlendMode( this.blendMode );
		
		this.w = w;
		this.h = h;
		
		this.pe = new cParticleEmitter(obj);		
		this.pe.init();

		// Run!
		this.stop = false;
		this.main();
	}
	
	this.stop = false;
	
	this.main = function(){
		var _this = this;
		this.update();
		this.draw();
		
		setTimeout( function(){ if(!_this.stop) _this.main(); }, this.time );
	}
	
	this.update = function(){
		this.pe.update(1);						
	}
	
	this.draw = function(){
		this.context.clearRect( 0, 0, this.w, this.h );
		this.pe.renderParticles( this.context );	 
	}
	
	this.setBlendMode = function( mode ){
		this.blendMode = mode;
		this.context.globalCompositeOperation = this.blendModes[ mode >= 0 && mode < this.blendModes.length ? mode : 0 ];
	}
}

