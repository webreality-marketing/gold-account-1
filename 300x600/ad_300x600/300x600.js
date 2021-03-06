(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.primary_cta = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgfAAQABgQAHgJQAJgLAPABQAPgBAIAKQAIAHgBAOIgBAMIgqAAQABAJAFADQAFAEAIgBQALAAALgEIgCAOQgKAEgLABQglAAAAglgAANgFQAAgRgMAAQgMAAgCARIAaAAIAAAAg");
	this.shape.setTransform(110.65,18.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgTAkIAAhFIAQAAIABAKQAFgMAKAAIAHABQAAAJgBAHIgIgBQgIAAgEAEIAAAzg");
	this.shape_1.setTransform(104.9,18.225);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgYAbQgJgJAAgSQAAgQAJgKQAJgJAPAAQAQAAAJAJQAJAKAAAQQAAARgJAKQgJAKgQAAQgPAAgJgKgAgOAAQAAAWAOAAQAPAAAAgWQAAgVgPAAQgOAAAAAVg");
	this.shape_2.setTransform(98.125,18.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAhAkIAAgqQAAgOgMAAQgHAAgFAFIAAAFIAAAuIgRAAIAAgqQAAgOgLAAQgHAAgGAFIAAAzIgSAAIAAhFIAQAAIACALQAGgNANAAQAPAAAFANQAHgNAOAAQAXAAAAAZIAAAug");
	this.shape_3.setTransform(88.425,18.225);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgSAXIAAhCQAIgCAKAAIAAAVIATAAIgCAPIgRAAIAAAeQAAALAIAAQAFAAAFgCIgCAOQgGACgHABQgVAAAAgYg");
	this.shape_4.setTransform(76.975,17.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgYAdQgFgGAAgMIAAguIASAAIAAArQAAAOALAAQAGAAAGgGIAAgzIASAAIAABFIgRAAIgBgLQgGANgMAAQgMAAgGgHg");
	this.shape_5.setTransform(70.425,18.375);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgYAbQgJgJAAgSQAAgQAJgKQAJgJAPAAQAQAAAJAJQAJAKAAAQQAAARgJAKQgJAKgQAAQgPAAgJgKgAgOAAQAAAWAOAAQAPAAAAgWQAAgVgPAAQgOAAAAAVg");
	this.shape_6.setTransform(62.775,18.3);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgWAqQgJgJABgSQgBgkAkAAIAJAAIAAgaQAJgCAJAAIAABiIgRAAIgBgJQgGAKgLABQgMAAgHgJgAgMAPQAAAWAOgBQAHAAAFgEIAAgnIgKAAQgQAAAAAWg");
	this.shape_7.setTransform(51.65,16.9);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAMAkIAAgqQAAgOgMAAQgFAAgGAFIAAAzIgSAAIAAhFIAQAAIACALQAGgNAMAAQAMAAAFAHQAGAGAAAMIAAAug");
	this.shape_8.setTransform(44.225,18.225);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgIAzIAAhFIARAAIAABFgAgGggQgEgDAAgFQAAgEAEgDQADgDADAAQAEAAADADQADADABAEQgBAFgDADQgDADgEAAQgDAAgDgDg");
	this.shape_9.setTransform(38.6,16.675);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgbAwIAAhgIA3AAQAAAIgBAIIgkAAIAAAZIAiAAQAAAHgCAIIggAAIAAAog");
	this.shape_10.setTransform(33.625,16.95);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#EC0000").ss(1,1,1).p("AolipIRLAAQBHAAAxAyQAyAyAABFQAABGgyAyQgxAyhHAAIxLAAQhHAAgygyQgxgyAAhGQAAhFAxgyQAygyBHAAg");
	this.shape_11.setTransform(72,17);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#EC0000").s().p("AolCqQhHAAgygyQgxgyAAhGQAAhFAxgyQAygyBHAAIRLAAQBGAAAyAyQAyAyAABFQAABGgyAyQgyAyhGAAg");
	this.shape_12.setTransform(72,17);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#EC0000").s().p("AgUAbQgIgKAAgRQAAgPAHgKQAIgKAOAAQAPAAAHAIQAHAIgBAPIAAAIIgtAAQACAWAUAAQALAAAKgFIgCALQgJAEgKAAQgRAAgJgJgAARgFQAAgUgQAAQgPAAgCAUIAhAAIAAAAg");
	this.shape_13.setTransform(109.5,18.325);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#EC0000").s().p("AgSAjIAAhEIAMAAIAAAKQAGgMALAAIAIABIgBALIgJAAQgJgBgGAHIAAA0g");
	this.shape_14.setTransform(104.025,18.25);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#EC0000").s().p("AgXAbQgIgKAAgRQAAgQAIgKQAJgJAOAAQAPAAAIAJQAJAKAAAQQAAARgJAKQgIAJgPAAQgOAAgJgJgAgSAAQAAAaASAAQATAAAAgaQAAgZgTAAQgSAAAAAZg");
	this.shape_15.setTransform(97.425,18.325);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#EC0000").s().p("AAlAjIAAgqQAAgRgPgBQgJAAgHAIIAAAHIAAAtIgLAAIAAgqQAAgRgPgBQgJAAgHAIIAAA0IgMAAIAAhEIALAAIABALQAHgNAOAAQAPAAAEANQAIgNAPAAQALAAAFAHQAGAGAAAMIAAAtg");
	this.shape_16.setTransform(87.825,18.25);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#EC0000").s().p("AgQAYIAAhDQAFgCAHAAIAAAVIAVAAIgBAKIgUAAIAAAlQAAANAKAAQAGAAAFgDIgCAKQgGADgGAAQgTAAAAgWg");
	this.shape_17.setTransform(76.775,17.35);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#EC0000").s().p("AgVAdQgGgGABgMIAAguIAMAAIAAArQgBASAPAAQAIAAAHgIIAAg1IANAAIAABFIgMAAIAAgKQgIALgMABQgLgBgGgGg");
	this.shape_18.setTransform(70.3,18.4);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#EC0000").s().p("AgXAbQgIgKAAgRQAAgQAIgKQAJgJAOAAQAPAAAIAJQAJAKAAAQQAAARgJAKQgIAJgPAAQgOAAgJgJgAgSAAQAAAaASAAQATAAAAgaQAAgZgTAAQgSAAAAAZg");
	this.shape_19.setTransform(62.875,18.325);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#EC0000").s().p("AgVApQgHgJAAgSQAAgjAhgBIAMABIAAgbQAFgBAHAAIAABhIgLAAIgBgJQgGALgLAAQgNAAgIgJgAgQAOQAAAaASAAQAJAAAGgGIAAgsQgFgCgHAAQgVAAAAAag");
	this.shape_20.setTransform(52.225,16.95);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#EC0000").s().p("AAPAjIAAgqQAAgRgOgBQgJAAgHAIIAAA0IgMAAIAAhEIALAAIABALQAHgNANAAQALAAAGAHQAGAGAAAMIAAAtg");
	this.shape_21.setTransform(44.975,18.25);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#EC0000").s().p("AgFAyIAAhFIALAAIAABFgAgEgjQgCgDAAgDQAAgEACgCQACgCACAAQADAAACACQACACAAAEQAAADgCADQgCACgDAAQgCAAgCgCg");
	this.shape_22.setTransform(39.5,16.825);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#EC0000").s().p("AgZAwIAAhgIAzAAIgBAMIgmAAIAAAfIAkAAIgBAKIgjAAIAAArg");
	this.shape_23.setTransform(34.825,16.95);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgUAbQgIgKAAgRQAAgPAHgKQAIgKAOAAQAPAAAHAIQAHAIgBAPIAAAIIgtAAQACAWAUAAQALAAAKgFIgCALQgJAEgKAAQgRAAgJgJgAARgFQAAgUgQAAQgPAAgCAUIAhAAIAAAAg");
	this.shape_24.setTransform(109.5,18.325);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgSAjIAAhEIAMAAIAAAKQAGgMALAAIAIABIgBALIgJAAQgJgBgGAHIAAA0g");
	this.shape_25.setTransform(104.025,18.25);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgXAbQgIgKAAgRQAAgQAIgKQAJgJAOAAQAPAAAIAJQAJAKAAAQQAAARgJAKQgIAJgPAAQgOAAgJgJgAgSAAQAAAaASAAQATAAAAgaQAAgZgTAAQgSAAAAAZg");
	this.shape_26.setTransform(97.425,18.325);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AAlAjIAAgqQAAgRgPgBQgJAAgHAIIAAAHIAAAtIgLAAIAAgqQAAgRgPgBQgJAAgHAIIAAA0IgMAAIAAhEIALAAIABALQAHgNAOAAQAPAAAEANQAIgNAPAAQALAAAFAHQAGAGAAAMIAAAtg");
	this.shape_27.setTransform(87.825,18.25);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgQAYIAAhDQAFgCAHAAIAAAVIAVAAIgBAKIgUAAIAAAlQAAANAKAAQAGAAAFgDIgCAKQgGADgGAAQgTAAAAgWg");
	this.shape_28.setTransform(76.775,17.35);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgVAdQgGgGABgMIAAguIAMAAIAAArQgBASAPAAQAIAAAHgIIAAg1IANAAIAABFIgMAAIAAgKQgIALgMABQgLgBgGgGg");
	this.shape_29.setTransform(70.3,18.4);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgXAbQgIgKAAgRQAAgQAIgKQAJgJAOAAQAPAAAIAJQAJAKAAAQQAAARgJAKQgIAJgPAAQgOAAgJgJgAgSAAQAAAaASAAQATAAAAgaQAAgZgTAAQgSAAAAAZg");
	this.shape_30.setTransform(62.875,18.325);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgVApQgHgJAAgSQAAgjAhgBIAMABIAAgbQAFgBAHAAIAABhIgLAAIgBgJQgGALgLAAQgNAAgIgJgAgQAOQAAAaASAAQAJAAAGgGIAAgsQgFgCgHAAQgVAAAAAag");
	this.shape_31.setTransform(52.225,16.95);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AAPAjIAAgqQAAgRgOgBQgJAAgHAIIAAA0IgMAAIAAhEIALAAIABALQAHgNANAAQALAAAGAHQAGAGAAAMIAAAtg");
	this.shape_32.setTransform(44.975,18.25);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgFAyIAAhFIALAAIAABFgAgEgjQgCgDAAgDQAAgEACgCQACgCACAAQADAAACACQACACAAAEQAAADgCADQgCACgDAAQgCAAgCgCg");
	this.shape_33.setTransform(39.5,16.825);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgZAwIAAhgIAzAAIgBAMIgmAAIAAAfIAkAAIgBAKIgjAAIAAArg");
	this.shape_34.setTransform(34.825,16.95);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgXAgIACgKQAIAEALAAQAOAAAAgJQAAgEgDgDQgCgCgGgCIgGgCQgSgFAAgPQAAgJAHgFQAGgFALAAQAMAAAJADIgCAKQgJgDgJAAQgNAAAAAJQAAAHALAEIAGACQASAFAAAOQAAAJgGAGQgIAFgLAAQgOAAgIgEg");
	this.shape_35.setTransform(101.375,18.325);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgMAfIAAhPQAFgBAHAAIAABPQAAAKAHAAQAEAAACgCIgBAKQgEACgFAAQgPAAAAgTg");
	this.shape_36.setTransform(96.725,16.95);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgFAyIAAhFIALAAIAABFgAgFgjQgCgDAAgDQAAgEACgCQADgCACAAQAEAAACACQACACAAAEQAAADgCADQgCACgEAAQgCAAgDgCg");
	this.shape_37.setTransform(92.75,16.825);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgUAfQgGgGAAgKQAAgLAIgFQAJgHAVgBIADAAIAAgDQAAgHgDgDQgEgDgIAAQgLAAgLAFIABgKQAKgFANAAQAZAAAAAXIAAAvIgLAAIAAgKQgHALgNAAQgKAAgGgFgAgJAEQgFAEAAAHQAAAFADADQADAEAGAAQALAAAGgJIAAgSIgCAAQgQAAgGAEg");
	this.shape_38.setTransform(87.425,18.325);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgUAbQgJgKAAgRQAAgPAIgKQAIgKAPAAQANAAAIAIQAGAIABAPIgBAIIgtAAQACAWAUAAQAMAAAKgFIgCALQgKAEgLAAQgQAAgJgJgAASgFQAAgUgRAAQgPAAgCAUIAiAAIAAAAg");
	this.shape_39.setTransform(75.8,18.325);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgMAfIAAhPQAFgBAHAAIAABPQAAAKAHAAQAEAAACgCIgBAKQgEACgFAAQgPAAAAgTg");
	this.shape_40.setTransform(60.275,16.95);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgMAfIAAhPQAFgBAHAAIAABPQAAAKAHAAQAEAAACgCQAAAFgBAFQgEACgFAAQgPAAAAgTg");
	this.shape_41.setTransform(56.375,16.95);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgVAdQgGgGABgMIAAguIALAAIAAArQABASAOAAQAIAAAIgIIAAg1IAMAAIAABFIgLAAIgBgKQgHALgNABQgLgBgGgGg");
	this.shape_42.setTransform(50.25,18.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_11},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13}]},1).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_34,p:{x:34.825}},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31,p:{x:52.225}},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28,p:{x:76.775}},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24}]},1).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_34,p:{x:43.475}},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_31,p:{x:68.375}},{t:this.shape_39},{t:this.shape_28,p:{x:82.025}},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35}]},1).wait(1));

	// Layer_2
	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#33FF00").s().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	this.shape_43.setTransform(71.05,-234.95);
	this.shape_43._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_43).wait(3).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-78.9,-534.9,300,600);


(lib.mc_level3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#666666").s().p("AgHAHQgDgDAAgEQAAgDADgEQAEgDADAAQAFAAADADQADADAAAEQAAAEgDADQgDAEgFAAQgDAAgEgEg");
	this.shape.setTransform(298.675,21.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#666666").s().p("AgeApQAAgHACgGQALAGAOAAQASAAAAgMQAAgGgDgDQgDgDgIgDIgHgCQgYgGAAgUQAAgLAIgHQAJgHAPAAQAOAAAMAEIgCANQgMgEgLAAQgSAAAAAMQAAAKAPAEIAIADQAXAGAAASQAAAMgJAHQgJAIgPAAQgRAAgLgGg");
	this.shape_1.setTransform(292.525,17.925);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#666666").s().p("AgXAuIAAhZIAOAAIABANQAIgOAOAAIAKABIgBANIgLgBQgMAAgIAJIAABEg");
	this.shape_2.setTransform(286,17.85);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#666666").s().p("AgaAoQgIgHAAgNQAAgPALgHQAMgIAbgCIAEAAIAAgDQAAgKgFgEQgEgEgLAAQgPAAgOAHIABgNQANgHARAAQAhAAAAAeIAAA9IgOAAIgBgNQgIAPgSAAQgMAAgIgHgAAQAAQgUAAgIAFQgHAFAAAJQAAAHAEAEQAFAEAHAAQAOAAAJgLIAAgYg");
	this.shape_3.setTransform(277.525,17.925);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#666666").s().p("AgQAoIAAhlQAGgDAJABIAABmQAAANAKAAQAFAAADgCQAAAGgCAHQgFABgGAAQgUAAAAgYg");
	this.shape_4.setTransform(271.225,16.15);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#666666").s().p("AgQAoIAAhlQAGgDAJABIAABmQAAANAKAAQAFAAADgCQAAAGgCAHQgFABgGAAQgUAAAAgYg");
	this.shape_5.setTransform(266.225,16.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#666666").s().p("AgdAiQgLgMAAgWQAAgVALgMQAKgNATAAQATAAALANQALAMAAAVQAAAWgLAMQgLANgTAAQgSAAgLgNgAgYAAQAAAiAYAAQAZAAAAgiQAAghgZAAQgYAAAAAhg");
	this.shape_6.setTransform(258.475,17.925);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#666666").s().p("AgbA2QgKgNAAgWQAAgvArAAIAQABIAAgiQAHgDAJABIAAB+IgPAAIgBgMQgIAOgPgBQgQABgKgLgAgVASQAAAiAYAAQALAAAIgJIAAg4QgHgCgJAAQgbAAAAAhg");
	this.shape_7.setTransform(248.625,16.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#666666").s().p("AgmA5QABgHABgGQAPAIARAAQAMAAAHgGQAHgFABgKQAAgJgHgFQgEgFgMgFIgJgEQgcgKgBgYQAAgPALgJQALgJATAAQASAAANAGQAAAHgCAHQgNgGgPAAQgZAAAAATQAAAJAGAFQAEAFALAEIAJADQAeAKAAAZQAAAQgLAJQgMAKgUAAQgVAAgNgIg");
	this.shape_8.setTransform(235.7,16.15);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#666666").s().p("AggA1QgMgMAAgUIAAhSQAIgCAIAAIAABUQAAAOAIAIQAHAHANAAQAeAAAAgeIAAhRQAHgCAIAAIAABUQAAAUgMAMQgMALgVAAQgUAAgMgLg");
	this.shape_9.setTransform(225.275,16.225);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#666666").s().p("AgXAuIAAhZIAOAAIABANQAIgOAOAAIAKABIgBANIgLgBQgMAAgIAJIAABEg");
	this.shape_10.setTransform(213.1,17.85);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#666666").s().p("AgdAiQgLgMAAgWQAAgVALgMQAKgNATAAQATAAALANQALAMAAAVQAAAWgLAMQgLANgTAAQgSAAgLgNgAgYAAQAAAiAYAAQAZAAAAgiQAAghgZAAQgYAAAAAhg");
	this.shape_11.setTransform(204.575,17.925);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#666666").s().p("AgdAiQgLgMAAgWQAAgVALgMQAKgNATAAQATAAALANQALAMAAAVQAAAWgLAMQgLANgTAAQgSAAgLgNgAgYAAQAAAiAYAAQAZAAAAgiQAAghgZAAQgYAAAAAhg");
	this.shape_12.setTransform(191.175,17.925);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#666666").s().p("AgXAuIAAhZIAOAAIABANQAIgOAOAAIAKABIgBANIgLgBQgMAAgIAJIAABEg");
	this.shape_13.setTransform(183.85,17.85);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#666666").s().p("AgbAmQgIgIAAgPIAAg8IAQAAIAAA3QAAAXATAAQALAAAJgKIAAhEIAQAAIAABZIgPAAIgBgOQgJAQgRAAQgOAAgHgIg");
	this.shape_14.setTransform(175.225,18.025);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#666666").s().p("AgiA+IAAh7IBFAAIgBAOIg1AAIAAAoIAwAAIgCANIguAAIAAAqIA2AAIgBAOg");
	this.shape_15.setTransform(166.125,16.175);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#666666").s().p("AgJAWQADgSABgXQAGgDAJAAQgCAegIAOg");
	this.shape_16.setTransform(154.75,22.8);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#666666").s().p("AgdA8IABgOQAMAHAMAAQAagBAAgaIAAgLQgIANgPgBQgQABgKgLQgKgNAAgWQAAgvArAAQASAAAOAFIAABVQAAApgqAAQgOAAgLgGgAgVgSQAAAhAYAAQALAAAIgIIAAg5QgHgCgJAAQgbAAAAAig");
	this.shape_17.setTransform(147.525,19.85);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#666666").s().p("AAUAuIAAg3QAAgXgTAAQgLAAgJAKIAABEIgQAAIAAhZIAPAAIABAOQAJgQARAAQAOAAAHAJQAIAIAAAOIAAA8g");
	this.shape_18.setTransform(138.225,17.825);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#666666").s().p("AgHBAIAAhZIAPAAIAABZgAgGguQgDgDAAgEQAAgFADgDQADgCADAAQAEAAADACQADADAAAFQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape_19.setTransform(131.175,16);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#666666").s().p("AgQAoIAAhlQAGgDAJABIAABmQAAANAKAAQAFAAADgCQAAAGgCAHQgFABgGAAQgUAAAAgYg");
	this.shape_20.setTransform(127.025,16.15);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#666666").s().p("AgXAuIAAhZIAOAAIACANQAHgOAOAAIAKABIgBANIgLgBQgMAAgHAJIAABEg");
	this.shape_21.setTransform(121.5,17.85);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#666666").s().p("AgaAiQgLgMAAgWQAAgUAKgMQAKgOATAAQASAAAJAMQAJAKAAASIAAAMIg7AAQADAcAaAAQAPAAAMgHIgCAOQgNAGgNAAQgWAAgLgNgAAWgGQABgbgWAAQgTAAgDAbIArAAIAAAAg");
	this.shape_22.setTransform(113.15,17.925);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#666666").s().p("AgVAfIAAhWQAHgDAJAAIAAAaIAbAAIgCAOIgZAAIAAAvQAAARANAAQAHAAAGgDIgBANQgIADgIAAQgZAAAAgcg");
	this.shape_23.setTransform(105.975,16.7);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#666666").s().p("AgmA5QABgHABgGQAPAIARAAQAMAAAHgGQAHgFABgKQAAgJgHgFQgEgFgMgFIgJgEQgcgKgBgYQAAgPALgJQALgJATAAQASAAANAGQAAAHgCAHQgNgGgPAAQgZAAAAATQAAAJAGAFQADAFAMAEIAJADQAeAKAAAZQAAAQgLAJQgMAKgUAAQgVAAgNgIg");
	this.shape_24.setTransform(98,16.15);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#666666").s().p("AAUAuIAAg3QAAgXgTAAQgLAAgJAKIAABEIgQAAIAAhZIAPAAIABAOQAJgQARAAQAOAAAHAJQAIAIAAAOIAAA8g");
	this.shape_25.setTransform(84.725,17.825);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#666666").s().p("AgHBAIAAhZIAPAAIAABZgAgGguQgDgDAAgEQAAgFADgDQADgCADAAQAEAAADACQADADAAAFQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape_26.setTransform(77.675,16);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#666666").s().p("AgaAiQgLgMAAgWQAAgUAKgMQAKgOATAAQASAAAJAMQAJAKAAASIgBAMIg6AAQADAcAaAAQAPAAAMgHIgCAOQgNAGgNAAQgWAAgLgNgAAXgGQgBgbgVAAQgUAAgCAbIAsAAIAAAAg");
	this.shape_27.setTransform(67.1,17.925);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#666666").s().p("AgQAoIAAhlQAGgDAJABIAABmQAAANAKAAQAFAAADgCQAAAGgCAHQgFABgGAAQgUAAAAgYg");
	this.shape_28.setTransform(60.575,16.15);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#666666").s().p("AglA8IAAh5QAHgDAJABIAAAwQAIgNAPAAQAQAAAKALQAJANABAVQAAAwgrgBQgSAAgOgEgAgVgHIAAA5QAHACAJAAQAbAAAAgiQAAghgYAAQgLAAgIAIg");
	this.shape_29.setTransform(53.1,16.15);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#666666").s().p("AgaAoQgIgHAAgNQAAgPALgHQAMgIAbgCIAEAAIAAgDQAAgKgFgEQgEgEgLAAQgPAAgOAHIABgNQANgHARAAQAhAAAAAeIAAA9IgOAAIgBgNQgIAPgSAAQgMAAgIgHgAAQAAQgUAAgIAFQgHAFAAAJQAAAHAEAEQAFAEAHAAQAOAAAJgLIAAgYg");
	this.shape_30.setTransform(43.275,17.925);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#666666").s().p("AgQAoIAAhlQAGgDAJABIAABmQAAANAKAAQAFAAADgCQAAAGgCAHQgFABgGAAQgUAAAAgYg");
	this.shape_31.setTransform(36.975,16.15);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#666666").s().p("AgHBAIAAhZIAPAAIAABZgAgGguQgDgDAAgEQAAgFADgDQADgCADAAQAEAAADACQADADAAAFQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape_32.setTransform(31.875,16);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#666666").s().p("AgaAoQgIgHAAgNQAAgPALgHQAMgIAbgCIAEAAIAAgDQAAgKgFgEQgEgEgLAAQgPAAgOAHIABgNQANgHARAAQAhAAAAAeIAAA9IgOAAIgBgNQgIAPgSAAQgMAAgIgHgAAQAAQgUAAgIAFQgHAFAAAJQAAAHAEAEQAFAEAHAAQAOAAAJgLIAAgYg");
	this.shape_33.setTransform(25.025,17.925);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#666666").s().p("AgHAtIghhZIARAAIAXBKIAZhKIAQAAIgiBZg");
	this.shape_34.setTransform(16.575,17.925);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#666666").s().p("AAhA/IgJggIgwAAIgJAgIgQAAIAnh6QAJgDAKAAIApB9gAAUARIgUg/IgUA/IAoAAg");
	this.shape_35.setTransform(7.2,16.125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_level3, new cjs.Rectangle(0,0,303.2,30), null);


(lib.mc_level2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgIAJQgDgEAAgFQAAgEADgEQAEgDAEAAQAFAAAEADQADAEAAAEQAAAFgDAEQgEADgFAAQgEAAgEgDg");
	this.shape.setTransform(232.425,71.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AghBDIACgPQANAGAOAAQAcAAAAgdIAAgNQgIAPgRAAQgSAAgLgNQgLgNAAgZQAAg0AwAAQAUAAAPAFIAABeQAAAuguAAQgQAAgNgGgAgXgUQAAAkAaAAQAMAAAJgJIAAg/QgHgCgKAAQgeAAAAAmg");
	this.shape_1.setTransform(224.225,69.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AAWAzIAAg9QABgagWAAQgMAAgLALIAABMIgRAAIAAhiIAQAAIABAPQALgSASAAQAQAAAIAJQAJAJAAAQIAABDg");
	this.shape_2.setTransform(213.85,67.425);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgIBHIAAhiIARAAIAABigAgHgzQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDADgFAAQgEAAgDgDg");
	this.shape_3.setTransform(206.05,65.375);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AAUBHIgog0IAAgCIAkgsIAVAAIgmAtIApA1gAgoBHIAAiKQAIgDAJABIAACMg");
	this.shape_4.setTransform(199.45,65.45);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AAXAzIAAg9QAAgagWAAQgMAAgKALIAABMIgSAAIAAhiIARAAIABAPQAKgSASAAQAQAAAIAJQAJAJAAAQIAABDg");
	this.shape_5.setTransform(188.55,67.425);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgdAsQgJgIAAgOQAAgRAMgHQANgJAfgDIAEAAIAAgEQAAgKgFgFQgFgEgLAAQgRAAgQAIQAAgIABgHQAOgHAUAAQAkAAAAAhIAABEIgQAAIgBgPQgJARgTAAQgPAAgIgIgAgOAGQgHAFAAAKQAAAHAFAGQAEAEAJAAQAPAAAKgMIAAgbIgDAAQgXABgKAGg");
	this.shape_6.setTransform(177.85,67.55);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgpBCIAAiGQAIgDAJAAIAAA3QAJgPARAAQASAAALAMQALAOAAAYQAAA1gwAAQgTAAgQgGgAgYgHIAAA+QAIACAKAAQAeAAAAgmQAAgkgaAAQgMAAgKAKg");
	this.shape_7.setTransform(168.075,65.575);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AglBHIABgPIAGABQAJAAAGgFQAGgFAEgOIgphoIATAAIAdBSIAbhSIASAAIgoBvQgKAggZAAQgFAAgEgBg");
	this.shape_8.setTransform(153.275,69.8);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgdAsQgJgIAAgOQAAgRAMgHQANgJAfgDIAEAAIAAgEQAAgKgFgFQgFgEgLAAQgRAAgQAIQAAgIABgHQAOgHAUAAQAkAAAAAhIAABEIgQAAIgBgPQgJARgTAAQgPAAgIgIgAgNAGQgIAFAAAKQAAAHAFAGQAEAEAJAAQAQAAAJgMIAAgbIgDAAQgXABgJAGg");
	this.shape_9.setTransform(143.2,67.55);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgeA7QgLgNAAgaQAAgzAwAAIASABIAAgmQAHgDAKAAIAACMIgQAAIgBgNQgJAQgRAAQgSAAgLgNgAgXAUQAAAlAaAAQAMAAAKgJIAAg/QgIgCgKAAQgeAAAAAlg");
	this.shape_10.setTransform(132.775,65.575);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AglBHIABgPIAGABQAJAAAGgFQAGgFAEgOIgphoIATAAIAdBSIAbhSIASAAIgoBvQgKAggZAAQgFAAgEgBg");
	this.shape_11.setTransform(122.925,69.8);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgaAzIAAhiIAQAAIABAOQAJgRAPAAQAGAAAGACQAAAJgCAGIgMgBQgNAAgJAKIAABLg");
	this.shape_12.setTransform(115.275,67.425);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgdAmQgMgNAAgZQAAgXAKgNQAMgPAVAAQAUAAAKANQAKALAAAUIgBANIhAAAQACAgAdgBQARABAOgJIgDAQQgOAHgPAAQgYAAgMgOgAAZgHQAAgegYAAQgWAAgCAeIAwAAIAAAAg");
	this.shape_13.setTransform(106.025,67.55);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgHAyIglhiIASAAIAaBRIAchRIARAAIglBig");
	this.shape_14.setTransform(96.325,67.55);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgdAmQgMgNAAgZQAAgXAKgNQAMgPAVAAQAUAAAKANQAKALAAAUIgBANIhAAAQACAgAdgBQARABAOgJIgDAQQgOAHgPAAQgYAAgMgOgAAZgHQAAgegYAAQgWAAgCAeIAwAAIAAAAg");
	this.shape_15.setTransform(86.575,67.55);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgaAzIAAhiIAQAAIABAOQAJgRAPAAQAGAAAGACQAAAJgCAGIgMgBQgNAAgJAKIAABLg");
	this.shape_16.setTransform(74.425,67.425);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AgfApQgIgJAAgQIAAhCIASAAIAAA9QAAAZAVAAQAMAAAKgLIAAhLIASAAIAABiIgRAAIgBgPQgKASgSAAQgQAAgJgKg");
	this.shape_17.setTransform(64.8,67.675);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AghAmQgLgOAAgYQAAgYALgNQAMgOAVAAQAVAAAMAOQAMANAAAYQAAAYgMAOQgMAOgVAAQgVAAgMgOgAgbAAQAAAlAbAAQAbAAAAglQAAglgbAAQgbAAAAAlg");
	this.shape_18.setTransform(54.175,67.55);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AglBHIABgPIAGABQAJAAAGgFQAGgFAEgOIgphoIATAAIAdBSIAbhSIASAAIgoBvQgKAggZAAQgFAAgEgBg");
	this.shape_19.setTransform(44.025,69.8);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AghAmQgLgOAAgYQAAgYALgNQAMgOAVAAQAVAAAMAOQAMANAAAYQAAAYgMAOQgMAOgVAAQgVAAgMgOgAgbAAQAAAlAbAAQAbAAAAglQAAglgbAAQgbAAAAAlg");
	this.shape_20.setTransform(29.625,67.55);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AgXAjIAAhhQAIgDAJAAIAAAeIAeAAIgBAOIgdAAIAAA2QAAASAPAAQAIAAAHgEIgCAPQgJAEgIAAQgcAAAAgfg");
	this.shape_21.setTransform(21.3,66.175);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AAWAzIAAg9QABgagWAAQgMAAgLALIAABMIgRAAIAAhiIARAAIAAAPQALgSASAAQAQAAAJAJQAIAJAAAQIAABDg");
	this.shape_22.setTransform(12.15,67.425);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AgHBHIAAhiIAQAAIAABigAgHgzQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDADgFAAQgEAAgDgDg");
	this.shape_23.setTransform(4.35,65.375);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AglBGIABgOIAGABQAJAAAGgFQAGgGAEgOIgphnIATAAIAdBSIAbhSIASAAIgoBvQgKAggZAAQgFAAgEgCg");
	this.shape_24.setTransform(204.625,45.9);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AgXAjIAAhhQAIgDAJAAIAAAeIAeAAIgBAOIgdAAIAAA2QAAASAPAAQAIAAAHgEIgCAPQgJAEgIAAQgcAAAAgfg");
	this.shape_25.setTransform(196.8,42.275);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AgHBHIAAhiIAQAAIAABigAgHgzQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDADgFAAQgEAAgDgDg");
	this.shape_26.setTransform(190.65,41.475);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AgSAtIAAhxQAIgDAJAAIAAByQAAAOALAAQAGAAADgCQAAAHgCAHQgFADgIAAQgWAAAAgbg");
	this.shape_27.setTransform(186.05,41.675);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AgHBHIAAhiIAQAAIAABigAgHgzQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDADgFAAQgEAAgDgDg");
	this.shape_28.setTransform(180.4,41.475);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AgpBCIAAiGQAIgDAJAAIAAA3QAJgPARAAQASAAALAMQALAOAAAYQAAA1gwAAQgTAAgQgGgAgYgHIAAA+QAIACAKAAQAeAAAAgmQAAgkgaAAQgMAAgKAKg");
	this.shape_29.setTransform(173.025,41.675);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AgHBHIAAhiIAQAAIAABigAgHgzQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDADgFAAQgEAAgDgDg");
	this.shape_30.setTransform(165,41.475);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AAYAxIgYgkIgYAkIgTAAIAjgwIgjgxIAUAAIAXAkIAZgkIATAAIgjAwIAjAxg");
	this.shape_31.setTransform(158.025,43.65);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AgdAmQgMgOAAgYQAAgWAKgOQAMgPAVAAQAUAAAKAMQAKAMAAAVIgBAMIhAAAQACAgAdAAQARgBAOgHIgDAPQgOAHgPAAQgYAAgMgOgAAZgHQAAgegYAAQgWAAgCAeIAwAAIAAAAg");
	this.shape_32.setTransform(148.325,43.65);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AgSAtIAAhxQAIgDAJAAIAAByQAAAOALAAQAGAAADgCQAAAHgCAHQgFADgIAAQgWAAAAgbg");
	this.shape_33.setTransform(141.05,41.675);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AgZBHIAAhrQAAgiAiAAQAKAAAHACIgBAPQgIgCgHAAQgKAAgEAFQgEAEAAALIAAAIIAgAAIgBAOIgfAAIAABUg");
	this.shape_34.setTransform(135.175,41.525);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AglBGIABgOIAGABQAJAAAGgFQAGgGAEgOIgphnIATAAIAdBSIAbhSIASAAIgoBvQgKAggZAAQgFAAgEgCg");
	this.shape_35.setTransform(121.925,45.9);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AgVAnQgNgOAAgZQAAgZANgOQAMgMAWAAQANAAAJAEQAAAHgCAHQgJgEgKAAQgOABgIAJQgIAKAAASQgBARAJAKQAIAKANAAQANgBAJgFIgDAQQgIAEgMAAQgVAAgMgNg");
	this.shape_36.setTransform(112.8,43.65);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AAWAzIAAg9QABgagWAAQgMAAgLALIAABMIgRAAIAAhiIAQAAIABAPQALgSASAAQAQAAAIAJQAJAJgBAQIAABDg");
	this.shape_37.setTransform(103.15,43.525);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AgdAmQgMgOAAgYQAAgWAKgOQAMgPAVAAQAUAAAKAMQAKAMAAAVIgBAMIhAAAQACAgAdAAQARgBAOgHIgDAPQgOAHgPAAQgYAAgMgOgAAZgHQAAgegYAAQgWAAgCAeIAwAAIAAAAg");
	this.shape_38.setTransform(92.625,43.65);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AgaAzIAAhiIAQAAIABAOQAJgRAPAAQAGAAAGACQAAAJgCAGIgMgBQgNAAgJAKIAABLg");
	this.shape_39.setTransform(84.775,43.525);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AgaAzIAAhiIAQAAIABAOQAJgRAPAAQAGAAAGACQAAAJgCAGIgMgBQgNAAgJAKIAABLg");
	this.shape_40.setTransform(77.775,43.525);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AgfApQgHgJgBgQIAAhCIASAAIAAA9QAAAZAVAAQAMAAAKgLIAAhLIARAAIAABiIgQAAIgBgPQgKASgSAAQgQAAgJgKg");
	this.shape_41.setTransform(68.15,43.775);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AgVAnQgNgOAAgZQAAgZANgOQAMgMAWAAQAMAAAKAEQAAAHgCAHQgJgEgKAAQgOABgIAJQgJAKABASQAAARAHAKQAJAKANAAQAMgBAKgFIgDAQQgIAEgMAAQgVAAgMgNg");
	this.shape_42.setTransform(58.5,43.65);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AgcAHIACgNIA3AAIgCANg");
	this.shape_43.setTransform(50.5,42.65);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AgIBHIAAhiIAQAAIAABigAgGgzQgEgDAAgFQAAgFAEgDQADgDADAAQAFAAADADQADADAAAFQAAAFgDADQgDADgFAAQgDAAgDgDg");
	this.shape_44.setTransform(44.45,41.475);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AgXAjIAAhhQAHgDAKAAIAAAeIAeAAIgCAOIgcAAIAAA2QAAASAPAAQAIAAAHgEIgCAPQgIAEgJAAQgcAAAAgfg");
	this.shape_45.setTransform(39.1,42.275);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AgSAtIAAhxQAIgDAJAAIAAByQAAAOALAAQAGAAADgCQAAAHgCAHQgFADgIAAQgWAAAAgbg");
	this.shape_46.setTransform(33.05,41.675);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AgfApQgIgJAAgQIAAhCIASAAIAAA9QAAAZAVAAQAMAAAKgLIAAhLIASAAIAABiIgRAAIgBgPQgKASgSAAQgQAAgJgKg");
	this.shape_47.setTransform(24.3,43.775);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AA1AzIAAg9QAAgagVAAQgNAAgLALIABAJIAABDIgQAAIAAg9QAAgagWAAQgNAAgKALIAABMIgRAAIAAhiIAQAAIABAPQAKgSAUAAQAWAAAGASQAMgSAUAAQAQAAAIAJQAIAJAAAQIAABDg");
	this.shape_48.setTransform(10.525,43.525);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AgiAtQAAgHADgIQAMAIAPgBQAVAAAAgNQAAgGgEgDQgDgEgJgDIgIgCQgagIAAgVQAAgNAJgHQAJgIARAAQAQAAANAFQgBAHgCAGQgMgEgNAAQgTAAAAANQAAALAQAFIAJADQAaAIAAATQAAANgKAJQgKAIgSAAQgTAAgMgHg");
	this.shape_49.setTransform(202.175,19.75);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AghBDIACgPQANAGAOAAQAcAAAAgdIAAgNQgIAPgRAAQgSAAgLgNQgLgNAAgZQAAg0AwAAQAUAAAPAFIAABeQAAAuguAAQgQAAgNgGgAgXgUQAAAkAaAAQAMAAAJgJIAAg/QgHgCgKAAQgeAAAAAmg");
	this.shape_50.setTransform(192.075,21.875);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AAXAzIAAg9QAAgagWAAQgMAAgKALIAABMIgRAAIAAhiIAQAAIABAPQAKgSASAAQAQAAAJAJQAHAJABAQIAABDg");
	this.shape_51.setTransform(181.7,19.625);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AgHBHIAAhiIAQAAIAABigAgGgzQgEgDAAgFQAAgFAEgDQADgDADAAQAFAAADADQADADAAAFQAAAFgDADQgDADgFAAQgDAAgDgDg");
	this.shape_52.setTransform(173.9,17.575);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AgaAzIAAhiIAQAAIABAOQAJgRAPAAQAGAAAGACQAAAJgCAGIgMgBQgNAAgJAKIAABLg");
	this.shape_53.setTransform(168.725,19.625);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AgpBCIAAiGQAIgDAJAAIAAA3QAJgPARAAQASAAALAMQALAOAAAYQAAA1gwAAQgTAAgQgGgAgYgHIAAA+QAIACAKAAQAeAAAAgmQAAgkgaAAQgMAAgKAKg");
	this.shape_54.setTransform(159.525,17.775);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AgXAjIAAhhQAHgDAKAAIAAAeIAeAAIgCAOIgcAAIAAA2QAAASAPAAQAIAAAHgEIgCAPQgIAEgJAAQgcAAAAgfg");
	this.shape_55.setTransform(146.55,18.375);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AAXAzIAAg9QgBgagVAAQgMAAgKALIAABMIgRAAIAAhiIAQAAIABAPQAJgSATAAQAQAAAJAJQAHAJABAQIAABDg");
	this.shape_56.setTransform(137.4,19.625);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AgeApQgIgJAAgQIAAhCIARAAIAAA9QAAAZAVAAQAMAAALgLIAAhLIAQAAIAABiIgPAAIgBgPQgKASgUAAQgPAAgIgKg");
	this.shape_57.setTransform(126.5,19.875);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AghAmQgLgOAAgYQAAgXALgOQAMgOAVAAQAVAAAMAOQAMAOAAAXQAAAYgMAOQgMAOgVAAQgVAAgMgOgAgbAAQAAAlAbAAQAbAAAAglQAAglgbAAQgbAAAAAlg");
	this.shape_58.setTransform(115.875,19.75);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AgVAnQgNgOAAgZQAAgZANgNQAMgNAWAAQANAAAJAEQAAAHgCAHQgJgEgKABQgOgBgIALQgJAKAAAQQAAASAIAKQAJAJAOAAQALAAAKgEIgCAOQgJAFgMAAQgVAAgMgNg");
	this.shape_59.setTransform(106.25,19.75);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("AgVAnQgNgOAAgZQAAgZANgNQAMgNAWAAQAMAAAKAEQAAAHgCAHQgJgEgKABQgOgBgIALQgJAKABAQQAAASAHAKQAJAJANAAQAMAAAKgEIgDAOQgIAFgMAAQgVAAgMgNg");
	this.shape_60.setTransform(97.65,19.75);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AAlBGIgKgjIg1AAIgLAjIgRAAIAsiIQAJgDAMAAIAtCLgAAWATIgWhGIgWBGIAsAAg");
	this.shape_61.setTransform(87.6,17.725);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AgeA7QgLgNAAgaQAAgzAwAAIASABIAAgmQAHgDAKAAIAACMIgQAAIgBgNQgJAQgRAAQgSAAgLgNgAgXAUQAAAlAaAAQAMAAAKgJIAAg/QgIgCgKAAQgeAAAAAlg");
	this.shape_62.setTransform(71.875,17.775);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AgSAtIAAhxQAHgDAKAAIAAByQAAAOALAAQAFAAAEgCQAAAHgCAHQgGADgGAAQgXAAAAgbg");
	this.shape_63.setTransform(64.6,17.775);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("AghAmQgLgOAAgYQAAgXALgOQAMgOAVAAQAVAAAMAOQAMAOAAAXQAAAYgMAOQgMAOgVAAQgVAAgMgOgAgbAAQAAAlAbAAQAbAAAAglQAAglgbAAQgbAAAAAlg");
	this.shape_64.setTransform(56.025,19.75);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("AgjA0QgQgTAAghQAAgiARgSQASgTAgAAQAUAAAQAGQgBAIgDAIQgQgGgRAAQgWAAgNAOQgNAOAAAbQAAAbANAPQAMAOAWAAQALAAAJgCIAAg4IASAAIAABDQgRAHgWAAQgeAAgSgUg");
	this.shape_65.setTransform(44.05,17.775);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AgaAzIAAhiIAQAAIABAOQAJgRAPAAQAGAAAGACQAAAJgCAGIgMgBQgNAAgJAKIAABLg");
	this.shape_66.setTransform(30.775,19.625);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AgeApQgJgJAAgQIAAhCIASAAIAAA9QAAAZAVAAQAMAAAKgLIAAhLIASAAIAABiIgRAAIgBgPQgKASgSAAQgQAAgIgKg");
	this.shape_67.setTransform(21.15,19.875);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000000").s().p("AgsA0QgPgTAAghQAAggAQgTQAQgUAbAAQAdAAAQAUQAPATAAAgQAAAigQATQgQATgcAAQgcAAgQgUgAgegpQgLAPAAAaQAAAbALAPQALAOATAAQAqAAAAg4QAAgagLgPQgLgOgUAAQgTAAgLAOg");
	this.shape_68.setTransform(8.925,17.775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_level2, new cjs.Rectangle(0,0,241.5,80.7), null);


(lib.mc_level1_animated = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_379 = function() {
		if (!this.looped) this.looped = 1;
		if (this.looped++ == 1) this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(379).call(this.frame_379).wait(1));

	// u
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EC0000").s().p("AhTAiIAAiOIAlAAIAACJQAAAaALAMQANAMAbAAQATAAAXgFIAAi2IAlAAIAADMQgsANgkAAQhXAAAAhLg");
	this.shape.setTransform(223.425,134.425);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(28).to({_off:false},0).wait(352));

	// o
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EC0000").s().p("AhGBSQgZgdAAg1QAAgzAZgeQAZgeAtAAQAuAAAaAeQAYAeAAAzQAAA1gZAdQgZAeguAAQgtAAgZgegAg5AAQAABRA5AAQA7AAAAhRQAAhQg7AAQg5AAAABQg");
	this.shape_1.setTransform(201.575,134.175);
	this.shape_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(27).to({_off:false},0).wait(353));

	// y
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EC0000").s().p("AhPCYQAAgTACgMIANACQATAAAMgLQAMgMAJgeIhWjgIAnAAIA/CzIA5izIAmAAIhUDxQgXBEg0AAQgKAAgJgDg");
	this.shape_2.setTransform(180.875,139);
	this.shape_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(26).to({_off:false},0).wait(354));

	// s
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EC0000").s().p("AhIBhQAAgPAFgQQAaAPAgAAQAtAAAAgdQAAgNgJgHQgHgHgTgHIgQgHQgcgKgMgMQgQgQAAgZQAAgcAUgPQAUgQAkAAQAiAAAbAKQgCARgDANQgcgJgaAAQgqAAAAAbQAAAWAjAOIASAHQAdAKAMAMQAOAPAAAWQAAAcgVARQgVASgnAAQgmAAgagPg");
	this.shape_3.setTransform(153.975,134.175);
	this.shape_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(25).to({_off:false},0).wait(355));

	// t
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#EC0000").s().p("AgyBMIAAjSQAQgGAVAAIAABAIBAAAIgDAfIg9AAIAAB1QAAAmAgAAQARAAAPgIIgFAgQgPAHgUAAQg9AAAAhBg");
	this.shape_4.setTransform(138.75,131.225);
	this.shape_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(24).to({_off:false},0).wait(356));

	// i
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#EC0000").s().p("AgRCZIAAjVIAjAAIAADVgAgQhuQgHgIAAgKQAAgLAHgGQAGgHAKAAQAKAAAHAHQAHAGAAALQAAALgHAGQgHAHgKAAQgKAAgGgGg");
	this.shape_5.setTransform(126.5,129.55);
	this.shape_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(23).to({_off:false},0).wait(357));

	// u
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#EC0000").s().p("AhTAiIAAiOIAlAAIAACJQAAAaALAMQANAMAbAAQATAAAXgFIAAi2IAlAAIAADMQgsANgkAAQhXAAAAhLg");
	this.shape_6.setTransform(110.775,134.425);
	this.shape_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(22).to({_off:false},0).wait(358));

	// s
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#EC0000").s().p("AhIBhQAAgPAFgQQAaAPAgAAQAtAAAAgdQAAgNgJgHQgHgHgTgHIgQgHQgcgKgMgMQgQgQAAgZQAAgcAUgPQAUgQAkAAQAiAAAbAKQgCARgDANQgcgJgaAAQgqAAAAAbQAAAWAjAOIASAHQAdAKAMAMQAOAPAAAWQAAAcgVARQgVASgnAAQgmAAgagPg");
	this.shape_7.setTransform(91.175,134.175);
	this.shape_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(21).to({_off:false},0).wait(359));

	// t
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#EC0000").s().p("AgyBMIAAjSQAPgGAWAAIAABAIBAAAIgDAfIg9AAIAAB1QAAAmAgAAQARAAAPgIIgFAgQgPAHgUAAQg9AAAAhBg");
	this.shape_8.setTransform(67.55,131.225);
	this.shape_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(20).to({_off:false},0).wait(360));

	// a
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#EC0000").s().p("Ag/BVQgYgcAAg4QAAhwBmAAQAoAAAgAMIAADOIghAAIgDgdQgSAiglAAQgnAAgUgbgAgxAAQABBRA1AAQAbAAASgUIAAiJQgRgEgTAAQg/AAAABQg");
	this.shape_9.setTransform(48.35,134.175);
	this.shape_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(19).to({_off:false},0).wait(361));

	// h
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#EC0000").s().p("AAvCXIAAiJQAAgxgxAAQgWAAgWAJIAACxIglAAIAAkoQAPgGAWABIAABfQAYgKAYAAQBSAAAABKIAACOg");
	this.shape_10.setTransform(27.2,129.7);
	this.shape_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(18).to({_off:false},0).wait(362));

	// t
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#EC0000").s().p("AgyBMIAAjSQAPgGAWAAIAABAIBAAAIgDAfIg9AAIAAB1QAAAmAgAAQARAAAOgIIgEAgQgPAHgUAAQg9AAAAhBg");
	this.shape_11.setTransform(9.65,131.225);
	this.shape_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(17).to({_off:false},0).wait(363));

	// y
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#EC0000").s().p("AhPCYQAAgTACgLIANABQATAAAMgLQAMgMAJgeIhWjgIAnAAIA/CzIA5izIAmAAIhUDxQgXBEg0AAQgKAAgJgDg");
	this.shape_12.setTransform(206.825,91.95);
	this.shape_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(16).to({_off:false},0).wait(364));

	// c
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#EC0000").s().p("AguBUQgbgdAAg3QAAg0AZgdQAageAxAAQAdAAASAJQAAAOgDAQQgTgHgYAAQg/AAAABQQAAAmARAVQARAVAeAAQAZAAAUgLQgBARgEAPQgRAKgbAAQgsAAgbgcg");
	this.shape_13.setTransform(188.325,87.125);
	this.shape_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(15).to({_off:false},0).wait(365));

	// n
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#EC0000").s().p("AAvBtIAAiJQAAgagLgMQgNgMgbAAQgUAAgWAGIAAC1IglAAIAAjMQArgNAlAAQBXAAAABLIAACOg");
	this.shape_14.setTransform(168.7,86.875);
	this.shape_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(14).to({_off:false},0).wait(366));

	// e
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#EC0000").s().p("Ag/BSQgagdAAg2QAAgxAXgdQAYggAtAAQAsAAAWAbQAVAZAAAsIgCAbIiLAAQAGBFBAAAQAiAAAegRQgCAUgEANQgYAPgmAAQg0AAgagegAA0gRQgBg/gxAAQguAAgGA/IBmAAIAAAAg");
	this.shape_15.setTransform(146.75,87.125);
	this.shape_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_15).wait(13).to({_off:false},0).wait(367));

	// r
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#EC0000").s().p("Ag4BtIAAjNQAhgMAkAAQAaAAASAEQAAAUgEAMQgPgEgYAAQgPAAgSAEIAAC1g");
	this.shape_16.setTransform(130.175,86.925);
	this.shape_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(12).to({_off:false},0).wait(368));

	// r
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#EC0000").s().p("Ag4BtIAAjNQAhgMAkAAQAaAAASAEQAAAUgEAMQgPgEgYAAQgPAAgSAEIAAC1g");
	this.shape_17.setTransform(115.475,86.925);
	this.shape_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_17).wait(11).to({_off:false},0).wait(369));

	// u
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#EC0000").s().p("AhTAiIAAiOIAlAAIAACJQAAAaALAMQANAMAbAAQATAAAXgFIAAi2IAlAAIAADMQgsANgkAAQhXAAAAhLg");
	this.shape_18.setTransform(95.925,87.375);
	this.shape_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_18).wait(10).to({_off:false},0).wait(370));

	// c
	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#EC0000").s().p("AguBUQgbgdAAg3QAAg0AZgdQAageAxAAQAdAAASAJQAAAOgDAQQgTgHgYAAQg/AAAABQQAAAmARAVQARAVAeAAQAZAAAUgLQgBARgEAPQgRAKgbAAQgsAAgbgcg");
	this.shape_19.setTransform(76.325,87.125);
	this.shape_19._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_19).wait(9).to({_off:false},0).wait(371));

	// e
	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#EC0000").s().p("Ag/BSQgagdAAg2QAAgxAXgdQAYggAuAAQArAAAWAbQAVAZAAAsIgCAbIiKAAQAFBFBAAAQAiAAAegRQgCAUgEANQgYAPgmAAQgzAAgbgegAA0gRQAAg/gxAAQgvAAgGA/IBmAAIAAAAg");
	this.shape_20.setTransform(48.4,87.125);
	this.shape_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_20).wait(8).to({_off:false},0).wait(372));

	// h
	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#EC0000").s().p("AAvCYIAAiKQAAgygxABQgWgBgWAKIAACyIglAAIAAkpQAPgFAWgBIAABhQAYgLAYAAQBSAAAABKIAACPg");
	this.shape_21.setTransform(27.2,82.65);
	this.shape_21._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_21).wait(7).to({_off:false},0).wait(373));

	// t
	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#EC0000").s().p("AgyBMIAAjSQAPgGAWAAIAABAIBAAAIgDAfIg9AAIAAB1QAAAmAgAAQARAAAOgIIgEAgQgPAHgUAAQg9AAAAhBg");
	this.shape_22.setTransform(9.65,84.175);
	this.shape_22._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_22).wait(6).to({_off:false},0).wait(374));

	// e
	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#EC0000").s().p("Ag/BSQgagdAAg2QAAgxAXgdQAZggAtAAQArAAAWAbQAVAZAAAsIgCAbIiLAAQAGBFBAAAQAiAAAegRQgCAUgEANQgYAPgmAAQgzAAgbgegAA0gRQgBg/gxAAQgvAAgFA/IBmAAIAAAAg");
	this.shape_23.setTransform(118.5,40.075);
	this.shape_23._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_23).wait(5).to({_off:false},0).wait(375));

	// s
	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#EC0000").s().p("AhIBhQAAgPAFgQQAaAPAgAAQAtAAAAgdQAAgNgJgHQgHgHgTgHIgQgHQgcgKgMgMQgQgQAAgZQAAgcAUgPQAUgQAkAAQAiAAAbAKQgCARgDANQgcgJgaAAQgqAAAAAbQAAAWAjAOIASAHQAdAKAMAMQAOAPAAAWQAAAcgVARQgVASgnAAQgmAAgagPg");
	this.shape_24.setTransform(99.525,40.075);
	this.shape_24._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_24).wait(4).to({_off:false},0).wait(376));

	// o
	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#EC0000").s().p("AhGBSQgZgdAAg1QAAgzAZgeQAZgeAtAAQAuAAAaAeQAYAeAAAzQAAA1gZAdQgZAeguAAQgtAAgZgegAg5AAQAABRA5AAQA7AAAAhRQAAhQg7AAQg5AAAABQg");
	this.shape_25.setTransform(79.775,40.075);
	this.shape_25._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_25).wait(3).to({_off:false},0).wait(377));

	// o
	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#EC0000").s().p("AhGBSQgZgdAAg1QAAgzAZgeQAZgeAtAAQAuAAAaAeQAYAeAAAzQAAA1gZAdQgZAeguAAQgtAAgZgegAg5AAQAABRA5AAQA7AAAAhRQAAhQg7AAQg5AAAABQg");
	this.shape_26.setTransform(57.925,40.075);
	this.shape_26._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_26).wait(2).to({_off:false},0).wait(378));

	// h
	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#EC0000").s().p("AAvCYIAAiKQAAgygxABQgWgBgWAJIAACzIglAAIAAkpQAPgFAWgBIAABhQAYgLAZAAQBRAAAABKIAACPg");
	this.shape_27.setTransform(36.1,35.6);
	this.shape_27._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_27).wait(1).to({_off:false},0).wait(379));

	// C
	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#EC0000").s().p("AhBBwQgigqAAhGQAAhGAjgqQAjgqA8AAQArAAAZAOQgBAUgFANQgagOgiAAQgqAAgYAgQgaAgAAA5QAAA6AaAgQAZAfAtAAQAlAAAagNQgCATgEARQgdALgfAAQhAAAgjgrg");
	this.shape_28.setTransform(13.5,35.875);

	this.timeline.addTween(cjs.Tween.get(this.shape_28).wait(380));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,236.8,160.2);


(lib.mc_background = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EC0000").s().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	this.shape.setTransform(150,300);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_background, new cjs.Rectangle(0,0,300,600), null);


(lib.Logo_SantanderInternationalpos = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EC0000").s().p("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");
	this.shape.setTransform(150,45.15);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Logo_SantanderInternationalpos, new cjs.Rectangle(0,0,300,90.3), null);


(lib.Logo_SantanderInternationalneg = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("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");
	this.shape.setTransform(150,45.15);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Logo_SantanderInternationalneg, new cjs.Rectangle(0,0,300,90.3), null);


// stage content:
(lib._300x600 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0,288];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}
	this.frame_288 = function() {
		if (!this.looped) this.looped = 1;
		if (this.looped++ == 2) this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(288).call(this.frame_288).wait(102));

	// border
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#EC0000").ss(2,1,1).p("EgXRgutMAujAAAMAAABdbMgujAAAg");
	this.shape.setTransform(150.0109,300);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(390));

	// background_colour_copy (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_1 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_2 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_3 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_4 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_5 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_6 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_7 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_8 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_9 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_10 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_11 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_12 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_13 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_14 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_15 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_16 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_17 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_18 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_19 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_20 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_21 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_22 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_23 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_24 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_25 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_26 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_27 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_28 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_29 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_30 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_31 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_32 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_33 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_34 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_35 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_36 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_37 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_38 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_39 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_40 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_41 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_42 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_43 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_44 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_45 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_46 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_47 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_48 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_49 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_50 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_51 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_52 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_53 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_54 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_55 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_56 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_57 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_58 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_59 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_60 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_61 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_62 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_63 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_64 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_65 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_66 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_67 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_68 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_69 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_70 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_71 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_72 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_73 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_74 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_75 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_76 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_77 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_78 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_79 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_80 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_81 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_82 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_83 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_84 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_85 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_86 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_87 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_88 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_89 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_90 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_91 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_92 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_93 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_94 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_95 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_96 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_97 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_98 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_99 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_100 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_101 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_102 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_103 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_104 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_105 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_106 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_107 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_108 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_109 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_110 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_111 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_112 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_113 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_114 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_115 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_116 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_117 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_118 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_119 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_120 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_121 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_122 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_123 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_124 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_125 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_126 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_127 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_128 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_129 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_130 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_131 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_132 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_133 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_134 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_135 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_136 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_137 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_138 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_139 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_140 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_141 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_142 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_143 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_144 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_145 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_146 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_147 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_148 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_149 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_150 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_151 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_152 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_153 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_154 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_155 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_156 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_157 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_158 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_159 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_160 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_161 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_162 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_163 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_164 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_165 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_166 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_167 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_168 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_169 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_170 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_171 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_172 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_173 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_174 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_175 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_176 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_177 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_178 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_179 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_180 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_181 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_182 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_183 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_184 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_185 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_186 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_187 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_188 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_189 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_190 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_191 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_192 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_193 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_194 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_195 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_196 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_197 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_198 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_199 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_200 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_201 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_202 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_203 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_204 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_205 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_206 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_207 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_208 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_209 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_210 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_211 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_212 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_213 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_214 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_215 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_216 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_217 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_218 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_219 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_220 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_221 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_222 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_223 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_224 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_225 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_226 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_227 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_228 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_229 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_230 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_231 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_232 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_233 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_234 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_235 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_236 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_237 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_238 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_239 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_240 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_241 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_242 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_243 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_244 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_245 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_246 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_247 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_248 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_249 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_250 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_251 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_252 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_253 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_254 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_255 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_256 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_257 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_258 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_259 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_260 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_261 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_262 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_263 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_264 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_265 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_266 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_267 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_268 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_269 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_270 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_271 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_272 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_273 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_274 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_275 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_276 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_277 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_278 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_279 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_280 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_281 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_282 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_283 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_284 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_285 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_286 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_287 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_288 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_289 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_290 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_291 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_292 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_293 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_294 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_295 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_296 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_297 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_298 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_299 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_300 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_301 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_302 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_303 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_304 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_305 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_306 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_307 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_308 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_309 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_310 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_311 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_312 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_313 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_314 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_315 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_316 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_317 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_318 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_319 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_320 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_321 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_322 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_323 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_324 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_325 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_326 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_327 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_328 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_329 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_330 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_331 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_332 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_333 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_334 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_335 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_336 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_337 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_338 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_339 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_340 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_341 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_342 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_343 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_344 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_345 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_346 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_347 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_348 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_349 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_350 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_351 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_352 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_353 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_354 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_355 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_356 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_357 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_358 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_359 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_360 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_361 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_362 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_363 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_364 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_365 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_366 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_367 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_368 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_369 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_370 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_371 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_372 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_373 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_374 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_375 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_376 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_377 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_378 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_379 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_380 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_381 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_382 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_383 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_384 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_385 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_386 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_387 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_388 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	var mask_graphics_389 = new cjs.Graphics().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:150,y:300}).wait(1).to({graphics:mask_graphics_1,x:150,y:300}).wait(1).to({graphics:mask_graphics_2,x:150,y:299.75}).wait(1).to({graphics:mask_graphics_3,x:150,y:298.85}).wait(1).to({graphics:mask_graphics_4,x:150,y:296.3}).wait(1).to({graphics:mask_graphics_5,x:150,y:290.95}).wait(1).to({graphics:mask_graphics_6,x:150,y:281.25}).wait(1).to({graphics:mask_graphics_7,x:150,y:265.25}).wait(1).to({graphics:mask_graphics_8,x:150,y:240.75}).wait(1).to({graphics:mask_graphics_9,x:150,y:205.1}).wait(1).to({graphics:mask_graphics_10,x:150,y:155.35}).wait(1).to({graphics:mask_graphics_11,x:150,y:88.2}).wait(1).to({graphics:mask_graphics_12,x:150,y:0}).wait(1).to({graphics:mask_graphics_13,x:150,y:-88.15}).wait(1).to({graphics:mask_graphics_14,x:150,y:-155.3}).wait(1).to({graphics:mask_graphics_15,x:150,y:-205.1}).wait(1).to({graphics:mask_graphics_16,x:150,y:-240.75}).wait(1).to({graphics:mask_graphics_17,x:150,y:-265.25}).wait(1).to({graphics:mask_graphics_18,x:150,y:-281.25}).wait(1).to({graphics:mask_graphics_19,x:150,y:-290.95}).wait(1).to({graphics:mask_graphics_20,x:150,y:-296.3}).wait(1).to({graphics:mask_graphics_21,x:150,y:-298.85}).wait(1).to({graphics:mask_graphics_22,x:150,y:-299.75}).wait(1).to({graphics:mask_graphics_23,x:150,y:-300}).wait(1).to({graphics:mask_graphics_24,x:150,y:-300}).wait(1).to({graphics:mask_graphics_25,x:150,y:-300}).wait(1).to({graphics:mask_graphics_26,x:150,y:-300}).wait(1).to({graphics:mask_graphics_27,x:150,y:-300}).wait(1).to({graphics:mask_graphics_28,x:150,y:-300}).wait(1).to({graphics:mask_graphics_29,x:150,y:-300}).wait(1).to({graphics:mask_graphics_30,x:150,y:-300}).wait(1).to({graphics:mask_graphics_31,x:150,y:-300}).wait(1).to({graphics:mask_graphics_32,x:150,y:-300}).wait(1).to({graphics:mask_graphics_33,x:150,y:-300}).wait(1).to({graphics:mask_graphics_34,x:150,y:-300}).wait(1).to({graphics:mask_graphics_35,x:150,y:-300}).wait(1).to({graphics:mask_graphics_36,x:150,y:-300}).wait(1).to({graphics:mask_graphics_37,x:150,y:-300}).wait(1).to({graphics:mask_graphics_38,x:150,y:-300}).wait(1).to({graphics:mask_graphics_39,x:150,y:-300}).wait(1).to({graphics:mask_graphics_40,x:150,y:-300}).wait(1).to({graphics:mask_graphics_41,x:150,y:-300}).wait(1).to({graphics:mask_graphics_42,x:150,y:-300}).wait(1).to({graphics:mask_graphics_43,x:150,y:-300}).wait(1).to({graphics:mask_graphics_44,x:150,y:-300}).wait(1).to({graphics:mask_graphics_45,x:150,y:-300}).wait(1).to({graphics:mask_graphics_46,x:150,y:-300}).wait(1).to({graphics:mask_graphics_47,x:150,y:-300}).wait(1).to({graphics:mask_graphics_48,x:150,y:-300}).wait(1).to({graphics:mask_graphics_49,x:150,y:-300}).wait(1).to({graphics:mask_graphics_50,x:150,y:-300}).wait(1).to({graphics:mask_graphics_51,x:150,y:-300}).wait(1).to({graphics:mask_graphics_52,x:150,y:-300}).wait(1).to({graphics:mask_graphics_53,x:150,y:-300}).wait(1).to({graphics:mask_graphics_54,x:150,y:-300}).wait(1).to({graphics:mask_graphics_55,x:150,y:-300}).wait(1).to({graphics:mask_graphics_56,x:150,y:-300}).wait(1).to({graphics:mask_graphics_57,x:150,y:-300}).wait(1).to({graphics:mask_graphics_58,x:150,y:-300}).wait(1).to({graphics:mask_graphics_59,x:150,y:-300}).wait(1).to({graphics:mask_graphics_60,x:150,y:-300}).wait(1).to({graphics:mask_graphics_61,x:150,y:-300}).wait(1).to({graphics:mask_graphics_62,x:150,y:-300}).wait(1).to({graphics:mask_graphics_63,x:150,y:-300}).wait(1).to({graphics:mask_graphics_64,x:150,y:-300}).wait(1).to({graphics:mask_graphics_65,x:150,y:-300}).wait(1).to({graphics:mask_graphics_66,x:150,y:-300}).wait(1).to({graphics:mask_graphics_67,x:150,y:-300}).wait(1).to({graphics:mask_graphics_68,x:150,y:-300}).wait(1).to({graphics:mask_graphics_69,x:150,y:-300}).wait(1).to({graphics:mask_graphics_70,x:150,y:-300}).wait(1).to({graphics:mask_graphics_71,x:150,y:-300}).wait(1).to({graphics:mask_graphics_72,x:150,y:-300}).wait(1).to({graphics:mask_graphics_73,x:150,y:-300}).wait(1).to({graphics:mask_graphics_74,x:150,y:-300}).wait(1).to({graphics:mask_graphics_75,x:150,y:-300}).wait(1).to({graphics:mask_graphics_76,x:150,y:-300}).wait(1).to({graphics:mask_graphics_77,x:150,y:-300}).wait(1).to({graphics:mask_graphics_78,x:150,y:-300}).wait(1).to({graphics:mask_graphics_79,x:150,y:-300}).wait(1).to({graphics:mask_graphics_80,x:150,y:-300}).wait(1).to({graphics:mask_graphics_81,x:150,y:-300}).wait(1).to({graphics:mask_graphics_82,x:150,y:-300}).wait(1).to({graphics:mask_graphics_83,x:150,y:-300}).wait(1).to({graphics:mask_graphics_84,x:150,y:-300}).wait(1).to({graphics:mask_graphics_85,x:150,y:-300}).wait(1).to({graphics:mask_graphics_86,x:150,y:-300}).wait(1).to({graphics:mask_graphics_87,x:150,y:-300}).wait(1).to({graphics:mask_graphics_88,x:150,y:-300}).wait(1).to({graphics:mask_graphics_89,x:150,y:-300}).wait(1).to({graphics:mask_graphics_90,x:150,y:-300}).wait(1).to({graphics:mask_graphics_91,x:150,y:-300}).wait(1).to({graphics:mask_graphics_92,x:150,y:-300}).wait(1).to({graphics:mask_graphics_93,x:150,y:-300}).wait(1).to({graphics:mask_graphics_94,x:150,y:-300}).wait(1).to({graphics:mask_graphics_95,x:150,y:-300}).wait(1).to({graphics:mask_graphics_96,x:150,y:-300}).wait(1).to({graphics:mask_graphics_97,x:150,y:-300}).wait(1).to({graphics:mask_graphics_98,x:150,y:-300}).wait(1).to({graphics:mask_graphics_99,x:150,y:-300}).wait(1).to({graphics:mask_graphics_100,x:150,y:-300}).wait(1).to({graphics:mask_graphics_101,x:150,y:-300}).wait(1).to({graphics:mask_graphics_102,x:150,y:-300}).wait(1).to({graphics:mask_graphics_103,x:150,y:-300}).wait(1).to({graphics:mask_graphics_104,x:150,y:-300}).wait(1).to({graphics:mask_graphics_105,x:150,y:-300}).wait(1).to({graphics:mask_graphics_106,x:150,y:-300}).wait(1).to({graphics:mask_graphics_107,x:150,y:-300}).wait(1).to({graphics:mask_graphics_108,x:150,y:-300}).wait(1).to({graphics:mask_graphics_109,x:150,y:-300}).wait(1).to({graphics:mask_graphics_110,x:150,y:-300}).wait(1).to({graphics:mask_graphics_111,x:150,y:-300}).wait(1).to({graphics:mask_graphics_112,x:150,y:-300}).wait(1).to({graphics:mask_graphics_113,x:150,y:-300}).wait(1).to({graphics:mask_graphics_114,x:150,y:-300}).wait(1).to({graphics:mask_graphics_115,x:150,y:-300}).wait(1).to({graphics:mask_graphics_116,x:150,y:-300}).wait(1).to({graphics:mask_graphics_117,x:150,y:-300}).wait(1).to({graphics:mask_graphics_118,x:150,y:-300}).wait(1).to({graphics:mask_graphics_119,x:150,y:-300}).wait(1).to({graphics:mask_graphics_120,x:150,y:-300}).wait(1).to({graphics:mask_graphics_121,x:150,y:-300}).wait(1).to({graphics:mask_graphics_122,x:150,y:-300}).wait(1).to({graphics:mask_graphics_123,x:150,y:-300}).wait(1).to({graphics:mask_graphics_124,x:150,y:-300}).wait(1).to({graphics:mask_graphics_125,x:150,y:-300}).wait(1).to({graphics:mask_graphics_126,x:150,y:-300}).wait(1).to({graphics:mask_graphics_127,x:150,y:-300}).wait(1).to({graphics:mask_graphics_128,x:150,y:-300}).wait(1).to({graphics:mask_graphics_129,x:150,y:-300}).wait(1).to({graphics:mask_graphics_130,x:150,y:-300}).wait(1).to({graphics:mask_graphics_131,x:150,y:-300}).wait(1).to({graphics:mask_graphics_132,x:150,y:-300}).wait(1).to({graphics:mask_graphics_133,x:150,y:-300}).wait(1).to({graphics:mask_graphics_134,x:150,y:-300}).wait(1).to({graphics:mask_graphics_135,x:150,y:-300}).wait(1).to({graphics:mask_graphics_136,x:150,y:-300}).wait(1).to({graphics:mask_graphics_137,x:150,y:-300}).wait(1).to({graphics:mask_graphics_138,x:150,y:-300}).wait(1).to({graphics:mask_graphics_139,x:150,y:-300}).wait(1).to({graphics:mask_graphics_140,x:150,y:-300}).wait(1).to({graphics:mask_graphics_141,x:150,y:-300}).wait(1).to({graphics:mask_graphics_142,x:150,y:-300}).wait(1).to({graphics:mask_graphics_143,x:150,y:-300}).wait(1).to({graphics:mask_graphics_144,x:150,y:-300}).wait(1).to({graphics:mask_graphics_145,x:150,y:-300}).wait(1).to({graphics:mask_graphics_146,x:150,y:-300}).wait(1).to({graphics:mask_graphics_147,x:150,y:-300}).wait(1).to({graphics:mask_graphics_148,x:150,y:-300}).wait(1).to({graphics:mask_graphics_149,x:150,y:-300}).wait(1).to({graphics:mask_graphics_150,x:150,y:-300}).wait(1).to({graphics:mask_graphics_151,x:150,y:-300}).wait(1).to({graphics:mask_graphics_152,x:150,y:-300}).wait(1).to({graphics:mask_graphics_153,x:150,y:-300}).wait(1).to({graphics:mask_graphics_154,x:150,y:-300}).wait(1).to({graphics:mask_graphics_155,x:150,y:-300}).wait(1).to({graphics:mask_graphics_156,x:150,y:-300}).wait(1).to({graphics:mask_graphics_157,x:150,y:-300}).wait(1).to({graphics:mask_graphics_158,x:150,y:-300}).wait(1).to({graphics:mask_graphics_159,x:150,y:-300}).wait(1).to({graphics:mask_graphics_160,x:150,y:-300}).wait(1).to({graphics:mask_graphics_161,x:150,y:-300}).wait(1).to({graphics:mask_graphics_162,x:150,y:-300}).wait(1).to({graphics:mask_graphics_163,x:150,y:-300}).wait(1).to({graphics:mask_graphics_164,x:150,y:-300}).wait(1).to({graphics:mask_graphics_165,x:150,y:-300}).wait(1).to({graphics:mask_graphics_166,x:150,y:-300}).wait(1).to({graphics:mask_graphics_167,x:150,y:-300}).wait(1).to({graphics:mask_graphics_168,x:150,y:-300}).wait(1).to({graphics:mask_graphics_169,x:150,y:-300}).wait(1).to({graphics:mask_graphics_170,x:150,y:-300}).wait(1).to({graphics:mask_graphics_171,x:150,y:-300}).wait(1).to({graphics:mask_graphics_172,x:150,y:-300}).wait(1).to({graphics:mask_graphics_173,x:150,y:-300}).wait(1).to({graphics:mask_graphics_174,x:150,y:-300}).wait(1).to({graphics:mask_graphics_175,x:150,y:-300}).wait(1).to({graphics:mask_graphics_176,x:150,y:-300}).wait(1).to({graphics:mask_graphics_177,x:150,y:-300}).wait(1).to({graphics:mask_graphics_178,x:150,y:-300}).wait(1).to({graphics:mask_graphics_179,x:150,y:-300}).wait(1).to({graphics:mask_graphics_180,x:150,y:-300}).wait(1).to({graphics:mask_graphics_181,x:150,y:-300}).wait(1).to({graphics:mask_graphics_182,x:150,y:-300}).wait(1).to({graphics:mask_graphics_183,x:150,y:-300}).wait(1).to({graphics:mask_graphics_184,x:150,y:-300}).wait(1).to({graphics:mask_graphics_185,x:150,y:-300}).wait(1).to({graphics:mask_graphics_186,x:150,y:-300}).wait(1).to({graphics:mask_graphics_187,x:150,y:-300}).wait(1).to({graphics:mask_graphics_188,x:150,y:-300}).wait(1).to({graphics:mask_graphics_189,x:150,y:-300}).wait(1).to({graphics:mask_graphics_190,x:150,y:-300}).wait(1).to({graphics:mask_graphics_191,x:150,y:-300}).wait(1).to({graphics:mask_graphics_192,x:150,y:-300}).wait(1).to({graphics:mask_graphics_193,x:150,y:-300}).wait(1).to({graphics:mask_graphics_194,x:150,y:-300}).wait(1).to({graphics:mask_graphics_195,x:150,y:-300}).wait(1).to({graphics:mask_graphics_196,x:150,y:-300}).wait(1).to({graphics:mask_graphics_197,x:150,y:-300}).wait(1).to({graphics:mask_graphics_198,x:150,y:-300}).wait(1).to({graphics:mask_graphics_199,x:150,y:-300}).wait(1).to({graphics:mask_graphics_200,x:150,y:-300}).wait(1).to({graphics:mask_graphics_201,x:150,y:-300}).wait(1).to({graphics:mask_graphics_202,x:150,y:-300}).wait(1).to({graphics:mask_graphics_203,x:150,y:-300}).wait(1).to({graphics:mask_graphics_204,x:150,y:-300}).wait(1).to({graphics:mask_graphics_205,x:150,y:-300}).wait(1).to({graphics:mask_graphics_206,x:150,y:-300}).wait(1).to({graphics:mask_graphics_207,x:150,y:-300}).wait(1).to({graphics:mask_graphics_208,x:150,y:-300}).wait(1).to({graphics:mask_graphics_209,x:150,y:-300}).wait(1).to({graphics:mask_graphics_210,x:150,y:-300}).wait(1).to({graphics:mask_graphics_211,x:150,y:-300}).wait(1).to({graphics:mask_graphics_212,x:150,y:-300}).wait(1).to({graphics:mask_graphics_213,x:150,y:-300}).wait(1).to({graphics:mask_graphics_214,x:150,y:-300}).wait(1).to({graphics:mask_graphics_215,x:150,y:-300}).wait(1).to({graphics:mask_graphics_216,x:150,y:-300}).wait(1).to({graphics:mask_graphics_217,x:150,y:-300}).wait(1).to({graphics:mask_graphics_218,x:150,y:-300}).wait(1).to({graphics:mask_graphics_219,x:150,y:-300}).wait(1).to({graphics:mask_graphics_220,x:150,y:-300}).wait(1).to({graphics:mask_graphics_221,x:150,y:-300}).wait(1).to({graphics:mask_graphics_222,x:150,y:-300}).wait(1).to({graphics:mask_graphics_223,x:150,y:-300}).wait(1).to({graphics:mask_graphics_224,x:150,y:-300}).wait(1).to({graphics:mask_graphics_225,x:150,y:-300}).wait(1).to({graphics:mask_graphics_226,x:150,y:-300}).wait(1).to({graphics:mask_graphics_227,x:150,y:-300}).wait(1).to({graphics:mask_graphics_228,x:150,y:-300}).wait(1).to({graphics:mask_graphics_229,x:150,y:-300}).wait(1).to({graphics:mask_graphics_230,x:150,y:-300}).wait(1).to({graphics:mask_graphics_231,x:150,y:-300}).wait(1).to({graphics:mask_graphics_232,x:150,y:-300}).wait(1).to({graphics:mask_graphics_233,x:150,y:-300}).wait(1).to({graphics:mask_graphics_234,x:150,y:-300}).wait(1).to({graphics:mask_graphics_235,x:150,y:-300}).wait(1).to({graphics:mask_graphics_236,x:150,y:-300}).wait(1).to({graphics:mask_graphics_237,x:150,y:-300}).wait(1).to({graphics:mask_graphics_238,x:150,y:-300}).wait(1).to({graphics:mask_graphics_239,x:150,y:-300}).wait(1).to({graphics:mask_graphics_240,x:150,y:-300}).wait(1).to({graphics:mask_graphics_241,x:150,y:-300}).wait(1).to({graphics:mask_graphics_242,x:150,y:-300}).wait(1).to({graphics:mask_graphics_243,x:150,y:-300}).wait(1).to({graphics:mask_graphics_244,x:150,y:-300}).wait(1).to({graphics:mask_graphics_245,x:150,y:-300}).wait(1).to({graphics:mask_graphics_246,x:150,y:-300}).wait(1).to({graphics:mask_graphics_247,x:150,y:-300}).wait(1).to({graphics:mask_graphics_248,x:150,y:-300}).wait(1).to({graphics:mask_graphics_249,x:150,y:-300}).wait(1).to({graphics:mask_graphics_250,x:150,y:-300}).wait(1).to({graphics:mask_graphics_251,x:150,y:-300}).wait(1).to({graphics:mask_graphics_252,x:150,y:-300}).wait(1).to({graphics:mask_graphics_253,x:150,y:-300}).wait(1).to({graphics:mask_graphics_254,x:150,y:-300}).wait(1).to({graphics:mask_graphics_255,x:150,y:-300}).wait(1).to({graphics:mask_graphics_256,x:150,y:-300}).wait(1).to({graphics:mask_graphics_257,x:150,y:-300}).wait(1).to({graphics:mask_graphics_258,x:150,y:-300}).wait(1).to({graphics:mask_graphics_259,x:150,y:-300}).wait(1).to({graphics:mask_graphics_260,x:150,y:-300}).wait(1).to({graphics:mask_graphics_261,x:150,y:-300}).wait(1).to({graphics:mask_graphics_262,x:150,y:-300}).wait(1).to({graphics:mask_graphics_263,x:150,y:-300}).wait(1).to({graphics:mask_graphics_264,x:150,y:-300}).wait(1).to({graphics:mask_graphics_265,x:150,y:-300}).wait(1).to({graphics:mask_graphics_266,x:150,y:-300}).wait(1).to({graphics:mask_graphics_267,x:150,y:-300}).wait(1).to({graphics:mask_graphics_268,x:150,y:-300}).wait(1).to({graphics:mask_graphics_269,x:150,y:-300}).wait(1).to({graphics:mask_graphics_270,x:150,y:-300}).wait(1).to({graphics:mask_graphics_271,x:150,y:-300}).wait(1).to({graphics:mask_graphics_272,x:150,y:-300}).wait(1).to({graphics:mask_graphics_273,x:150,y:-300}).wait(1).to({graphics:mask_graphics_274,x:150,y:-300}).wait(1).to({graphics:mask_graphics_275,x:150,y:-300}).wait(1).to({graphics:mask_graphics_276,x:150,y:-300}).wait(1).to({graphics:mask_graphics_277,x:150,y:-300}).wait(1).to({graphics:mask_graphics_278,x:150,y:-300}).wait(1).to({graphics:mask_graphics_279,x:150,y:-300}).wait(1).to({graphics:mask_graphics_280,x:150,y:-300}).wait(1).to({graphics:mask_graphics_281,x:150,y:-300}).wait(1).to({graphics:mask_graphics_282,x:150,y:-300}).wait(1).to({graphics:mask_graphics_283,x:150,y:-300}).wait(1).to({graphics:mask_graphics_284,x:150,y:-300}).wait(1).to({graphics:mask_graphics_285,x:150,y:-300}).wait(1).to({graphics:mask_graphics_286,x:150,y:-300}).wait(1).to({graphics:mask_graphics_287,x:150,y:-300}).wait(1).to({graphics:mask_graphics_288,x:150,y:-300}).wait(1).to({graphics:mask_graphics_289,x:150,y:-300}).wait(1).to({graphics:mask_graphics_290,x:150,y:-300}).wait(1).to({graphics:mask_graphics_291,x:150,y:-300}).wait(1).to({graphics:mask_graphics_292,x:150,y:-300}).wait(1).to({graphics:mask_graphics_293,x:150,y:-300}).wait(1).to({graphics:mask_graphics_294,x:150,y:-300}).wait(1).to({graphics:mask_graphics_295,x:150,y:-300}).wait(1).to({graphics:mask_graphics_296,x:150,y:-300}).wait(1).to({graphics:mask_graphics_297,x:150,y:-300}).wait(1).to({graphics:mask_graphics_298,x:150,y:-300}).wait(1).to({graphics:mask_graphics_299,x:150,y:-300}).wait(1).to({graphics:mask_graphics_300,x:150,y:-300}).wait(1).to({graphics:mask_graphics_301,x:150,y:-300}).wait(1).to({graphics:mask_graphics_302,x:150,y:-300}).wait(1).to({graphics:mask_graphics_303,x:150,y:-300}).wait(1).to({graphics:mask_graphics_304,x:150,y:-300}).wait(1).to({graphics:mask_graphics_305,x:150,y:-300}).wait(1).to({graphics:mask_graphics_306,x:150,y:-300}).wait(1).to({graphics:mask_graphics_307,x:150,y:-300}).wait(1).to({graphics:mask_graphics_308,x:150,y:-300}).wait(1).to({graphics:mask_graphics_309,x:150,y:-300}).wait(1).to({graphics:mask_graphics_310,x:150,y:-299.85}).wait(1).to({graphics:mask_graphics_311,x:150,y:-298.75}).wait(1).to({graphics:mask_graphics_312,x:150,y:-295.85}).wait(1).to({graphics:mask_graphics_313,x:150,y:-290.2}).wait(1).to({graphics:mask_graphics_314,x:150,y:-280.8}).wait(1).to({graphics:mask_graphics_315,x:150,y:-266.85}).wait(1).to({graphics:mask_graphics_316,x:150,y:-247.3}).wait(1).to({graphics:mask_graphics_317,x:150,y:-221.35}).wait(1).to({graphics:mask_graphics_318,x:150,y:-188.05}).wait(1).to({graphics:mask_graphics_319,x:150,y:-146.4}).wait(1).to({graphics:mask_graphics_320,x:150,y:-95.55}).wait(1).to({graphics:mask_graphics_321,x:150,y:-34.6}).wait(1).to({graphics:mask_graphics_322,x:150,y:34.55}).wait(1).to({graphics:mask_graphics_323,x:150,y:95.55}).wait(1).to({graphics:mask_graphics_324,x:150,y:146.4}).wait(1).to({graphics:mask_graphics_325,x:150,y:188}).wait(1).to({graphics:mask_graphics_326,x:150,y:221.35}).wait(1).to({graphics:mask_graphics_327,x:150,y:247.3}).wait(1).to({graphics:mask_graphics_328,x:150,y:266.8}).wait(1).to({graphics:mask_graphics_329,x:150,y:280.8}).wait(1).to({graphics:mask_graphics_330,x:150,y:290.15}).wait(1).to({graphics:mask_graphics_331,x:150,y:295.85}).wait(1).to({graphics:mask_graphics_332,x:150,y:298.75}).wait(1).to({graphics:mask_graphics_333,x:150,y:299.85}).wait(1).to({graphics:mask_graphics_334,x:150,y:300}).wait(1).to({graphics:mask_graphics_335,x:150,y:300}).wait(1).to({graphics:mask_graphics_336,x:150,y:300}).wait(1).to({graphics:mask_graphics_337,x:150,y:300}).wait(1).to({graphics:mask_graphics_338,x:150,y:300}).wait(1).to({graphics:mask_graphics_339,x:150,y:300}).wait(1).to({graphics:mask_graphics_340,x:150,y:300}).wait(1).to({graphics:mask_graphics_341,x:150,y:300}).wait(1).to({graphics:mask_graphics_342,x:150,y:300}).wait(1).to({graphics:mask_graphics_343,x:150,y:300}).wait(1).to({graphics:mask_graphics_344,x:150,y:300}).wait(1).to({graphics:mask_graphics_345,x:150,y:300}).wait(1).to({graphics:mask_graphics_346,x:150,y:300}).wait(1).to({graphics:mask_graphics_347,x:150,y:300}).wait(1).to({graphics:mask_graphics_348,x:150,y:300}).wait(1).to({graphics:mask_graphics_349,x:150,y:300}).wait(1).to({graphics:mask_graphics_350,x:150,y:300}).wait(1).to({graphics:mask_graphics_351,x:150,y:300}).wait(1).to({graphics:mask_graphics_352,x:150,y:300}).wait(1).to({graphics:mask_graphics_353,x:150,y:300}).wait(1).to({graphics:mask_graphics_354,x:150,y:300}).wait(1).to({graphics:mask_graphics_355,x:150,y:300}).wait(1).to({graphics:mask_graphics_356,x:150,y:300}).wait(1).to({graphics:mask_graphics_357,x:150,y:300}).wait(1).to({graphics:mask_graphics_358,x:150,y:300}).wait(1).to({graphics:mask_graphics_359,x:150,y:300}).wait(1).to({graphics:mask_graphics_360,x:150,y:300}).wait(1).to({graphics:mask_graphics_361,x:150,y:300}).wait(1).to({graphics:mask_graphics_362,x:150,y:300}).wait(1).to({graphics:mask_graphics_363,x:150,y:300}).wait(1).to({graphics:mask_graphics_364,x:150,y:300}).wait(1).to({graphics:mask_graphics_365,x:150,y:300}).wait(1).to({graphics:mask_graphics_366,x:150,y:300}).wait(1).to({graphics:mask_graphics_367,x:150,y:300}).wait(1).to({graphics:mask_graphics_368,x:150,y:300}).wait(1).to({graphics:mask_graphics_369,x:150,y:300}).wait(1).to({graphics:mask_graphics_370,x:150,y:300}).wait(1).to({graphics:mask_graphics_371,x:150,y:300}).wait(1).to({graphics:mask_graphics_372,x:150,y:300}).wait(1).to({graphics:mask_graphics_373,x:150,y:300}).wait(1).to({graphics:mask_graphics_374,x:150,y:300}).wait(1).to({graphics:mask_graphics_375,x:150,y:300}).wait(1).to({graphics:mask_graphics_376,x:150,y:300}).wait(1).to({graphics:mask_graphics_377,x:150,y:300}).wait(1).to({graphics:mask_graphics_378,x:150,y:300}).wait(1).to({graphics:mask_graphics_379,x:150,y:300}).wait(1).to({graphics:mask_graphics_380,x:150,y:300}).wait(1).to({graphics:mask_graphics_381,x:150,y:300}).wait(1).to({graphics:mask_graphics_382,x:150,y:300}).wait(1).to({graphics:mask_graphics_383,x:150,y:300}).wait(1).to({graphics:mask_graphics_384,x:150,y:300}).wait(1).to({graphics:mask_graphics_385,x:150,y:300}).wait(1).to({graphics:mask_graphics_386,x:150,y:300}).wait(1).to({graphics:mask_graphics_387,x:150,y:300}).wait(1).to({graphics:mask_graphics_388,x:150,y:300}).wait(1).to({graphics:mask_graphics_389,x:150,y:300}).wait(1));

	// logo_negatif
	this.instance = new lib.Logo_SantanderInternationalneg();
	this.instance.setTransform(322.2,111.8,0.6667,0.6661,0,0,0,408.3,122.9);
	this.instance._off = true;

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(24).to({_off:false},0).wait(286).to({regX:150,regY:45.1,x:150,y:62.25},0).wait(1).to({y:66.05},0).wait(1).to({y:71.65},0).wait(1).to({y:79.35},0).wait(1).to({y:89.5},0).wait(1).to({y:102.7},0).wait(1).to({scaleX:0.6666,y:119.6},0).wait(1).to({y:141.1},0).wait(1).to({y:168.4},0).wait(1).to({y:203.05},0).wait(1).to({x:150.05,y:246.7},0).wait(1).to({regX:408.4,regY:123,x:322.25,y:351.9},0).wait(58).to({alpha:0},10).wait(1));

	// logo_pos
	this.instance_1 = new lib.Logo_SantanderInternationalpos();
	this.instance_1.setTransform(322.2,111.8,0.6667,0.6661,0,0,0,408.3,122.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(310).to({regX:150,regY:45.1,x:150,y:62.25},0).wait(1).to({y:66.05},0).wait(1).to({y:71.65},0).wait(1).to({y:79.35},0).wait(1).to({y:89.5},0).wait(1).to({y:102.7},0).wait(1).to({scaleX:0.6666,y:119.6},0).wait(1).to({y:141.1},0).wait(1).to({y:168.4},0).wait(1).to({y:203.05},0).wait(1).to({x:150.05,y:246.7},0).wait(1).to({regX:408.4,regY:123,x:322.25,y:351.9},0).wait(69));

	// header_animated
	this.instance_2 = new lib.mc_level1_animated();
	this.instance_2.setTransform(116.2,215.8,1,1,0,0,0,86.2,76.9);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(29).to({_off:false},0).wait(1).to({regX:117.7,regY:87.4,x:147.7,y:226.3},0).wait(269).to({regX:86.2,regY:76.9,x:116.2,y:215.8},0).wait(1).to({regX:117.7,regY:87.4,x:147.7,y:228.65,alpha:0.9911},0).wait(1).to({y:232.65,alpha:0.976},0).wait(1).to({y:238.6,alpha:0.9536},0).wait(1).to({y:246.85,alpha:0.9225},0).wait(1).to({y:257.85,alpha:0.8811},0).wait(1).to({y:272.2,alpha:0.827},0).wait(1).to({y:290.65,alpha:0.7574},0).wait(1).to({y:314.4,alpha:0.6679},0).wait(1).to({y:344.85,alpha:0.5532},0).wait(1).to({y:383.8,alpha:0.4064},0).wait(1).to({y:432.9,alpha:0.2214},0).wait(1).to({regX:86.2,regY:76.9,x:116.2,y:481.2,alpha:0},0).wait(1).to({regX:117.7,regY:87.4,x:147.7,y:559.75},0).wait(1).to({y:622.5},0).wait(1).to({y:674.2},0).wait(1).to({y:714.65},0).wait(1).to({y:745.7},0).wait(1).to({y:769.5},0).wait(1).to({y:787.6},0).wait(1).to({y:801.2},0).wait(1).to({y:811.2},0).wait(1).to({y:818.3},0).wait(1).to({y:822.9},0).wait(1).to({y:825.5},0).wait(1).to({regX:86.2,regY:76.9,x:116.2,y:815.8},0).wait(66));

	// subheader
	this.instance_3 = new lib.mc_level2();
	this.instance_3.setTransform(98.3,971.85,1,1,0,0,0,68,42.6);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(59).to({_off:false},0).wait(1).to({regX:118.3,regY:43.7,x:148.6,y:970.5},0).wait(1).to({y:966.35},0).wait(1).to({y:960.15},0).wait(1).to({y:951.6},0).wait(1).to({y:940.25},0).wait(1).to({y:925.4},0).wait(1).to({y:906.25},0).wait(1).to({y:881.65},0).wait(1).to({y:850.15},0).wait(1).to({y:809.8},0).wait(1).to({y:758.95},0).wait(1).to({y:698.1},0).wait(1).to({y:633.05},0).wait(1).to({y:573.05},0).wait(1).to({y:523.6},0).wait(1).to({regX:68,regY:42.6,x:98.3,y:483.85},0).wait(1).to({regX:118.3,regY:43.7,x:148.6,y:453.75,alpha:0.2784},0).wait(1).to({y:429.9,alpha:0.4913},0).wait(1).to({y:411.75,alpha:0.6534},0).wait(1).to({y:398.1,alpha:0.7753},0).wait(1).to({y:388.05,alpha:0.865},0).wait(1).to({y:380.95,alpha:0.9284},0).wait(1).to({y:376.3,alpha:0.9699},0).wait(1).to({y:373.75,alpha:0.9928},0).wait(1).to({regX:68,regY:42.6,x:98.3,y:371.85,alpha:1},0).wait(216).to({regX:118.3,regY:43.7,x:148.6,y:375.15,alpha:0.9801},0).wait(1).to({y:378.95,alpha:0.9463},0).wait(1).to({y:384.55,alpha:0.896},0).wait(1).to({y:392.35,alpha:0.8265},0).wait(1).to({y:402.7,alpha:0.7338},0).wait(1).to({y:416.25,alpha:0.6129},0).wait(1).to({y:433.7,alpha:0.4569},0).wait(1).to({y:456.15,alpha:0.2567},0).wait(1).to({regX:68,regY:42.6,x:98.3,y:483.8,alpha:0},0).to({y:971.85},16,cjs.Ease.quartInOut).wait(66));

	// T_C
	this.instance_4 = new lib.mc_level3();
	this.instance_4.setTransform(78.95,1050.75,0.7196,0.7197,0,0,0,68,42.6);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(84).to({_off:false},0).wait(1).to({regX:151,regY:18,x:138.6,y:1032.45},0).wait(1).to({y:1030.65},0).wait(1).to({y:1027.4},0).wait(1).to({y:1022.35},0).wait(1).to({y:1015.1},0).wait(1).to({y:1005},0).wait(1).to({y:991.2},0).wait(1).to({y:972.2},0).wait(1).to({y:945.4},0).wait(1).to({y:905.7},0).wait(1).to({y:841.6},0).wait(1).to({y:737.5},0).wait(1).to({y:639.05},0).wait(1).to({y:579},0).wait(1).to({y:540.5},0).wait(1).to({regX:68,regY:42.8,x:78.9,y:531.55},0).wait(1).to({regX:151,regY:18,x:138.6,y:490.6,alpha:0.2857},0).wait(1).to({y:473.4,alpha:0.4987},0).wait(1).to({y:460.5,alpha:0.659},0).wait(1).to({y:450.8,alpha:0.779},0).wait(1).to({y:443.7,alpha:0.8671},0).wait(1).to({y:438.65,alpha:0.9294},0).wait(1).to({y:435.35,alpha:0.9703},0).wait(1).to({y:433.5,alpha:0.9929},0).wait(1).to({regX:68,regY:42.6,x:78.95,y:450.75,alpha:1},0).wait(185).to({regY:42.8,x:78.9,y:666.9,alpha:0},8,cjs.Ease.quartInOut).to({regY:42.6,x:78.95,y:1050.75},22,cjs.Ease.quartInOut).to({_off:true},1).wait(65));

	// primary_cta
	this.instance_5 = new lib.primary_cta();
	this.instance_5.setTransform(150,1153,1,1,0,0,0,72,17);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;
	new cjs.ButtonHelper(this.instance_5, 0, 1, 2, false, new lib.primary_cta(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(119).to({_off:false},0).wait(1).to({regX:71.1,regY:-235,x:149.1,y:898.5},0).wait(1).to({y:894.25},0).wait(1).to({y:888},0).wait(1).to({y:879.35},0).wait(1).to({y:867.75},0).wait(1).to({y:852.65},0).wait(1).to({y:833.2},0).wait(1).to({y:808.25},0).wait(1).to({y:776.2},0).wait(1).to({y:735.2},0).wait(1).to({y:683.55},0).wait(1).to({y:621.7},0).wait(1).to({y:555.55},0).wait(1).to({y:494.6},0).wait(1).to({y:444.3},0).wait(1).to({y:405.05},0).wait(1).to({y:374.85},0).wait(1).to({y:351.75},0).wait(1).to({regX:72,regY:17,x:150,y:586.2},0).wait(1).to({regX:71.1,regY:-235,x:149.1,y:322.5,alpha:0.3518},0).wait(1).to({y:313.9,alpha:0.6106},0).wait(1).to({y:307.85,alpha:0.7935},0).wait(1).to({y:303.85,alpha:0.9131},0).wait(1).to({y:301.65,alpha:0.9794},0).wait(1).to({regX:72,regY:17,x:150,y:553,alpha:1},0).wait(146).to({regX:71.1,regY:-235,x:149.1,y:302.7,alpha:0.9487},0).wait(1).to({y:305.6,alpha:0.8612},0).wait(1).to({y:309.9,alpha:0.7315},0).wait(1).to({y:315.85,alpha:0.5519},0).wait(1).to({y:323.75,alpha:0.3124},0).wait(1).to({regX:72,regY:17,x:150,y:586.15,alpha:0},0).wait(1).to({regX:71.1,regY:-235,x:149.1,y:353.95},0).wait(1).to({y:379.45},0).wait(1).to({y:412.1},0).wait(1).to({y:453.85},0).wait(1).to({y:506.55},0).wait(1).to({y:569.55},0).wait(1).to({y:636.95},0).wait(1).to({y:699.15},0).wait(1).to({y:750.35},0).wait(1).to({y:790.4},0).wait(1).to({y:821.2},0).wait(1).to({y:844.75},0).wait(1).to({y:862.65},0).wait(1).to({y:876.15},0).wait(1).to({y:886.05},0).wait(1).to({y:893.05},0).wait(1).to({y:897.65},0).wait(1).to({y:900.2},0).wait(1).to({regX:72,regY:17,x:150,y:1153},0).wait(76));

	// background_colour
	this.instance_6 = new lib.mc_background();
	this.instance_6.setTransform(150,300,1,1,0,0,0,150,300);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({y:-300},24,cjs.Ease.quartInOut).wait(285).to({y:300},25,cjs.Ease.cubicInOut).wait(56));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(149.1,-300,150.9,1501.1);
// library properties:
lib.properties = {
	id: '05920BE2A36F420086AAC3866015E257',
	width: 300,
	height: 600,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['05920BE2A36F420086AAC3866015E257'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;