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
	this.shape_43.graphics.f("#33FF00").s().p("A/UaQMAAAg0fMA+pAAAMAAAA0fg");
	this.shape_43.setTransform(72.475,-111.05);
	this.shape_43._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_43).wait(3).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-128,-279,401,336);


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
	this.shape.setTransform(315.125,47.575);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AghBDIACgPQANAGAOAAQAcAAAAgdIAAgNQgIAPgRAAQgSAAgLgNQgLgNAAgZQAAg0AwAAQAUAAAPAFIAABeQAAAuguAAQgQAAgNgGgAgXgUQAAAkAaAAQAMAAAJgJIAAg/QgHgCgKAAQgeAAAAAmg");
	this.shape_1.setTransform(306.925,45.775);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AAWAzIAAg9QABgagWAAQgMAAgLALIAABMIgRAAIAAhiIARAAIAAAPQALgSASAAQAQAAAIAJQAJAJAAAQIAABDg");
	this.shape_2.setTransform(296.55,43.525);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgHBHIAAhiIAQAAIAABigAgHgzQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDADgFAAQgEAAgDgDg");
	this.shape_3.setTransform(288.75,41.475);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AAUBGIgog0IAAgBIAkgsIAVAAIgmAsIApA1gAgnBGIAAiJQAHgDAKAAIAACMg");
	this.shape_4.setTransform(282.15,41.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AAXAzIAAg9QAAgagWAAQgMAAgKALIAABMIgSAAIAAhiIARAAIABAPQAKgSASAAQAQAAAJAJQAHAJABAQIAABDg");
	this.shape_5.setTransform(271.25,43.525);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgdAsQgJgIAAgOQAAgRAMgIQANgJAegBIAFAAIAAgFQAAgKgFgEQgFgFgLAAQgSAAgPAHQAAgHABgHQAOgHAUAAQAkAAAAAgIAABEIgQAAIgBgOQgJARgTAAQgPAAgIgIgAgNAGQgIAFAAAKQAAAIAFAEQAEAFAJAAQAQAAAJgMIAAgbIgDAAQgXABgJAGg");
	this.shape_6.setTransform(260.55,43.65);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgpBCIAAiGQAIgDAJAAIAAA3QAJgPARAAQASAAALAMQALAOAAAYQAAA1gwAAQgTAAgQgGgAgYgHIAAA+QAIACAKAAQAeAAAAgmQAAgkgaAAQgMAAgKAKg");
	this.shape_7.setTransform(250.775,41.675);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AglBGIABgOIAGABQAJAAAGgFQAGgGAEgOIgphnIATAAIAdBSIAbhSIASAAIgoBvQgKAggZAAQgFAAgEgCg");
	this.shape_8.setTransform(235.975,45.9);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgdAsQgJgIAAgOQAAgRAMgIQANgJAegBIAFAAIAAgFQAAgKgFgEQgFgFgLAAQgSAAgPAHQAAgHABgHQAOgHAUAAQAkAAAAAgIAABEIgQAAIgBgOQgJARgTAAQgPAAgIgIgAgNAGQgIAFAAAKQAAAIAFAEQAEAFAJAAQAQAAAJgMIAAgbIgDAAQgXABgJAGg");
	this.shape_9.setTransform(225.9,43.65);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgeA7QgLgNAAgaQAAgzAwAAIASABIAAgmQAHgDAKAAIAACMIgQAAIgBgNQgJAQgRAAQgSAAgLgNgAgXAUQAAAlAaAAQAMAAAKgJIAAg/QgIgCgKAAQgeAAAAAlg");
	this.shape_10.setTransform(215.475,41.675);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AglBGIABgOIAGABQAJAAAGgFQAGgGAEgOIgphnIATAAIAdBSIAbhSIASAAIgoBvQgKAggZAAQgFAAgEgCg");
	this.shape_11.setTransform(205.625,45.9);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgaAzIAAhiIAQAAIABAOQAJgRAPAAQAGAAAGACQAAAJgCAGIgMgBQgNAAgJAKIAABLg");
	this.shape_12.setTransform(197.975,43.525);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgdAmQgMgOAAgYQAAgWAKgOQAMgPAVAAQAUAAAKAMQAKAMAAAVIgBAMIhAAAQACAgAdAAQARgBAOgHIgDAPQgOAHgPAAQgYAAgMgOgAAZgHQAAgegYAAQgWAAgCAeIAwAAIAAAAg");
	this.shape_13.setTransform(188.725,43.65);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgHAxIglhhIASAAIAaBQIAchQIARAAIglBhg");
	this.shape_14.setTransform(179.025,43.65);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgdAmQgMgOAAgYQAAgWAKgOQAMgPAVAAQAUAAAKAMQAKAMAAAVIgBAMIhAAAQACAgAdAAQARgBAOgHIgDAPQgOAHgPAAQgYAAgMgOgAAZgHQAAgegYAAQgWAAgCAeIAwAAIAAAAg");
	this.shape_15.setTransform(169.275,43.65);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgaAzIAAhiIAQAAIABAOQAJgRAPAAQAGAAAGACQAAAJgCAGIgMgBQgNAAgJAKIAABLg");
	this.shape_16.setTransform(157.125,43.525);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AgeApQgJgJABgQIAAhCIARAAIAAA9QAAAZAVAAQAMAAALgLIAAhLIARAAIAABiIgRAAIAAgPQgLASgSAAQgQAAgIgKg");
	this.shape_17.setTransform(147.5,43.775);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AghAmQgLgOAAgYQAAgYALgNQAMgOAVAAQAVAAAMAOQAMANAAAYQAAAYgMAOQgMAOgVAAQgVAAgMgOgAgbAAQAAAmAbAAQAbAAAAgmQAAglgbAAQgbAAAAAlg");
	this.shape_18.setTransform(136.875,43.65);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AglBGIABgOIAGABQAJAAAGgFQAGgGAEgOIgphnIATAAIAdBSIAbhSIASAAIgoBvQgKAggZAAQgFAAgEgCg");
	this.shape_19.setTransform(126.725,45.9);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AghAmQgLgOAAgYQAAgYALgNQAMgOAVAAQAVAAAMAOQAMANAAAYQAAAYgMAOQgMAOgVAAQgVAAgMgOgAgbAAQAAAmAbAAQAbAAAAgmQAAglgbAAQgbAAAAAlg");
	this.shape_20.setTransform(112.325,43.65);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AgXAjIAAhhQAHgDAKAAIAAAeIAeAAIgBAOIgdAAIAAA2QAAASAPAAQAIAAAHgEIgCAPQgJAEgIAAQgcAAAAgfg");
	this.shape_21.setTransform(104,42.275);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AAXAzIAAg9QAAgagWAAQgMAAgKALIAABMIgRAAIAAhiIAQAAIABAPQAKgSASAAQAQAAAJAJQAHAJABAQIAABDg");
	this.shape_22.setTransform(94.85,43.525);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AgHBHIAAhiIAQAAIAABigAgGgzQgEgDAAgFQAAgFAEgDQADgDADAAQAFAAADADQADADAAAFQAAAFgDADQgDADgFAAQgDAAgDgDg");
	this.shape_23.setTransform(87.05,41.475);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AglBGIABgOIAGABQAJAAAGgFQAGgGAEgOIgphnIATAAIAdBSIAbhSIASAAIgoBvQgKAggZAAQgFAAgEgCg");
	this.shape_24.setTransform(75.575,45.9);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AgXAjIAAhhQAIgDAJAAIAAAeIAeAAIgBAOIgdAAIAAA2QAAASAPAAQAIAAAHgEIgCAPQgIAEgJAAQgcAAAAgfg");
	this.shape_25.setTransform(67.75,42.275);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AgIBHIAAhiIARAAIAABigAgHgzQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDADgFAAQgEAAgDgDg");
	this.shape_26.setTransform(61.6,41.475);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AgSAtIAAhxQAHgDAKAAIAAByQAAAOALAAQAGAAADgCQAAAHgCAHQgFADgIAAQgWAAAAgbg");
	this.shape_27.setTransform(57,41.675);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AgIBHIAAhiIARAAIAABigAgHgzQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDADgFAAQgEAAgDgDg");
	this.shape_28.setTransform(51.35,41.475);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AgpBCIAAiGQAIgDAJAAIAAA3QAJgPARAAQASAAALAMQALAOAAAYQAAA1gwAAQgTAAgQgGgAgYgHIAAA+QAIACAKAAQAeAAAAgmQAAgkgaAAQgMAAgKAKg");
	this.shape_29.setTransform(43.975,41.675);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AgIBHIAAhiIARAAIAABigAgHgzQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDADgFAAQgEAAgDgDg");
	this.shape_30.setTransform(35.95,41.475);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AAYAxIgYgkIgYAkIgTAAIAjgwIgjgxIAUAAIAXAkIAZgkIATAAIgjAwIAjAxg");
	this.shape_31.setTransform(28.975,43.65);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AgdAmQgMgOAAgYQAAgWAKgOQAMgPAVAAQAUAAAKAMQAKAMAAAVIgBAMIhAAAQACAgAdAAQARgBAOgHIgDAPQgOAHgPAAQgYAAgMgOgAAZgHQAAgegYAAQgWAAgCAeIAwAAIAAAAg");
	this.shape_32.setTransform(19.275,43.65);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AgSAtIAAhxQAHgDAKAAIAAByQAAAOALAAQAGAAADgCQAAAHgCAHQgFADgIAAQgWAAAAgbg");
	this.shape_33.setTransform(12,41.675);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AgZBHIAAhrQAAgiAiAAQAKAAAHACIgBAPQgIgCgHAAQgKAAgEAFQgEAEAAALIAAAIIAgAAIgBAOIgfAAIAABUg");
	this.shape_34.setTransform(6.125,41.525);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AglBHIABgPIAGABQAJAAAGgFQAGgFAEgOIgphoIATAAIAdBSIAbhSIASAAIgoBvQgKAggZAAQgFAAgEgBg");
	this.shape_35.setTransform(330.675,22);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AgVAnQgNgOAAgZQAAgZANgNQANgNAVAAQAMAAAKAEQAAAHgCAHQgJgEgKABQgOgBgIALQgJAKAAAQQABASAHAKQAJAJAOAAQAMAAAJgEIgCAOQgJAFgMAAQgVAAgMgNg");
	this.shape_36.setTransform(321.55,19.75);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AAXAzIAAg9QgBgagVAAQgMAAgKALIAABMIgRAAIAAhiIAPAAIACAPQAJgSAUAAQAPAAAJAJQAHAJAAAQIAABDg");
	this.shape_37.setTransform(311.9,19.625);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AgdAmQgMgNAAgZQAAgXAKgNQAMgPAVAAQAUAAAKANQAKALAAAUIgBANIhAAAQACAfAdAAQARABAOgJIgDAQQgOAHgPAAQgYAAgMgOgAAZgHQAAgegYAAQgWAAgCAeIAwAAIAAAAg");
	this.shape_38.setTransform(301.375,19.75);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AgaAzIAAhiIAQAAIABAOQAJgRAPAAQAGAAAGACQAAAJgCAGIgMgBQgNAAgJAKIAABLg");
	this.shape_39.setTransform(293.525,19.625);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AgaAzIAAhiIAQAAIABAOQAJgRAPAAQAGAAAGACQAAAJgCAGIgMgBQgNAAgJAKIAABLg");
	this.shape_40.setTransform(286.525,19.625);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AgeApQgJgJABgQIAAhCIARAAIAAA9QAAAZAVAAQANAAAKgLIAAhLIARAAIAABiIgQAAIgBgPQgKASgUAAQgPAAgIgKg");
	this.shape_41.setTransform(276.9,19.875);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AgVAnQgNgOAAgZQAAgZANgNQAMgNAWAAQANAAAJAEQAAAHgCAHQgJgEgKABQgOgBgIALQgIAKgBAQQAAASAJAKQAIAJANAAQANAAAJgEIgCAOQgJAFgMAAQgVAAgMgNg");
	this.shape_42.setTransform(267.25,19.75);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AgbAIQgBgIACgHIA2AAIgBAPg");
	this.shape_43.setTransform(259.25,18.75);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AgHBHIAAhiIAQAAIAABigAgHgzQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDADgFAAQgEAAgDgDg");
	this.shape_44.setTransform(253.2,17.575);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AgXAjIAAhhQAHgDAKAAIAAAeIAeAAIgBAOIgdAAIAAA2QAAASAPAAQAIAAAHgEIgCAPQgIAEgJAAQgcAAAAgfg");
	this.shape_45.setTransform(247.85,18.375);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AgSAtIAAhxQAIgDAJAAIAAByQAAAOALAAQAGAAADgCQAAAHgCAHQgGADgGAAQgXAAAAgbg");
	this.shape_46.setTransform(241.8,17.775);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AgfApQgHgJAAgQIAAhCIARAAIAAA9QAAAZAVAAQANAAAJgLIAAhLIARAAIAABiIgPAAIgCgPQgJASgUAAQgPAAgJgKg");
	this.shape_47.setTransform(233.05,19.875);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AA1AzIAAg9QAAgagVAAQgNAAgLALIABAJIAABDIgQAAIAAg9QAAgagWAAQgNAAgKALIAABMIgRAAIAAhiIAQAAIABAPQAKgSAUAAQAWAAAGASQAMgSAUAAQAQAAAIAJQAIAJAAAQIAABDg");
	this.shape_48.setTransform(219.275,19.625);

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

}).prototype = getMCSymbolPrototype(lib.mc_level2, new cjs.Rectangle(0,0,337.7,56.8), null);


(lib.mc_level1_animated_336 = function(mode,startPosition,loop) {
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
	this.shape.setTransform(223.425,85.375);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(28).to({_off:false},0).wait(352));

	// o
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EC0000").s().p("AhGBSQgZgdAAg1QAAgzAZgeQAZgeAtAAQAuAAAaAeQAYAeAAAzQAAA1gZAdQgZAeguAAQgtAAgZgegAg5AAQAABRA5AAQA7AAAAhRQAAhQg7AAQg5AAAABQg");
	this.shape_1.setTransform(201.575,85.125);
	this.shape_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(27).to({_off:false},0).wait(353));

	// y
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EC0000").s().p("AhPCYQAAgTACgMIANACQATAAAMgLQAMgMAJgeIhWjgIAnAAIA/CzIA5izIAmAAIhUDxQgXBEg0AAQgKAAgJgDg");
	this.shape_2.setTransform(180.875,89.95);
	this.shape_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(26).to({_off:false},0).wait(354));

	// s
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EC0000").s().p("AhIBhQAAgPAFgQQAaAPAgAAQAtAAAAgdQAAgNgJgHQgHgHgTgHIgQgHQgcgKgMgMQgQgQAAgZQAAgcAUgPQAUgQAkAAQAiAAAbAKQgCARgDANQgcgJgaAAQgqAAAAAbQAAAWAjAOIASAHQAdAKAMAMQAOAPAAAWQAAAcgVARQgVASgnAAQgmAAgagPg");
	this.shape_3.setTransform(153.975,85.125);
	this.shape_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(25).to({_off:false},0).wait(355));

	// t
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#EC0000").s().p("AgyBMIAAjSQAQgGAVAAIAABAIBAAAIgDAfIg9AAIAAB1QAAAmAgAAQARAAAPgIIgFAgQgPAHgUAAQg9AAAAhBg");
	this.shape_4.setTransform(138.75,82.175);
	this.shape_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(24).to({_off:false},0).wait(356));

	// i
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#EC0000").s().p("AgRCZIAAjVIAjAAIAADVgAgQhuQgHgIAAgKQAAgLAHgGQAGgHAKAAQAKAAAHAHQAHAGAAALQAAALgHAGQgHAHgKAAQgKAAgGgGg");
	this.shape_5.setTransform(126.5,80.5);
	this.shape_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(23).to({_off:false},0).wait(357));

	// u
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#EC0000").s().p("AhTAiIAAiOIAlAAIAACJQAAAaALAMQANAMAbAAQATAAAXgFIAAi2IAlAAIAADMQgsANgkAAQhXAAAAhLg");
	this.shape_6.setTransform(110.775,85.375);
	this.shape_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(22).to({_off:false},0).wait(358));

	// s
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#EC0000").s().p("AhIBhQAAgPAFgQQAaAPAgAAQAtAAAAgdQAAgNgJgHQgHgHgTgHIgQgHQgcgKgMgMQgQgQAAgZQAAgcAUgPQAUgQAkAAQAiAAAbAKQgCARgDANQgcgJgaAAQgqAAAAAbQAAAWAjAOIASAHQAdAKAMAMQAOAPAAAWQAAAcgVARQgVASgnAAQgmAAgagPg");
	this.shape_7.setTransform(91.175,85.125);
	this.shape_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(21).to({_off:false},0).wait(359));

	// t
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#EC0000").s().p("AgyBMIAAjSQAPgGAWAAIAABAIBAAAIgDAfIg9AAIAAB1QAAAmAgAAQARAAAPgIIgFAgQgPAHgUAAQg9AAAAhBg");
	this.shape_8.setTransform(67.55,82.175);
	this.shape_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(20).to({_off:false},0).wait(360));

	// a
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#EC0000").s().p("Ag/BVQgYgcAAg4QAAhwBmAAQAoAAAgAMIAADOIghAAIgDgdQgSAiglAAQgnAAgUgbgAgxAAQABBRA1AAQAbAAASgUIAAiJQgRgEgTAAQg/AAAABQg");
	this.shape_9.setTransform(48.35,85.125);
	this.shape_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(19).to({_off:false},0).wait(361));

	// h
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#EC0000").s().p("AAvCXIAAiJQAAgxgxAAQgWAAgWAJIAACxIglAAIAAkoQAPgGAWABIAABfQAYgKAYAAQBSAAAABKIAACOg");
	this.shape_10.setTransform(27.2,80.65);
	this.shape_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(18).to({_off:false},0).wait(362));

	// t
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#EC0000").s().p("AgyBMIAAjSQAPgGAWAAIAABAIBAAAIgDAfIg9AAIAAB1QAAAmAgAAQARAAAOgIIgEAgQgPAHgUAAQg9AAAAhBg");
	this.shape_11.setTransform(9.65,82.175);
	this.shape_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(17).to({_off:false},0).wait(363));

	// y
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#EC0000").s().p("AhPCYQAAgTACgLIANABQATAAAMgLQAMgMAJgeIhWjgIAnAAIA/CyIA5iyIAmAAIhUDwQgXBFg0AAQgKAAgJgDg");
	this.shape_12.setTransform(342.525,44.9);
	this.shape_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(16).to({_off:false},0).wait(364));

	// c
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#EC0000").s().p("AguBUQgbgdAAg3QAAg0AZgdQAageAxAAQAdAAASAJQAAAOgDAQQgTgHgYAAQg/AAAABQQAAAmARAVQARAVAeAAQAZAAAUgLQgBARgEAPQgRAKgbAAQgsAAgbgcg");
	this.shape_13.setTransform(324.025,40.075);
	this.shape_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(15).to({_off:false},0).wait(365));

	// n
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#EC0000").s().p("AAvBtIAAiJQAAgagLgMQgMgMgcAAQgUAAgWAGIAAC1IglAAIAAjMQArgNAlAAQBXAAAABLIAACOg");
	this.shape_14.setTransform(304.4,39.825);
	this.shape_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(14).to({_off:false},0).wait(366));

	// e
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#EC0000").s().p("Ag/BSQgagdAAg2QAAgxAWgdQAaggAsAAQArAAAXAbQAVAZAAAsIgCAbIiLAAQAGBFBAAAQAiAAAegRQgCAUgEANQgYAPgnAAQgyAAgbgegAA0gRQAAg/gyAAQguAAgGA/IBmAAIAAAAg");
	this.shape_15.setTransform(282.45,40.075);
	this.shape_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_15).wait(13).to({_off:false},0).wait(367));

	// r
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#EC0000").s().p("Ag4BtIAAjNQAhgMAkAAQAaAAASAEQAAAUgEAMQgPgEgYAAQgPAAgSAEIAAC1g");
	this.shape_16.setTransform(265.875,39.875);
	this.shape_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(12).to({_off:false},0).wait(368));

	// r
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#EC0000").s().p("Ag4BtIAAjNQAhgMAkAAQAaAAASAEQAAAUgEAMQgPgEgYAAQgPAAgSAEIAAC1g");
	this.shape_17.setTransform(251.175,39.875);
	this.shape_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_17).wait(11).to({_off:false},0).wait(369));

	// u
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#EC0000").s().p("AhTAiIAAiOIAlAAIAACJQAAAaALAMQANAMAbAAQATAAAXgFIAAi2IAlAAIAADMQgsANgkAAQhXAAAAhLg");
	this.shape_18.setTransform(231.625,40.325);
	this.shape_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_18).wait(10).to({_off:false},0).wait(370));

	// c
	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#EC0000").s().p("AguBUQgbgdAAg3QAAg0AZgdQAageAxAAQAdAAASAJQAAAOgDAQQgTgHgYAAQg/AAAABQQAAAmARAVQARAVAeAAQAZAAAUgLQgBARgEAPQgRAKgbAAQgsAAgbgcg");
	this.shape_19.setTransform(212.025,40.075);
	this.shape_19._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_19).wait(9).to({_off:false},0).wait(371));

	// e
	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#EC0000").s().p("Ag/BSQgagdAAg2QAAgxAXgdQAYggAtAAQAsAAAWAbQAVAZAAAsIgCAbIiLAAQAGBFBAAAQAiAAAegRQgCAUgEANQgYAPgmAAQg0AAgagegAA0gRQgBg/gxAAQgvAAgFA/IBmAAIAAAAg");
	this.shape_20.setTransform(184.1,40.075);
	this.shape_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_20).wait(8).to({_off:false},0).wait(372));

	// h
	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#EC0000").s().p("AAvCYIAAiKQAAgygxABQgWgBgWAJIAACzIglAAIAAkpQAPgFAWgBIAABhQAYgLAZAAQBRAAAABKIAACPg");
	this.shape_21.setTransform(162.9,35.6);
	this.shape_21._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_21).wait(7).to({_off:false},0).wait(373));

	// t
	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#EC0000").s().p("AgyBMIAAjSQAPgGAWAAIAABAIBAAAIgDAfIg9AAIAAB1QAAAmAgAAQAQAAAPgIIgEAgQgPAHgUAAQg9AAAAhBg");
	this.shape_22.setTransform(145.35,37.125);
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
p.nominalBounds = new cjs.Rectangle(0,0,354.5,111.1);


(lib.mc_background = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EC0000").s().p("A3bV4MAAAgrvMAu3AAAMAAAArvg");
	this.shape.setTransform(150,125.4993,1,0.8964);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_background, new cjs.Rectangle(0,0,300,251), null);


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
	this.shape.graphics.f("#FFFFFF").s().p("AM7GsQgVgZAAgtQAAgvAXgZQAYgZAuAAQAgABAbAJIAACxIgXAAIgBgPQgUATgbgBQgmAAgWgXgANPEvQgQATAAAkQAAAiAOAUQAPATAdAAQAaAAATgSIAAh+QgRgDgSAAQgiAAgSATgAG1GpQgWgZAAgqQAAgtAXgaQAXgaApAAQAqAAAWAbQAVAZAAAqQAAAtgWAZQgYAagpAAQgpAAgWgagAHIEwQgQASAAAiQAAAjAQAUQAPASAfABQAdgBAQgTQAPgUAAghQAAgjgPgTQgQgTgdAAQgeAAgQAUgADnGLIAAi9QAMgEAMAAIAABBIBAAAQgBAOgCAIIg9AAIAABoQAAAmAigBQAPAAAQgFIgEAVQgOAGgRgBQg3AAABg4gAA2GsQgWgZABgtQAAgvAWgZQAYgZAvAAQAgABAbAJIAACxIgXAAIgBgPQgVATgagBQgnAAgVgXgABKEvQgQATAAAkQAAAiAOAUQAPATAdAAQAaAAASgSIAAh+QgQgDgSAAQgjAAgRATgAm6GqQgWgZgBgtQABgqASgZQAWgbAogBQAmAAAUAZQASAVAAAkQAAANgBAJIiDAAQADAgAQAQQARARAdAAQAigBAZgPIgDAYQgXANghAAQgrAAgYgZgAmoErQgOAQgCAcIBrAAIAAgCQAAgagMgQQgOgQgaAAQgZAAgOAQgAo3GLIAAi9QALgEAOAAIAABBIA/AAQgBANgBAJIg9AAIAABoQgBAmAjgBQAPAAAPgFIgDAVQgPAGgRgBQg2AAAAg4gAPuHAIAAjyQAPgEAKAAIAAD2gALpHAIAAhzQAAgagLgLQgNgMgfAAQgVAAgUAEIAACgIgZAAIAAixQAlgJAdgBQArAAATASQASAQAAAiIAAB3gAFiHAIAAi2IAYAAIAAC2gAgcHAIAAhzQAAgagLgLQgMgMggAAQgTAAgWAEIAACgIgYAAIAAixQAkgJAegBQArAAATASQASAQAAAiIAAB3gAkOHAIAAixQAMgEAQgCQAQgDAPAAQAUAAAKACQAAANgCAIQgLgBgQAAQgQAAgTADIAAChgAp8HAIAAhzQABgagMgLQgNgMgfAAQgUAAgVAEIAACgIgZAAIAAixQAlgJAdgBQAsAAATASQARAQAAAiIAAB3gAtJHAIAAjyQAPgEAJAAIAAD2gAFjDpQgGgFAAgHQAAgHAGgFQAEgEAHAAQAHAAAEAEQAFAFABAHQgBAHgFAFQgEAFgHAAQgHAAgEgFgA2KAeQhRgrAAg+QAAgsArgkQArgkBHgTQgCAjASAfIBWCUQAKARAEATIADgGQAQgcAAgfQAAgggQgcIhFh4QgQgcAAgfQAAghAQgcIAEgGQAEATAJARIBoC0QAKARAEATIAEgGQAQgcAAgfQAAgggQgdIhGh4QgQgbAAghQAAgfAQgcIAEgHQADATAKARIBXCXQAPAZABAdQBGATArAkQAsAkAAAsQAAA+hRArQhRAshzAAQhyAAhRgsgAtLAtQACgbAJgZQAUAJAbAFQAZAFAWABQAlAAATgMQAUgLAAgXQAAgVgQgPQgOgMgngRIgagLQgogSgUgVQgWgaAAgnQAAguAfgYQAggbA+AAQA0AAArAPQgCAcgJAYQgTgIgZgDQgVgEgTAAQgiAAgRANQgQALAAAVQAAATAPAOQANAMAdANIAcAMQAyAVAWAYQAVAZAAAmQAAAtghAbQgjAbhBAAQg/AAgsgTgARHAZQgjgjAAhEQAAg/AdgkQAhgoBAAAQA7AAAfAkQAbAfABA0QgBAVgDAXIi2AAQAFAjAVARQAVAQAmAAQAwAAArgTQgEAcgFAXQgjAQgwAAQhHAAgkglgATehlQgBghgQgRQgQgSgdAAQg8AAgHBEICBAAIAAAAgAMgAaQgegjAAhAQAAhGAkgkQAlgmBHAAQAWAAAUAEIAAhVQAXgIAiAAIAAFqIg0AAIgDghQgMAUgRAJQgSAKgcAAQg0ABgfglgANQiPQgVAYAAAuQABApAQAXQATAZAkAAQAgAAAZgTIAAigQgYgFgVAAQgqAAgVAZgADdAaQgggjAAhAQAAhGAkgkQAlgmBHAAQA5AAApAPIAAECIg0AAIgDgfQgXAlgyAAQg0ABgeglgAEMiPQgVAZAAAtQAAApARAXQASAZAlAAQAfAAAZgSIAAiiQgTgEgXAAQgqAAgXAZgAAZgZIAAkQQAZgJAfAAIAABiIBaAAQgBAbgDAWIhWAAIAAB/QABAuArAAQAYAAAVgIQgDAcgEAUQgUAIgcAAQhaAAAAhXgAoXAaQgggjAAhAQAAhGAkgkQAlgmBIAAQA4AAAqAPIAAECIg1AAIgCgfQgYAlgxAAQg1ABgeglgAnniPQgWAZABAtQAAApAQAXQATAZAlAAQAeAAAZgSIAAiiQgTgEgWAAQgsAAgVAZgAVIA4IAAkCQATgGAcgFQAbgEAYAAQAhABARABIgBAbQgCAPgCAHQgTgCgZAAQgUAAgVAEIAADcgAKaA4IAAijQAAghgNgNQgQgPgpAAQgUAAgZAFIAADbIg5AAIAAkCQAcgGAbgFQAcgEAVAAQBEAAAfAbQAbAYAAAxIAACtgAhZA4IAAijQAAghgNgNQgRgPgpAAQgTAAgaAFIAADbIg5AAIAAkCQAcgGAbgFQAcgEAVAAQBFAAAeAbQAbAYAAAxIAACtg");
	this.shape.setTransform(150,45.15);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Logo_SantanderInternationalneg, new cjs.Rectangle(0,0,300,90.3), null);


// stage content:
(lib._336x280 = function(mode,startPosition,loop) {
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
	this.shape.graphics.f().s("#EC0000").ss(2,1,1).p("A3bzhMAu3AAAMAAAAnDMgu3AAAg");
	this.shape.setTransform(167.9998,139.9891,1.12,1.12);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.004)").s().p("A3bTiMAAAgnDMAu3AAAMAAAAnDg");
	this.shape_1.setTransform(167.9998,139.9891,1.12,1.12);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(390));

	// background_colour_copy (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_1 = new cjs.Graphics().p("A6PV+MAAAgr6MA0fAAAMAAAAr6g");
	var mask_graphics_2 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_3 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_4 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_5 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_6 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_7 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_8 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_9 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_10 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_11 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_12 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_13 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_14 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_15 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_16 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_17 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_18 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_19 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_20 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_21 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_22 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_23 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_24 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_25 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_26 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_27 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_28 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_29 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_30 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_31 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_32 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_33 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_34 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_35 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_36 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_37 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_38 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_39 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_40 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_41 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_42 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_43 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_44 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_45 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_46 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_47 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_48 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_49 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_50 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_51 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_52 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_53 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_54 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_55 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_56 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_57 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_58 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_59 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_60 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_61 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_62 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_63 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_64 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_65 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_66 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_67 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_68 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_69 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_70 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_71 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_72 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_73 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_74 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_75 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_76 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_77 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_78 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_79 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_80 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_81 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_82 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_83 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_84 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_85 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_86 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_87 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_88 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_89 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_90 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_91 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_92 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_93 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_94 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_95 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_96 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_97 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_98 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_99 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_100 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_101 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_102 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_103 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_104 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_105 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_106 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_107 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_108 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_109 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_110 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_111 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_112 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_113 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_114 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_115 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_116 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_117 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_118 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_119 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_120 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_121 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_122 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_123 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_124 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_125 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_126 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_127 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_128 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_129 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_130 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_131 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_132 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_133 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_134 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_135 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_136 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_137 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_138 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_139 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_140 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_141 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_142 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_143 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_144 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_145 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_146 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_147 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_148 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_149 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_150 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_151 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_152 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_153 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_154 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_155 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_156 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_157 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_158 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_159 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_160 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_161 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_162 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_163 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_164 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_165 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_166 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_167 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_168 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_169 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_170 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_171 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_172 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_173 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_174 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_175 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_176 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_177 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_178 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_179 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_180 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_181 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_182 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_183 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_184 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_185 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_186 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_187 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_188 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_189 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_190 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_191 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_192 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_193 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_194 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_195 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_196 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_197 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_198 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_199 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_200 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_201 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_202 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_203 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_204 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_205 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_206 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_207 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_208 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_209 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_210 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_211 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_212 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_213 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_214 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_215 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_216 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_217 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_218 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_219 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_220 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_221 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_222 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_223 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_224 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_225 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_226 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_227 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_228 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_229 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_230 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_231 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_232 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_233 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_234 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_235 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_236 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_237 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_238 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_239 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_240 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_241 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_242 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_243 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_244 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_245 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_246 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_247 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_248 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_249 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_250 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_251 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_252 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_253 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_254 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_255 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_256 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_257 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_258 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_259 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_260 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_261 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_262 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_263 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_264 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_265 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_266 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_267 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_268 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_269 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_270 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_271 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_272 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_273 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_274 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_275 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_276 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_277 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_278 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_279 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_280 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_281 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_282 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_283 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_284 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_285 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_286 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_287 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_288 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_289 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_290 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_291 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_292 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_293 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_294 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_295 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_296 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_297 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_298 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_299 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_300 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_301 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_302 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_303 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_304 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_305 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_306 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_307 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_308 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_309 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_310 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_311 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_312 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_313 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_314 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_315 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_316 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_317 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_318 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_319 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_320 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_321 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_322 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_323 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_324 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_325 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_326 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_327 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_328 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_329 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_330 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_331 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_332 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_333 = new cjs.Graphics().p("A6PV+MAAAgr6MA0fAAAMAAAAr6g");
	var mask_graphics_334 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_335 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_336 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_337 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_338 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_339 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_340 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_341 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_342 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_343 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_344 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_345 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_346 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_347 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_348 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_349 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_350 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_351 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_352 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_353 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_354 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_355 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_356 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_357 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_358 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_359 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_360 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_361 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_362 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_363 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_364 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_365 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_366 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_367 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_368 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_369 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_370 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_371 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_372 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_373 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_374 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_375 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_376 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_377 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_378 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_379 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_380 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_381 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_382 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_383 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_384 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_385 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_386 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_387 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_388 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");
	var mask_graphics_389 = new cjs.Graphics().p("A6PV+MAAAgr7MA0fAAAMAAAAr7g");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_1,x:168.0197,y:140.5797}).wait(1).to({graphics:mask_graphics_2,x:168.0197,y:140.5047}).wait(1).to({graphics:mask_graphics_3,x:168.0197,y:140.0547}).wait(1).to({graphics:mask_graphics_4,x:168.0197,y:138.8547}).wait(1).to({graphics:mask_graphics_5,x:168.0197,y:136.4047}).wait(1).to({graphics:mask_graphics_6,x:168.0197,y:131.8547}).wait(1).to({graphics:mask_graphics_7,x:168.0197,y:124.4047}).wait(1).to({graphics:mask_graphics_8,x:168.0197,y:112.9547}).wait(1).to({graphics:mask_graphics_9,x:168.0197,y:96.3047}).wait(1).to({graphics:mask_graphics_10,x:168.0197,y:73.1047}).wait(1).to({graphics:mask_graphics_11,x:168.0197,y:41.7547}).wait(1).to({graphics:mask_graphics_12,x:168.0197,y:0.6047}).wait(1).to({graphics:mask_graphics_13,x:168.0197,y:-40.5953}).wait(1).to({graphics:mask_graphics_14,x:168.0197,y:-71.8953}).wait(1).to({graphics:mask_graphics_15,x:168.0197,y:-95.1453}).wait(1).to({graphics:mask_graphics_16,x:168.0197,y:-111.7953}).wait(1).to({graphics:mask_graphics_17,x:168.0197,y:-123.2453}).wait(1).to({graphics:mask_graphics_18,x:168.0197,y:-130.6953}).wait(1).to({graphics:mask_graphics_19,x:168.0197,y:-135.2453}).wait(1).to({graphics:mask_graphics_20,x:168.0197,y:-137.6953}).wait(1).to({graphics:mask_graphics_21,x:168.0197,y:-138.8953}).wait(1).to({graphics:mask_graphics_22,x:168.0197,y:-139.3453}).wait(1).to({graphics:mask_graphics_23,x:168.0197,y:-139.4453}).wait(1).to({graphics:mask_graphics_24,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_25,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_26,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_27,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_28,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_29,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_30,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_31,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_32,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_33,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_34,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_35,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_36,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_37,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_38,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_39,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_40,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_41,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_42,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_43,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_44,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_45,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_46,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_47,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_48,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_49,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_50,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_51,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_52,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_53,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_54,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_55,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_56,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_57,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_58,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_59,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_60,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_61,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_62,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_63,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_64,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_65,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_66,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_67,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_68,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_69,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_70,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_71,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_72,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_73,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_74,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_75,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_76,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_77,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_78,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_79,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_80,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_81,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_82,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_83,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_84,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_85,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_86,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_87,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_88,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_89,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_90,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_91,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_92,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_93,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_94,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_95,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_96,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_97,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_98,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_99,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_100,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_101,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_102,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_103,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_104,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_105,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_106,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_107,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_108,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_109,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_110,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_111,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_112,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_113,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_114,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_115,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_116,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_117,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_118,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_119,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_120,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_121,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_122,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_123,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_124,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_125,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_126,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_127,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_128,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_129,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_130,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_131,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_132,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_133,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_134,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_135,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_136,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_137,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_138,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_139,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_140,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_141,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_142,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_143,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_144,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_145,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_146,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_147,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_148,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_149,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_150,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_151,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_152,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_153,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_154,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_155,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_156,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_157,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_158,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_159,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_160,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_161,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_162,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_163,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_164,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_165,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_166,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_167,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_168,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_169,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_170,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_171,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_172,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_173,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_174,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_175,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_176,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_177,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_178,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_179,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_180,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_181,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_182,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_183,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_184,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_185,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_186,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_187,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_188,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_189,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_190,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_191,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_192,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_193,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_194,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_195,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_196,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_197,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_198,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_199,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_200,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_201,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_202,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_203,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_204,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_205,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_206,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_207,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_208,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_209,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_210,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_211,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_212,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_213,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_214,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_215,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_216,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_217,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_218,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_219,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_220,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_221,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_222,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_223,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_224,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_225,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_226,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_227,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_228,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_229,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_230,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_231,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_232,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_233,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_234,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_235,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_236,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_237,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_238,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_239,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_240,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_241,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_242,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_243,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_244,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_245,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_246,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_247,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_248,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_249,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_250,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_251,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_252,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_253,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_254,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_255,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_256,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_257,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_258,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_259,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_260,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_261,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_262,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_263,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_264,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_265,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_266,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_267,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_268,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_269,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_270,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_271,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_272,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_273,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_274,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_275,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_276,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_277,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_278,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_279,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_280,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_281,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_282,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_283,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_284,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_285,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_286,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_287,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_288,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_289,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_290,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_291,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_292,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_293,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_294,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_295,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_296,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_297,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_298,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_299,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_300,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_301,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_302,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_303,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_304,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_305,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_306,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_307,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_308,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_309,x:167.9993,y:-139.4414}).wait(1).to({graphics:mask_graphics_310,x:168.0197,y:-139.2953}).wait(1).to({graphics:mask_graphics_311,x:168.0197,y:-138.7953}).wait(1).to({graphics:mask_graphics_312,x:168.0197,y:-137.3953}).wait(1).to({graphics:mask_graphics_313,x:168.0197,y:-134.7453}).wait(1).to({graphics:mask_graphics_314,x:168.0197,y:-130.3953}).wait(1).to({graphics:mask_graphics_315,x:168.0197,y:-123.8453}).wait(1).to({graphics:mask_graphics_316,x:168.0197,y:-114.7453}).wait(1).to({graphics:mask_graphics_317,x:168.0197,y:-102.6453}).wait(1).to({graphics:mask_graphics_318,x:168.0197,y:-87.0953}).wait(1).to({graphics:mask_graphics_319,x:168.0197,y:-67.6453}).wait(1).to({graphics:mask_graphics_320,x:168.0197,y:-43.9453}).wait(1).to({graphics:mask_graphics_321,x:168.0197,y:-15.4453}).wait(1).to({graphics:mask_graphics_322,x:168.0197,y:16.8047}).wait(1).to({graphics:mask_graphics_323,x:168.0197,y:45.2547}).wait(1).to({graphics:mask_graphics_324,x:168.0197,y:69.0047}).wait(1).to({graphics:mask_graphics_325,x:168.0197,y:88.4547}).wait(1).to({graphics:mask_graphics_326,x:168.0197,y:104.0047}).wait(1).to({graphics:mask_graphics_327,x:168.0197,y:116.1047}).wait(1).to({graphics:mask_graphics_328,x:168.0197,y:125.2047}).wait(1).to({graphics:mask_graphics_329,x:168.0197,y:131.7547}).wait(1).to({graphics:mask_graphics_330,x:168.0197,y:136.1047}).wait(1).to({graphics:mask_graphics_331,x:168.0197,y:138.7547}).wait(1).to({graphics:mask_graphics_332,x:168.0197,y:140.1047}).wait(1).to({graphics:mask_graphics_333,x:168.0197,y:140.5797}).wait(1).to({graphics:mask_graphics_334,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_335,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_336,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_337,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_338,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_339,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_340,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_341,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_342,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_343,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_344,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_345,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_346,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_347,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_348,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_349,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_350,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_351,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_352,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_353,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_354,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_355,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_356,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_357,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_358,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_359,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_360,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_361,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_362,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_363,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_364,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_365,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_366,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_367,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_368,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_369,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_370,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_371,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_372,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_373,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_374,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_375,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_376,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_377,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_378,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_379,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_380,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_381,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_382,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_383,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_384,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_385,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_386,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_387,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_388,x:167.9993,y:140.5586}).wait(1).to({graphics:mask_graphics_389,x:167.9993,y:140.5586}).wait(1));

	// logo_negatif
	this.instance = new lib.Logo_SantanderInternationalneg();
	this.instance.setTransform(297.35,81.5,0.4999,0.4995,0,0,0,408.8,123.1);
	this.instance._off = true;

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(24).to({_off:false},0).wait(286).to({regX:150,regY:45.1,x:168,y:43.45},0).wait(1).to({y:45},0).wait(1).to({y:47.25},0).wait(1).to({y:50.4},0).wait(1).to({y:54.55},0).wait(1).to({y:59.9},0).wait(1).to({y:66.75},0).wait(1).to({y:75.5},0).wait(1).to({y:86.6},0).wait(1).to({y:100.65},0).wait(1).to({y:118.4},0).wait(1).to({regX:408.8,regY:123.3,x:297.4,y:179.05},0).wait(58).to({alpha:0},10).wait(1));

	// logo_pos
	this.instance_1 = new lib.Logo_SantanderInternationalpos();
	this.instance_1.setTransform(297.35,81.5,0.4999,0.4995,0,0,0,408.8,123.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(310).to({regX:150,regY:45.1,x:168,y:43.45},0).wait(1).to({y:45},0).wait(1).to({y:47.25},0).wait(1).to({y:50.4},0).wait(1).to({y:54.55},0).wait(1).to({y:59.9},0).wait(1).to({y:66.75},0).wait(1).to({y:75.5},0).wait(1).to({y:86.6},0).wait(1).to({y:100.65},0).wait(1).to({y:118.4},0).wait(1).to({regX:408.8,regY:123.3,x:297.4,y:179.05},0).wait(69));

	// header_animated
	this.instance_2 = new lib.mc_level1_animated_336();
	this.instance_2.setTransform(98.65,125.65,0.7547,0.7549,0,0,0,86.3,77);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(29).to({_off:false},0).wait(1).to({regX:178,regY:62.9,x:167.85,y:115.05},0).wait(269).to({regX:86.3,regY:77,x:98.65,y:125.65},0).wait(1).to({regX:178,regY:62.9,x:167.85,y:116.85,alpha:0.9911},0).wait(1).to({y:119.95,alpha:0.976},0).wait(1).to({y:124.5,alpha:0.9536},0).wait(1).to({y:130.9,alpha:0.9225},0).wait(1).to({y:139.35,alpha:0.8811},0).wait(1).to({y:150.4,alpha:0.827},0).wait(1).to({y:164.65,alpha:0.7574},0).wait(1).to({y:182.95,alpha:0.6679},0).wait(1).to({y:206.4,alpha:0.5532},0).wait(1).to({y:236.4,alpha:0.4064},0).wait(1).to({y:274.25,alpha:0.2214},0).wait(1).to({regX:86.3,regY:76.9,x:98.65,y:330.15,alpha:0},0).wait(1).to({regX:178,regY:62.9,x:167.85,y:345.75},0).wait(1).to({y:369.95},0).wait(1).to({y:389.85},0).wait(1).to({y:405.4},0).wait(1).to({y:417.4},0).wait(1).to({y:426.55},0).wait(1).to({y:433.5},0).wait(1).to({y:438.75},0).wait(1).to({y:442.6},0).wait(1).to({y:445.3},0).wait(1).to({y:447.1},0).wait(1).to({y:448.1},0).wait(1).to({regX:86.3,regY:77,x:98.65,y:458.9},0).wait(66));

	// subheader
	this.instance_3 = new lib.mc_level2();
	this.instance_3.setTransform(85.15,438.05,0.7547,0.7549,0,0,0,68.2,42.7);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(59).to({_off:false},0).wait(1).to({regX:169.2,regY:31.8,x:161.4,y:428.85},0).wait(1).to({y:427.2},0).wait(1).to({y:424.85},0).wait(1).to({y:421.55},0).wait(1).to({y:417.15},0).wait(1).to({y:411.4},0).wait(1).to({y:404},0).wait(1).to({y:394.5},0).wait(1).to({y:382.3},0).wait(1).to({y:366.7},0).wait(1).to({y:347.05},0).wait(1).to({y:323.5},0).wait(1).to({y:298.35},0).wait(1).to({y:275.15},0).wait(1).to({y:256},0).wait(1).to({regX:68.2,regY:42.7,x:85.15,y:249.35},0).wait(1).to({regX:169.2,regY:31.8,x:161.4,y:222.3,alpha:0.2784},0).wait(1).to({y:207.95,alpha:0.4913},0).wait(1).to({y:197.05,alpha:0.6534},0).wait(1).to({y:188.8,alpha:0.7753},0).wait(1).to({y:182.75,alpha:0.865},0).wait(1).to({y:178.5,alpha:0.9284},0).wait(1).to({y:175.7,alpha:0.9699},0).wait(1).to({y:174.15,alpha:0.9928},0).wait(1).to({regX:68.2,regY:42.7,x:85.15,y:181.95,alpha:1},0).wait(216).to({regX:169.2,regY:31.8,x:161.4,y:176.25,alpha:0.9801},0).wait(1).to({y:180.7,alpha:0.9463},0).wait(1).to({y:187.25,alpha:0.896},0).wait(1).to({y:196.3,alpha:0.8265},0).wait(1).to({y:208.4,alpha:0.7338},0).wait(1).to({y:224.15,alpha:0.6129},0).wait(1).to({y:244.5,alpha:0.4569},0).wait(1).to({y:270.6,alpha:0.2567},0).wait(1).to({regX:68.2,regY:42.7,x:85.15,y:312.35,alpha:0},0).to({y:438.05},16,cjs.Ease.quartInOut).wait(66));

	// T_C
	this.instance_4 = new lib.mc_level3();
	this.instance_4.setTransform(70.55,761,0.5431,0.5432,0,0,0,68.2,42.8);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(84).to({_off:false},0).wait(1).to({regX:151,regY:18,x:115.45,y:746.95},0).wait(1).to({y:745.15},0).wait(1).to({y:741.9},0).wait(1).to({y:736.8},0).wait(1).to({y:729.55},0).wait(1).to({y:719.45},0).wait(1).to({y:705.6},0).wait(1).to({y:686.55},0).wait(1).to({y:659.7},0).wait(1).to({y:619.85},0).wait(1).to({y:555.55},0).wait(1).to({y:451.25},0).wait(1).to({y:352.55},0).wait(1).to({y:292.3},0).wait(1).to({y:253.7},0).wait(1).to({regX:68.2,regY:42.8,x:70.5,y:240.35},0).wait(1).to({regX:151,regY:18,x:115.45,y:220.8,alpha:0.2857},0).wait(1).to({y:216.25,alpha:0.4987},0).wait(1).to({y:212.85,alpha:0.659},0).wait(1).to({y:210.3,alpha:0.779},0).wait(1).to({y:208.4,alpha:0.8671},0).wait(1).to({y:207.05,alpha:0.9294},0).wait(1).to({y:206.2,alpha:0.9703},0).wait(1).to({y:205.7,alpha:0.9929},0).wait(1).to({regX:68.2,regY:42.7,x:70.55,y:219.05,alpha:1},0).wait(185).to({regY:42.8,x:70.5,y:303.35,alpha:0},8,cjs.Ease.quartInOut).to({x:70.55,y:429.05},22,cjs.Ease.quartInOut).to({_off:true},1).wait(65));

	// primary_cta
	this.instance_5 = new lib.primary_cta();
	this.instance_5.setTransform(168,497.85,0.8332,0.8331,0,0,0,72,17.2);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;
	new cjs.ButtonHelper(this.instance_5, 0, 1, 2, false, new lib.primary_cta(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(119).to({_off:false},0).wait(1).to({regX:72.5,regY:-111.1,x:168.4,y:389.95},0).wait(1).to({y:388.3},0).wait(1).to({y:385.8},0).wait(1).to({y:382.4},0).wait(1).to({y:377.85},0).wait(1).to({y:371.85},0).wait(1).to({y:364.2},0).wait(1).to({y:354.35},0).wait(1).to({y:341.7},0).wait(1).to({y:325.55},0).wait(1).to({y:305.15},0).wait(1).to({y:280.8},0).wait(1).to({y:254.7},0).wait(1).to({y:230.65},0).wait(1).to({y:210.85},0).wait(1).to({y:195.35},0).wait(1).to({y:183.45},0).wait(1).to({y:174.3},0).wait(1).to({regX:72,regY:17.1,x:168,y:274.3},0).wait(1).to({regX:72.5,regY:-111.1,x:168.4,y:157.75,alpha:0.3518},0).wait(1).to({y:150.6,alpha:0.6106},0).wait(1).to({y:145.5,alpha:0.7935},0).wait(1).to({y:142.2,alpha:0.9131},0).wait(1).to({y:140.35,alpha:0.9794},0).wait(1).to({regX:72,regY:17.2,x:168,y:246.6,alpha:1},0).wait(146).to({regX:72.5,regY:-111.1,x:168.4,y:142.1,alpha:0.9487},0).wait(1).to({y:146.3,alpha:0.8612},0).wait(1).to({y:152.45,alpha:0.7315},0).wait(1).to({y:161.05,alpha:0.5519},0).wait(1).to({y:172.45,alpha:0.3124},0).wait(1).to({regX:72,regY:17.2,x:168,y:294.3,alpha:0},0).wait(1).to({regX:72.5,regY:-111.1,x:168.4,y:194.5},0).wait(1).to({y:203.65},0).wait(1).to({y:215.35},0).wait(1).to({y:230.35},0).wait(1).to({y:249.3},0).wait(1).to({y:271.9},0).wait(1).to({y:296.1},0).wait(1).to({y:318.45},0).wait(1).to({y:336.85},0).wait(1).to({y:351.2},0).wait(1).to({y:362.3},0).wait(1).to({y:370.75},0).wait(1).to({y:377.15},0).wait(1).to({y:382},0).wait(1).to({y:385.55},0).wait(1).to({y:388.1},0).wait(1).to({y:389.75},0).wait(1).to({y:390.65},0).wait(1).to({regX:72,regY:17.2,x:168,y:497.85},0).wait(76));

	// background
	this.instance_6 = new lib.mc_background();
	this.instance_6.setTransform(168,336,1.12,1.12,0,0,0,150,300);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({regY:299.9,y:55.9},24,cjs.Ease.quartInOut).wait(285).to({regY:300,y:336},25,cjs.Ease.cubicInOut).wait(56));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(167,-140,170,894);
// library properties:
lib.properties = {
	id: '05920BE2A36F420086AAC3866015E257',
	width: 336,
	height: 280,
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