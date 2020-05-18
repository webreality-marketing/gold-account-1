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
	this.shape_43.graphics.f("#33FF00").s().p("EhFIASXMAAAgktMCKRAAAMAAAAktg");
	this.shape_43.setTransform(-264.5,16.5);
	this.shape_43._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_43).wait(3).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-707,-101,885,235);


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
	this.shape.graphics.f("#000000").s().p("AgHAIQgCgEAAgEQAAgEACgDQAEgCADAAQAFAAADACQACADAAAEQAAAEgCAEQgDACgFAAQgDAAgEgCg");
	this.shape.setTransform(267.8,40);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgcA5IACgNQAKAGAMAAQAZAAAAgZIAAgLQgIAMgOAAQgPAAgJgKQgJgMAAgUQAAgtAoAAQARAAAMAFIAABPQAAAngmAAQgOAAgLgFgAgUgRQAAAfAWAAQALAAAIgIIAAg1QgHgCgIAAQgaAAAAAgg");
	this.shape_1.setTransform(260.875,38.425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AATArIAAgzQAAgWgSAAQgKAAgJAJIAABAIgOAAIAAhTIANAAIAAANQAKgPAPAAQANAAAIAIQAGAHAAAOIAAA4g");
	this.shape_2.setTransform(252.1,36.525);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgGA9IAAhUIAOAAIAABUgAgFgrQgDgCAAgFQAAgEADgDQACgDADAAQAEAAADADQACACABAFQgBAFgCACQgDADgEAAQgDAAgCgDg");
	this.shape_3.setTransform(245.45,34.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AARA8IgigtIAAgBIAfgmIAQAAIgfAnIAkAtgAgiA8IAAh1QAHgCAIAAIAAB3g");
	this.shape_4.setTransform(239.9,34.85);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AASArIAAgzQABgWgTAAQgJAAgJAJIAABAIgOAAIAAhTIANAAIAAANQAKgPAPAAQAOAAAGAIQAIAHgBAOIAAA4g");
	this.shape_5.setTransform(230.65,36.525);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgYAmQgIgHAAgMQAAgPAKgGQALgHAagCIAEAAIAAgEQAAgIgFgEQgEgEgJAAQgPAAgNAGIABgMQAMgGAQAAQAfAAAAAcIAAA5IgNAAIgBgLQgIANgQAAQgMAAgHgGgAAQAAQgTAAgIAFQgHAEAAAJQAAAHAEADQAEAFAIAAQANAAAIgLIAAgXg");
	this.shape_6.setTransform(221.525,36.625);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgiA4IAAhyQAGgCAIAAIAAAuQAIgNAOABQAPgBAJALQAJAMAAAUQAAAtgoAAQgRAAgMgFgAgUgGIAAA1QAHACAIAAQAaAAAAggQAAgggWAAQgLAAgIAJg");
	this.shape_7.setTransform(213.225,34.95);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgfA8IAAgMIAGABQAIAAAEgFQAFgEAEgMIgihYIAPAAIAYBGIAYhGIAOAAIghBeQgJAbgVAAIgHgBg");
	this.shape_8.setTransform(200.65,38.525);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgYAmQgIgHAAgMQAAgPAKgGQALgHAagCIAEAAIAAgEQAAgIgFgEQgEgEgJAAQgPAAgNAGIABgMQAMgGAQAAQAfAAAAAcIAAA5IgNAAIgBgLQgIANgQAAQgMAAgHgGgAAQAAQgTAAgIAFQgHAEAAAJQAAAHAEADQAEAFAIAAQANAAAIgLIAAgXg");
	this.shape_9.setTransform(192.075,36.625);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgZAyQgJgLAAgVQAAgtAoABIAPABIAAghQAGgCAIAAIAAB3IgNAAIgBgLQgHANgPAAQgPAAgJgLgAgUARQAAAgAWAAQALAAAIgJIAAg1QgHgCgIAAQgaABAAAfg");
	this.shape_10.setTransform(183.275,34.95);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgfA8IAAgMIAGABQAHAAAFgFQAFgEAEgMIgjhYIAQAAIAZBGIAXhGIAOAAIghBeQgIAbgWAAIgHgBg");
	this.shape_11.setTransform(174.9,38.525);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgWArIAAhUIAOAAIAAANQAIgOANAAIAKABQAAAHgCAGIgKgBQgLAAgHAIIAABAg");
	this.shape_12.setTransform(168.425,36.55);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgZAgQgKgLAAgVQAAgTAJgLQAKgNARAAQARAAAKAKQAIAKAAASIgBAKIg2AAQACAbAZAAQANAAAMgHIgCAOQgMAFgMAAQgVAAgLgMgAAVgGQAAgZgUAAQgSAAgCAZIAoAAIAAAAg");
	this.shape_13.setTransform(160.5,36.625);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgGAqIgfhTIAPAAIAWBFIAYhFIAOAAIgfBTg");
	this.shape_14.setTransform(152.275,36.625);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgZAgQgKgLAAgVQAAgTAJgLQAKgNARAAQARAAAJAKQAJAKAAASIgBAKIg2AAQACAbAZAAQANAAAMgHIgCAOQgMAFgMAAQgVAAgLgMgAAVgGQAAgZgUAAQgTAAgBAZIAoAAIAAAAg");
	this.shape_15.setTransform(143.95,36.625);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgWArIAAhUIAOAAIAAANQAIgOANAAIAKABQAAAHgCAGIgKgBQgLAAgHAIIAABAg");
	this.shape_16.setTransform(133.675,36.55);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AgaAjQgHgHAAgOIAAg4IAPAAIAAA0QAAAVASAAQAKAAAJgJIAAhAIAPAAIAABTIgOAAIgBgNQgJAPgPAAQgNAAgIgIg");
	this.shape_17.setTransform(125.5,36.725);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AgcAgQgKgLAAgVQAAgUAKgLQALgMARAAQASAAALAMQAJALABAUQgBAVgJALQgLAMgSAAQgRAAgLgMgAgWAAQgBAgAXAAQAYAAgBggQABgfgYAAQgXAAABAfg");
	this.shape_18.setTransform(116.45,36.625);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AgfA8IAAgMIAGABQAHAAAFgFQAFgEAEgMIgjhYIAQAAIAZBGIAXhGIAOAAIghBeQgIAbgWAAIgHgBg");
	this.shape_19.setTransform(107.85,38.525);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AgbAgQgLgLAAgVQAAgUALgLQAJgMASAAQATAAAKAMQAKALgBAUQABAVgKALQgKAMgTAAQgRAAgKgMgAgXAAQAAAgAXAAQAXAAAAggQAAgfgXAAQgXAAAAAfg");
	this.shape_20.setTransform(95.6,36.625);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AgTAdIAAhSQAFgCAJAAIAAAZIAZAAIgBANIgYAAIAAAtQAAAPANAAQAGAAAGgDIgCANQgHADgHAAQgXAAAAgbg");
	this.shape_21.setTransform(88.6,35.475);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AATArIAAgzQgBgWgRAAQgKAAgJAJIAABAIgPAAIAAhTIAOAAIABANQAIgPAQAAQANAAAIAIQAGAHABAOIAAA4g");
	this.shape_22.setTransform(80.85,36.525);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AgGA9IAAhUIAOAAIAABUgAgGgrQgCgCAAgFQAAgEACgDQADgDADAAQAEAAADADQACACABAFQgBAFgCACQgDADgEAAQgDAAgDgDg");
	this.shape_23.setTransform(74.2,34.8);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgfA8IAAgMIAGABQAHAAAFgFQAFgEAEgMIgjhYIAQAAIAZBGIAXhGIAPAAIgiBeQgJAbgUAAIgIgBg");
	this.shape_24.setTransform(64.45,38.525);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AgUAdIAAhSQAGgCAJAAIAAAZIAaAAIgCANIgYAAIAAAtQAAAPAMAAQAHAAAGgDIgCANQgGADgIAAQgYAAAAgbg");
	this.shape_25.setTransform(57.85,35.475);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AgGA9IAAhUIAOAAIAABUgAgGgrQgCgCAAgFQAAgEACgDQADgDADAAQAEAAADADQACACAAAFQAAAFgCACQgDADgEAAQgDAAgDgDg");
	this.shape_26.setTransform(52.6,34.8);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AgPAmIAAhgQAGgCAIAAIAABhQAAALAJAAQAFABADgCIgCAMQgEACgGAAQgTAAAAgXg");
	this.shape_27.setTransform(48.725,34.95);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AgGA9IAAhUIANAAIAABUgAgFgrQgEgCAAgFQAAgEAEgDQACgDADAAQAEAAADADQACACAAAFQAAAFgCACQgDADgEAAQgDAAgCgDg");
	this.shape_28.setTransform(43.9,34.8);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AgiA4IAAhyQAGgCAIAAIAAAuQAIgNAOABQAPgBAJALQAJAMAAAUQAAAtgoAAQgRAAgMgFgAgUgGIAAA1QAHACAIAAQAaAAAAggQAAgggWAAQgLAAgIAJg");
	this.shape_29.setTransform(37.625,34.95);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AgGA9IAAhUIAOAAIAABUgAgGgrQgCgCAAgFQAAgEACgDQADgDADAAQAEAAADADQACACABAFQgBAFgCACQgDADgEAAQgDAAgDgDg");
	this.shape_30.setTransform(30.8,34.8);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AAVAqIgVgeIgUAeIgRAAIAegpIgdgqIARAAIATAfIAVgfIAQAAIgdApIAeAqg");
	this.shape_31.setTransform(24.875,36.625);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AgZAgQgKgLAAgVQAAgTAJgLQAKgNARAAQARAAAKAKQAIAKAAASIgBAKIg2AAQACAbAZAAQANAAAMgHIgCAOQgMAFgMAAQgVAAgLgMgAAVgGQAAgZgUAAQgTAAgBAZIAoAAIAAAAg");
	this.shape_32.setTransform(16.6,36.625);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AgPAmIAAhgQAGgCAIAAIAABhQAAALAJAAQAFABADgCIgCAMQgEACgGAAQgTAAAAgXg");
	this.shape_33.setTransform(10.475,34.95);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AgVA8IAAhbQAAgcAcAAQAJAAAGABIgBANQgHgCgGAAQgIAAgDAEQgEAEAAAJIAAAGIAcAAIgCANIgaAAIAABHg");
	this.shape_34.setTransform(5.525,34.85);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AgfA8IABgMIAFABQAHAAAFgFQAFgEAEgMIgihYIAPAAIAYBGIAYhGIAPAAIgiBeQgIAbgWAAIgHgBg");
	this.shape_35.setTransform(280.95,18.975);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AgRAhQgMgLAAgWQAAgVAMgLQAKgLASAAQALAAAIADIgCAMQgHgDgJAAQgMAAgHAJQgHAIAAAOQAAAPAHAJQAHAIAMAAQAKAAAIgEIgCAMQgHAEgLAAQgRAAgKgLg");
	this.shape_36.setTransform(273.175,17.075);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AATArIAAgzQAAgWgSAAQgKAAgJAJIAABAIgOAAIAAhTIANAAIAAANQAJgPAQAAQAOAAAGAIQAIAHgBAOIAAA4g");
	this.shape_37.setTransform(265.05,16.975);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AgYAgQgLgLAAgVQAAgTAJgLQAKgNASAAQAQAAAKAKQAIAKAAASIgBAKIg3AAQADAbAYAAQAOAAAMgHIgCAOQgMAFgNAAQgUAAgKgMgAAVgGQAAgZgUAAQgSAAgDAZIApAAIAAAAg");
	this.shape_38.setTransform(256.05,17.075);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AgWArIAAhTIAOAAIAAAMQAIgOANAAIAKABQAAAHgCAGIgKgBQgLAAgHAIIAABAg");
	this.shape_39.setTransform(249.425,17);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AgWArIAAhTIAOAAIAAAMQAIgOANAAIAKABQAAAHgCAGIgKgBQgLAAgHAIIAABAg");
	this.shape_40.setTransform(243.475,17);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AgaAjQgHgHAAgOIAAg4IAPAAIAAA0QAAAVASAAQAKAAAJgJIAAhAIAPAAIAABTIgOAAIgBgNQgJAPgPAAQgNAAgIgIg");
	this.shape_41.setTransform(235.3,17.175);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AgRAhQgMgLAAgWQAAgVAMgLQAKgLASAAQALAAAIADQAAAGgCAGQgHgDgJAAQgMAAgHAJQgHAIAAAOQAAAPAHAJQAHAIAMAAQAKAAAIgEIgCAMQgHAEgLAAQgRAAgKgLg");
	this.shape_42.setTransform(227.075,17.075);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AgXAHIABgNIAuAAIgBANg");
	this.shape_43.setTransform(220.3,16.25);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AgGA9IAAhUIAOAAIAABUgAgGgrQgDgDAAgEQAAgEADgDQADgCADgBQAEABADACQADACgBAFQABAEgDADQgDACgEAAQgDAAgDgCg");
	this.shape_44.setTransform(215.15,15.25);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AgTAdIAAhSQAFgCAJAAIAAAZIAZAAIgBANIgYAAIAAAtQAAAPANAAQAGAAAGgDIgCANQgGADgIAAQgYAAABgbg");
	this.shape_45.setTransform(210.65,15.925);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AgPAmIAAhgQAGgCAIAAIAABhQAAAMAJAAQAFgBADgBIgCAMQgEACgGAAQgTAAAAgXg");
	this.shape_46.setTransform(205.525,15.4);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AgZAjQgIgHABgOIAAg4IAOAAIAAA0QAAAVASAAQALAAAIgJIAAhAIAOAAIAABTIgNAAIgBgNQgIAPgQAAQgOAAgGgIg");
	this.shape_47.setTransform(198.1,17.175);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AAtArIAAg0QAAgVgSAAQgKAAgKAJIAAAIIAAA4IgNAAIAAgzQgBgWgRAAQgLAAgJAJIAABAIgPAAIAAhTIAOAAIABANQAIgPARAAQATAAAFAPQAKgPARAAQANAAAIAIQAGAHAAAOIAAA4g");
	this.shape_48.setTransform(186.4,16.975);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AgcAnQAAgHACgGQAKAGANAAQARAAABgLQgBgGgDgDQgDgCgHgDIgHgCQgWgGAAgSQAAgMAIgGQAHgGAOAAQAOAAAMAEIgDAMQgLgEgLAAQgQAAAAALQAAAJAOAFIAIACQAVAGAAARQAAALgIAHQgJAHgOAAQgQAAgKgFg");
	this.shape_49.setTransform(171.85,17.075);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AgcA5IACgNQAKAGAMAAQAZAAAAgZIAAgLQgIAMgOAAQgPAAgJgKQgJgMAAgUQAAgtAoAAQARAAAMAFIAABPQAAAngmAAQgOAAgLgFgAgUgRQAAAfAWAAQALAAAIgIIAAg1QgHgCgIAAQgaAAAAAgg");
	this.shape_50.setTransform(163.325,18.875);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AATArIAAgzQgBgWgRAAQgKAAgJAJIAABAIgPAAIAAhTIAOAAIABANQAIgPAQAAQANAAAIAIQAGAHAAAOIAAA4g");
	this.shape_51.setTransform(154.55,16.975);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AgGA9IAAhUIAOAAIAABUgAgGgrQgCgDAAgEQAAgEACgDQADgCADgBQAEABADACQACACABAFQgBAEgCADQgDACgEAAQgDAAgDgCg");
	this.shape_52.setTransform(147.9,15.25);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AgWArIAAhTIAOAAIAAAMQAIgOANAAIAKABQAAAHgCAGIgKgBQgLAAgHAIIAABAg");
	this.shape_53.setTransform(143.525,17);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AgiA5IAAhzQAGgCAIAAIAAAuQAIgMAOAAQAPAAAJALQAJALAAAUQAAAtgoAAQgRAAgMgEgAgUgGIAAA1QAHACAIAAQAaAAAAghQAAgegWAAQgLAAgIAIg");
	this.shape_54.setTransform(135.675,15.4);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AgTAdIAAhSQAFgCAJAAIAAAZIAZAAIgBANIgYAAIAAAtQAAAPANAAQAGAAAGgDIgCANQgGADgIAAQgYAAABgbg");
	this.shape_55.setTransform(124.7,15.925);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AASArIAAgzQAAgWgRAAQgLAAgIAJIAABAIgPAAIAAhTIAOAAIABANQAIgPAQAAQANAAAIAIQAGAHABAOIAAA4g");
	this.shape_56.setTransform(116.95,16.975);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AgaAjQgGgHgBgOIAAg4IAPAAIAAA0QAAAVASAAQAKAAAJgJIAAhAIAPAAIAABTIgOAAIgBgNQgJAPgPAAQgNAAgIgIg");
	this.shape_57.setTransform(107.7,17.175);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AgcAgQgJgLgBgVQABgUAJgLQALgMARAAQASAAALAMQAKALAAAUQAAAVgKALQgLAMgSAAQgRAAgLgMgAgXAAQAAAgAXAAQAYAAgBggQABgfgYAAQgXAAAAAfg");
	this.shape_58.setTransform(98.65,17.075);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AgRAhQgMgLAAgWQAAgVAMgLQAKgLASAAQALAAAIADIgCAMQgHgDgJAAQgMAAgHAJQgHAIAAAOQAAAPAHAJQAHAIAMAAQAKAAAIgEIgCAMQgHAEgLAAQgRAAgKgLg");
	this.shape_59.setTransform(90.475,17.075);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("AgRAhQgMgLAAgWQAAgVAMgLQAKgLASAAQALAAAIADIgCAMQgHgDgJAAQgMAAgHAJQgHAIAAAOQAAAPAHAJQAHAIAMAAQAKAAAIgEIgCAMQgHAEgLAAQgRAAgKgLg");
	this.shape_60.setTransform(83.175,17.075);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AAgA7IgKgdIgtAAIgJAdIgOAAIAmhzQAHgCAKAAIAmB1gAASAQIgSg7IgSA7IAkAAg");
	this.shape_61.setTransform(74.65,15.375);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AgZAyQgJgLAAgVQAAgtAoABIAPABIAAghQAGgCAIAAIAAB3IgNAAIgBgLQgHANgPAAQgPAAgJgLgAgUARQAAAgAWAAQALAAAIgJIAAg1QgHgBgIAAQgaAAAAAfg");
	this.shape_62.setTransform(61.325,15.4);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AgPAmIAAhgQAGgCAIAAIAABhQAAAMAJAAQAFgBADgBIgCAMQgEACgGAAQgTAAAAgXg");
	this.shape_63.setTransform(55.175,15.4);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("AgcAgQgKgLABgVQgBgUAKgLQAKgMASAAQATAAAJAMQAKALAAAUQAAAVgKALQgJAMgTAAQgRAAgLgMgAgWAAQAAAgAWAAQAXAAABggQgBgfgXAAQgWAAAAAfg");
	this.shape_64.setTransform(47.85,17.075);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("AgdAsQgOgQAAgcQAAgdAPgQQAPgPAaAAQASAAANAFIgDANQgNgFgPAAQgTAAgLAMQgLAMAAAXQAAAXALAMQAKANATAAQAJAAAIgCIAAgwIAPAAIAAA5QgOAGgTAAQgaAAgOgRg");
	this.shape_65.setTransform(37.725,15.425);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AgWArIAAhTIAOAAIAAAMQAIgOANAAIAKABQAAAHgCAGIgKgBQgLAAgHAIIAABAg");
	this.shape_66.setTransform(26.475,17);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AgZAjQgIgHAAgOIAAg4IAPAAIAAA0QAAAVASAAQALAAAIgJIAAhAIAPAAIAABTIgOAAIgBgNQgIAPgQAAQgOAAgGgIg");
	this.shape_67.setTransform(18.3,17.175);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000000").s().p("AglAsQgNgQAAgcQAAgbAOgRQANgQAXAAQAZAAANARQANAQAAAbQAAAdgNAQQgOAQgYAAQgXAAgOgRgAgZgiQgJAMAAAWQAAAXAJAMQAJANAQAAQAkAAAAgwQAAgWgKgMQgJgNgRAAQgQAAgJANg");
	this.shape_68.setTransform(7.875,15.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_level2, new cjs.Rectangle(0,0,287.3,48.1), null);


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
	this.shape.setTransform(223.425,87.425);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(28).to({_off:false},0).wait(352));

	// o
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EC0000").s().p("AhGBSQgZgdAAg1QAAgzAZgeQAZgeAtAAQAuAAAaAeQAYAeAAAzQAAA1gZAdQgZAeguAAQgtAAgZgegAg5AAQAABRA5AAQA7AAAAhRQAAhQg7AAQg5AAAABQg");
	this.shape_1.setTransform(201.575,87.175);
	this.shape_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(27).to({_off:false},0).wait(353));

	// y
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EC0000").s().p("AhPCYQAAgTACgMIANACQATAAAMgLQAMgMAJgeIhWjgIAnAAIA/CyIA5iyIAmAAIhUDwQgXBFg0AAQgKAAgJgDg");
	this.shape_2.setTransform(180.875,92);
	this.shape_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(26).to({_off:false},0).wait(354));

	// s
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EC0000").s().p("AhIBhQAAgPAFgQQAaAPAgAAQAtAAAAgdQAAgNgJgHQgHgHgTgHIgQgHQgcgKgMgMQgQgQAAgZQAAgcAUgPQAUgQAkAAQAiAAAbAKQgCARgDANQgcgJgaAAQgqAAAAAbQAAAWAjAOIASAHQAdAKAMAMQAOAPAAAWQAAAcgVARQgVASgnAAQgmAAgagPg");
	this.shape_3.setTransform(153.975,87.175);
	this.shape_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(25).to({_off:false},0).wait(355));

	// t
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#EC0000").s().p("AgyBMIAAjSQAQgGAVAAIAABAIBAAAIgDAfIg9AAIAAB1QAAAmAgAAQARAAAPgIIgFAgQgPAHgUAAQg9AAAAhBg");
	this.shape_4.setTransform(138.75,84.225);
	this.shape_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(24).to({_off:false},0).wait(356));

	// i
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#EC0000").s().p("AgRCZIAAjUIAjAAIAADUgAgQhvQgHgGAAgLQAAgLAHgHQAGgGAKAAQAKAAAHAGQAHAHAAALQAAAKgHAHQgHAHgKAAQgKAAgGgHg");
	this.shape_5.setTransform(126.5,82.55);
	this.shape_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(23).to({_off:false},0).wait(357));

	// u
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#EC0000").s().p("AhTAiIAAiOIAlAAIAACJQAAAaALAMQANAMAbAAQATAAAXgFIAAi2IAlAAIAADMQgsANgkAAQhXAAAAhLg");
	this.shape_6.setTransform(110.775,87.425);
	this.shape_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(22).to({_off:false},0).wait(358));

	// s
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#EC0000").s().p("AhIBhQAAgPAFgQQAaAPAgAAQAtAAAAgdQAAgNgJgHQgHgHgTgHIgQgHQgcgKgMgMQgQgQAAgZQAAgcAUgPQAUgQAkAAQAiAAAbAKQgCARgDANQgcgJgaAAQgqAAAAAbQAAAWAjAOIASAHQAdAKAMAMQAOAPAAAWQAAAcgVARQgVASgnAAQgmAAgagPg");
	this.shape_7.setTransform(91.175,87.175);
	this.shape_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(21).to({_off:false},0).wait(359));

	// t
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#EC0000").s().p("AgyBMIAAjSQAPgGAWAAIAABAIBAAAIgDAfIg9AAIAAB1QAAAmAgAAQARAAAPgIIgFAgQgPAHgUAAQg9AAAAhBg");
	this.shape_8.setTransform(67.55,84.225);
	this.shape_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(20).to({_off:false},0).wait(360));

	// a
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#EC0000").s().p("Ag/BVQgYgcAAg4QAAhwBmAAQAoAAAgAMIAADOIghAAIgDgdQgSAiglAAQgnAAgUgbgAgxAAQABBRA1AAQAbAAASgUIAAiJQgRgEgTAAQg/AAAABQg");
	this.shape_9.setTransform(48.35,87.175);
	this.shape_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(19).to({_off:false},0).wait(361));

	// h
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#EC0000").s().p("AAvCXIAAiJQAAgxgxgBQgWABgWAIIAACyIglAAIAAkoQAPgGAWABIAABfQAYgKAYAAQBSAAAABKIAACOg");
	this.shape_10.setTransform(27.2,82.7);
	this.shape_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(18).to({_off:false},0).wait(362));

	// t
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#EC0000").s().p("AgyBMIAAjSQAPgGAWAAIAABAIBAAAIgDAfIg9AAIAAB1QAAAmAgAAQARAAAOgIIgEAgQgPAHgUAAQg9AAAAhBg");
	this.shape_11.setTransform(9.65,84.225);
	this.shape_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(17).to({_off:false},0).wait(363));

	// y
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#EC0000").s().p("AhPCYQAAgTACgMIANACQATAAAMgLQAMgMAJgeIhWjgIAnAAIA/CzIA5izIAmAAIhUDxQgXBEg0AAQgKAAgJgDg");
	this.shape_12.setTransform(344.825,44.95);
	this.shape_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(16).to({_off:false},0).wait(364));

	// c
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#EC0000").s().p("AguBUQgbgdAAg3QAAg0AZgdQAageAxAAQAdAAASAJQAAAOgDAQQgTgHgYAAQg/AAAABQQAAAmARAVQARAVAeAAQAZAAAUgLQgBARgEAPQgRAKgbAAQgsAAgbgcg");
	this.shape_13.setTransform(326.325,40.125);
	this.shape_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(15).to({_off:false},0).wait(365));

	// n
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#EC0000").s().p("AAvBtIAAiJQAAgagMgMQgMgMgbAAQgUAAgWAGIAAC1IglAAIAAjMQAsgNAkAAQBXAAAABLIAACOg");
	this.shape_14.setTransform(306.7,39.875);
	this.shape_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(14).to({_off:false},0).wait(366));

	// e
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#EC0000").s().p("Ag/BSQgagdAAg2QAAgxAXgdQAYggAuAAQAqAAAXAbQAVAZAAAsIgCAbIiKAAQAFBFBAAAQAjAAAdgRQgCAUgEANQgYAPgnAAQgyAAgbgegAA0gRQgBg/gwAAQgvAAgGA/IBmAAIAAAAg");
	this.shape_15.setTransform(284.75,40.125);
	this.shape_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_15).wait(13).to({_off:false},0).wait(367));

	// r
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#EC0000").s().p("Ag4BtIAAjNQAhgMAkAAQAaAAASAEQAAAUgEAMQgPgEgYAAQgPAAgSAEIAAC1g");
	this.shape_16.setTransform(268.175,39.925);
	this.shape_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(12).to({_off:false},0).wait(368));

	// r
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#EC0000").s().p("Ag4BtIAAjNQAhgMAkAAQAaAAASAEQAAAUgEAMQgPgEgYAAQgPAAgSAEIAAC1g");
	this.shape_17.setTransform(253.475,39.925);
	this.shape_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_17).wait(11).to({_off:false},0).wait(369));

	// u
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#EC0000").s().p("AhTAiIAAiOIAlAAIAACJQAAAaALAMQANAMAbAAQATAAAXgFIAAi2IAlAAIAADMQgsANgkAAQhXAAAAhLg");
	this.shape_18.setTransform(233.925,40.375);
	this.shape_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_18).wait(10).to({_off:false},0).wait(370));

	// c
	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#EC0000").s().p("AguBUQgbgdAAg3QAAg0AZgdQAageAxAAQAdAAASAJQAAAOgDAQQgTgHgYAAQg/AAAABQQAAAmARAVQARAVAeAAQAZAAAUgLQgBARgEAPQgRAKgbAAQgsAAgbgcg");
	this.shape_19.setTransform(214.325,40.125);
	this.shape_19._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_19).wait(9).to({_off:false},0).wait(371));

	// e
	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#EC0000").s().p("Ag/BSQgagdAAg2QAAgxAWgdQAaggAsAAQArAAAXAbQAVAZAAAsIgCAbIiKAAQAFBFBAAAQAjAAAdgRQgCAUgEANQgYAPgnAAQgzAAgagegAA0gRQAAg/gxAAQgwAAgFA/IBmAAIAAAAg");
	this.shape_20.setTransform(186.4,40.125);
	this.shape_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_20).wait(8).to({_off:false},0).wait(372));

	// h
	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#EC0000").s().p("AAvCXIAAiJQAAgxgwAAQgXAAgWAJIAACxIglAAIAAkoQAPgGAWABIAABfQAXgKAZAAQBSAAAABKIAACOg");
	this.shape_21.setTransform(165.2,35.65);
	this.shape_21._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_21).wait(7).to({_off:false},0).wait(373));

	// t
	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#EC0000").s().p("AgyBMIAAjSQAPgGAWAAIAABAIBAAAIgDAfIg9AAIAAB1QAAAmAgAAQARAAAPgIIgFAgQgPAHgUAAQg9AAAAhBg");
	this.shape_22.setTransform(147.65,37.175);
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
p.nominalBounds = new cjs.Rectangle(0,0,356.8,113.2);


(lib.mc_background = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EC0000").s().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	this.shape.setTransform(485,125);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_background, new cjs.Rectangle(0,0,970,250), null);


(lib.Logo_SantanderInternationalpos = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EC0000").s().p("AM7GsQgVgZAAgtQAAgvAXgZQAYgZAuAAQAgABAbAJIAACxIgXAAIgBgPQgUATgbgBQgmAAgWgXgANPEvQgQATAAAkQAAAiAOAUQAPATAdAAQAaAAATgSIAAh+QgRgDgSAAQgiAAgSATgAG1GpQgWgZAAgqQAAgtAXgaQAXgaApAAQAqAAAWAbQAVAZAAAqQAAAtgWAZQgYAagpAAQgpAAgWgagAHIEwQgQASAAAiQAAAjAQAUQAPASAfABQAdgBAQgTQAPgUAAghQAAgjgPgTQgQgTgdAAQgeAAgQAUgADnGLIAAi9QAMgEAMAAIAABBIBAAAQgBAOgCAIIg9AAIAABoQAAAmAigBQAPAAAQgFIgEAVQgOAGgRgBQg3AAABg4gAA2GsQgWgZABgtQAAgvAWgZQAYgZAvAAQAgABAbAJIAACxIgXAAIgBgPQgVATgagBQgnAAgVgXgABKEvQgQATAAAkQAAAiAOAUQAPATAdAAQAaAAASgSIAAh+QgQgDgSAAQgjAAgRATgAm6GqQgWgZgBgtQABgqASgZQAWgbAogBQAmAAAUAZQASAVAAAkQAAANgBAJIiDAAQADAgAQAQQARARAdAAQAigBAZgPIgDAYQgXANghAAQgrAAgYgZgAmoErQgOAQgCAcIBrAAIAAgCQAAgagMgQQgOgQgaAAQgZAAgOAQgAo3GLIAAi9QALgEAOAAIAABBIA/AAQgBANgBAJIg9AAIAABoQgBAmAjgBQAPAAAPgFIgDAVQgPAGgRgBQg2AAAAg4gAPuHAIAAjyQAPgEAKAAIAAD2gALpHAIAAhzQAAgagLgLQgNgMgfAAQgVAAgUAEIAACgIgZAAIAAixQAlgJAdgBQArAAATASQASAQAAAiIAAB3gAFiHAIAAi2IAYAAIAAC2gAgcHAIAAhzQAAgagLgLQgMgMggAAQgTAAgWAEIAACgIgYAAIAAixQAkgJAegBQArAAATASQASAQAAAiIAAB3gAkOHAIAAixQAMgEAQgCQAQgDAPAAQAUAAAKACQAAANgCAIQgLgBgQAAQgQAAgTADIAAChgAp8HAIAAhzQABgagMgLQgNgMgfAAQgUAAgVAEIAACgIgZAAIAAixQAlgJAdgBQAsAAATASQARAQAAAiIAAB3gAtJHAIAAjyQAPgEAJAAIAAD2gAFjDpQgGgFAAgHQAAgHAGgFQAEgEAHAAQAHAAAEAEQAFAFABAHQgBAHgFAFQgEAFgHAAQgHAAgEgFgA2KAeQhRgrAAg+QAAgsArgkQArgkBHgTQgCAjASAfIBWCUQAKARAEATIADgGQAQgcAAgfQAAgggQgcIhFh4QgQgcAAgfQAAghAQgcIAEgGQAEATAJARIBoC0QAKARAEATIAEgGQAQgcAAgfQAAgggQgdIhGh4QgQgbAAghQAAgfAQgcIAEgHQADATAKARIBXCXQAPAZABAdQBGATArAkQAsAkAAAsQAAA+hRArQhRAshzAAQhyAAhRgsgAtLAtQACgbAJgZQAUAJAbAFQAZAFAWABQAlAAATgMQAUgLAAgXQAAgVgQgPQgOgMgngRIgagLQgogSgUgVQgWgaAAgnQAAguAfgYQAggbA+AAQA0AAArAPQgCAcgJAYQgTgIgZgDQgVgEgTAAQgiAAgRANQgQALAAAVQAAATAPAOQANAMAdANIAcAMQAyAVAWAYQAVAZAAAmQAAAtghAbQgjAbhBAAQg/AAgsgTgARHAZQgjgjAAhEQAAg/AdgkQAhgoBAAAQA7AAAfAkQAbAfABA0QgBAVgDAXIi2AAQAFAjAVARQAVAQAmAAQAwAAArgTQgEAcgFAXQgjAQgwAAQhHAAgkglgATehlQgBghgQgRQgQgSgdAAQg8AAgHBEICBAAIAAAAgAMgAaQgegjAAhAQAAhGAkgkQAlgmBHAAQAWAAAUAEIAAhVQAXgIAiAAIAAFqIg0AAIgDghQgMAUgRAJQgSAKgcAAQg0ABgfglgANQiPQgVAYAAAuQABApAQAXQATAZAkAAQAgAAAZgTIAAigQgYgFgVAAQgqAAgVAZgADdAaQgggjAAhAQAAhGAkgkQAlgmBHAAQA5AAApAPIAAECIg0AAIgDgfQgXAlgyAAQg0ABgeglgAEMiPQgVAZAAAtQAAApARAXQASAZAlAAQAfAAAZgSIAAiiQgTgEgXAAQgqAAgXAZgAAZgZIAAkQQAZgJAfAAIAABiIBaAAQgBAbgDAWIhWAAIAAB/QABAuArAAQAYAAAVgIQgDAcgEAUQgUAIgcAAQhaAAAAhXgAoXAaQgggjAAhAQAAhGAkgkQAlgmBIAAQA4AAAqAPIAAECIg1AAIgCgfQgYAlgxAAQg1ABgeglgAnniPQgWAZABAtQAAApAQAXQATAZAlAAQAeAAAZgSIAAiiQgTgEgWAAQgsAAgVAZgAVIA4IAAkCQATgGAcgFQAbgEAYAAQAhABARABIgBAbQgCAPgCAHQgTgCgZAAQgUAAgVAEIAADcgAKaA4IAAijQAAghgNgNQgQgPgpAAQgUAAgZAFIAADbIg5AAIAAkCQAcgGAbgFQAcgEAVAAQBEAAAfAbQAbAYAAAxIAACtgAhZA4IAAijQAAghgNgNQgRgPgpAAQgTAAgaAFIAADbIg5AAIAAkCQAcgGAbgFQAcgEAVAAQBFAAAeAbQAbAYAAAxIAACtg");
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
(lib._970x250 = function(mode,startPosition,loop) {
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
	this.shape.graphics.f().s("#EC0000").ss(2,1,1).p("Eg43gOpMBxvAAAIAAdTMhxvAAAg");
	this.shape.setTransform(484.984,124.9922,1.3323,1.3324);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.004)").s().p("Eg43AOqIAA9TMBxvAAAIAAdTg");
	this.shape_1.setTransform(484.984,124.9922,1.3323,1.3324);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(390));

	// background_colour (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_1 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_2 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_3 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_4 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_5 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_6 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_7 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_8 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_9 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_10 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_11 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_12 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_13 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_14 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_15 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_16 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_17 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_18 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_19 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_20 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_21 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_22 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_23 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_24 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_25 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_26 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_27 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_28 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_29 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_30 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_31 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_32 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_33 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_34 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_35 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_36 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_37 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_38 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_39 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_40 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_41 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_42 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_43 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_44 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_45 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_46 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_47 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_48 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_49 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_50 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_51 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_52 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_53 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_54 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_55 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_56 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_57 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_58 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_59 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_60 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_61 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_62 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_63 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_64 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_65 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_66 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_67 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_68 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_69 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_70 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_71 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_72 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_73 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_74 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_75 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_76 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_77 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_78 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_79 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_80 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_81 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_82 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_83 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_84 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_85 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_86 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_87 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_88 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_89 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_90 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_91 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_92 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_93 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_94 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_95 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_96 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_97 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_98 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_99 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_100 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_101 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_102 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_103 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_104 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_105 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_106 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_107 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_108 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_109 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_110 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_111 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_112 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_113 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_114 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_115 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_116 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_117 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_118 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_119 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_120 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_121 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_122 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_123 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_124 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_125 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_126 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_127 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_128 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_129 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_130 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_131 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_132 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_133 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_134 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_135 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_136 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_137 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_138 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_139 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_140 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_141 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_142 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_143 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_144 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_145 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_146 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_147 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_148 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_149 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_150 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_151 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_152 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_153 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_154 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_155 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_156 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_157 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_158 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_159 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_160 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_161 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_162 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_163 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_164 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_165 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_166 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_167 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_168 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_169 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_170 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_171 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_172 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_173 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_174 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_175 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_176 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_177 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_178 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_179 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_180 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_181 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_182 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_183 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_184 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_185 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_186 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_187 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_188 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_189 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_190 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_191 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_192 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_193 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_194 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_195 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_196 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_197 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_198 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_199 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_200 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_201 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_202 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_203 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_204 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_205 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_206 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_207 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_208 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_209 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_210 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_211 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_212 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_213 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_214 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_215 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_216 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_217 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_218 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_219 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_220 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_221 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_222 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_223 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_224 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_225 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_226 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_227 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_228 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_229 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_230 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_231 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_232 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_233 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_234 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_235 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_236 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_237 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_238 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_239 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_240 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_241 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_242 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_243 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_244 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_245 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_246 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_247 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_248 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_249 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_250 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_251 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_252 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_253 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_254 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_255 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_256 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_257 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_258 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_259 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_260 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_261 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_262 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_263 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_264 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_265 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_266 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_267 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_268 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_269 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_270 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_271 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_272 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_273 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_274 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_275 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_276 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_277 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_278 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_279 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_280 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_281 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_282 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_283 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_284 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_285 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_286 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_287 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_288 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_289 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_290 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_291 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_292 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_293 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_294 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_295 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_296 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_297 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_298 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_299 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_300 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_301 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_302 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_303 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_304 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_305 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_306 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_307 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_308 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_309 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_310 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_311 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_312 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_313 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_314 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_315 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_316 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_317 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_318 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_319 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_320 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_321 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_322 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_323 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_324 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_325 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_326 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_327 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_328 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_329 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_330 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_331 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_332 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_333 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_334 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_335 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_336 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_337 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_338 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_339 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_340 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_341 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_342 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_343 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_344 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_345 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_346 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_347 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_348 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_349 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_350 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_351 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_352 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_353 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_354 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_355 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_356 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_357 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_358 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_359 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_360 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_361 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_362 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_363 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_364 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_365 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_366 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_367 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_368 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_369 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_370 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_371 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_372 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_373 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_374 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_375 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_376 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_377 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_378 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_379 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_380 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_381 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_382 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_383 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_384 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_385 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_386 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_387 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_388 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	var mask_graphics_389 = new cjs.Graphics().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:485,y:125}).wait(1).to({graphics:mask_graphics_1,x:485,y:125}).wait(1).to({graphics:mask_graphics_2,x:485,y:124.9}).wait(1).to({graphics:mask_graphics_3,x:485,y:124.5}).wait(1).to({graphics:mask_graphics_4,x:485,y:123.45}).wait(1).to({graphics:mask_graphics_5,x:485,y:121.25}).wait(1).to({graphics:mask_graphics_6,x:485,y:117.2}).wait(1).to({graphics:mask_graphics_7,x:485,y:110.5}).wait(1).to({graphics:mask_graphics_8,x:485,y:100.3}).wait(1).to({graphics:mask_graphics_9,x:485,y:85.45}).wait(1).to({graphics:mask_graphics_10,x:484.95,y:64.7}).wait(1).to({graphics:mask_graphics_11,x:484.95,y:36.75}).wait(1).to({graphics:mask_graphics_12,x:484.95,y:-0.05}).wait(1).to({graphics:mask_graphics_13,x:484.9,y:-36.75}).wait(1).to({graphics:mask_graphics_14,x:484.9,y:-64.75}).wait(1).to({graphics:mask_graphics_15,x:484.85,y:-85.5}).wait(1).to({graphics:mask_graphics_16,x:484.85,y:-100.35}).wait(1).to({graphics:mask_graphics_17,x:484.85,y:-110.55}).wait(1).to({graphics:mask_graphics_18,x:484.85,y:-117.25}).wait(1).to({graphics:mask_graphics_19,x:484.85,y:-121.3}).wait(1).to({graphics:mask_graphics_20,x:484.85,y:-123.5}).wait(1).to({graphics:mask_graphics_21,x:484.85,y:-124.55}).wait(1).to({graphics:mask_graphics_22,x:484.85,y:-124.95}).wait(1).to({graphics:mask_graphics_23,x:484.85,y:-125.025}).wait(1).to({graphics:mask_graphics_24,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_25,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_26,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_27,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_28,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_29,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_30,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_31,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_32,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_33,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_34,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_35,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_36,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_37,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_38,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_39,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_40,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_41,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_42,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_43,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_44,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_45,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_46,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_47,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_48,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_49,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_50,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_51,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_52,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_53,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_54,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_55,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_56,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_57,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_58,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_59,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_60,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_61,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_62,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_63,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_64,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_65,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_66,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_67,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_68,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_69,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_70,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_71,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_72,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_73,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_74,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_75,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_76,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_77,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_78,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_79,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_80,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_81,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_82,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_83,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_84,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_85,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_86,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_87,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_88,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_89,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_90,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_91,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_92,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_93,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_94,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_95,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_96,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_97,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_98,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_99,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_100,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_101,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_102,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_103,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_104,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_105,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_106,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_107,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_108,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_109,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_110,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_111,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_112,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_113,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_114,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_115,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_116,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_117,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_118,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_119,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_120,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_121,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_122,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_123,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_124,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_125,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_126,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_127,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_128,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_129,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_130,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_131,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_132,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_133,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_134,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_135,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_136,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_137,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_138,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_139,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_140,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_141,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_142,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_143,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_144,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_145,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_146,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_147,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_148,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_149,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_150,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_151,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_152,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_153,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_154,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_155,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_156,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_157,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_158,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_159,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_160,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_161,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_162,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_163,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_164,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_165,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_166,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_167,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_168,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_169,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_170,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_171,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_172,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_173,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_174,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_175,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_176,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_177,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_178,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_179,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_180,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_181,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_182,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_183,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_184,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_185,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_186,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_187,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_188,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_189,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_190,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_191,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_192,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_193,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_194,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_195,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_196,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_197,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_198,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_199,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_200,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_201,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_202,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_203,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_204,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_205,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_206,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_207,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_208,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_209,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_210,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_211,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_212,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_213,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_214,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_215,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_216,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_217,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_218,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_219,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_220,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_221,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_222,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_223,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_224,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_225,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_226,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_227,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_228,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_229,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_230,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_231,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_232,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_233,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_234,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_235,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_236,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_237,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_238,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_239,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_240,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_241,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_242,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_243,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_244,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_245,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_246,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_247,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_248,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_249,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_250,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_251,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_252,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_253,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_254,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_255,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_256,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_257,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_258,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_259,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_260,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_261,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_262,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_263,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_264,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_265,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_266,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_267,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_268,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_269,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_270,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_271,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_272,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_273,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_274,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_275,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_276,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_277,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_278,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_279,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_280,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_281,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_282,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_283,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_284,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_285,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_286,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_287,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_288,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_289,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_290,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_291,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_292,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_293,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_294,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_295,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_296,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_297,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_298,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_299,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_300,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_301,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_302,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_303,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_304,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_305,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_306,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_307,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_308,x:484.85,y:-125}).wait(1).to({graphics:mask_graphics_309,x:485,y:-125}).wait(1).to({graphics:mask_graphics_310,x:485,y:-124.95}).wait(1).to({graphics:mask_graphics_311,x:485,y:-124.5}).wait(1).to({graphics:mask_graphics_312,x:485,y:-123.25}).wait(1).to({graphics:mask_graphics_313,x:485,y:-120.9}).wait(1).to({graphics:mask_graphics_314,x:485,y:-117}).wait(1).to({graphics:mask_graphics_315,x:485,y:-111.15}).wait(1).to({graphics:mask_graphics_316,x:485,y:-103.05}).wait(1).to({graphics:mask_graphics_317,x:485,y:-92.25}).wait(1).to({graphics:mask_graphics_318,x:485,y:-78.35}).wait(1).to({graphics:mask_graphics_319,x:485,y:-61}).wait(1).to({graphics:mask_graphics_320,x:485,y:-39.8}).wait(1).to({graphics:mask_graphics_321,x:485,y:-14.4}).wait(1).to({graphics:mask_graphics_322,x:485,y:14.45}).wait(1).to({graphics:mask_graphics_323,x:485,y:39.85}).wait(1).to({graphics:mask_graphics_324,x:485,y:61.05}).wait(1).to({graphics:mask_graphics_325,x:485,y:78.4}).wait(1).to({graphics:mask_graphics_326,x:485,y:92.3}).wait(1).to({graphics:mask_graphics_327,x:485,y:103.1}).wait(1).to({graphics:mask_graphics_328,x:485,y:111.2}).wait(1).to({graphics:mask_graphics_329,x:485,y:117.05}).wait(1).to({graphics:mask_graphics_330,x:485,y:120.95}).wait(1).to({graphics:mask_graphics_331,x:485,y:123.3}).wait(1).to({graphics:mask_graphics_332,x:485,y:124.55}).wait(1).to({graphics:mask_graphics_333,x:485,y:125}).wait(1).to({graphics:mask_graphics_334,x:485,y:125}).wait(1).to({graphics:mask_graphics_335,x:485,y:125}).wait(1).to({graphics:mask_graphics_336,x:485,y:125}).wait(1).to({graphics:mask_graphics_337,x:485,y:125}).wait(1).to({graphics:mask_graphics_338,x:485,y:125}).wait(1).to({graphics:mask_graphics_339,x:485,y:125}).wait(1).to({graphics:mask_graphics_340,x:485,y:125}).wait(1).to({graphics:mask_graphics_341,x:485,y:125}).wait(1).to({graphics:mask_graphics_342,x:485,y:125}).wait(1).to({graphics:mask_graphics_343,x:485,y:125}).wait(1).to({graphics:mask_graphics_344,x:485,y:125}).wait(1).to({graphics:mask_graphics_345,x:485,y:125}).wait(1).to({graphics:mask_graphics_346,x:485,y:125}).wait(1).to({graphics:mask_graphics_347,x:485,y:125}).wait(1).to({graphics:mask_graphics_348,x:485,y:125}).wait(1).to({graphics:mask_graphics_349,x:485,y:125}).wait(1).to({graphics:mask_graphics_350,x:485,y:125}).wait(1).to({graphics:mask_graphics_351,x:485,y:125}).wait(1).to({graphics:mask_graphics_352,x:485,y:125}).wait(1).to({graphics:mask_graphics_353,x:485,y:125}).wait(1).to({graphics:mask_graphics_354,x:485,y:125}).wait(1).to({graphics:mask_graphics_355,x:485,y:125}).wait(1).to({graphics:mask_graphics_356,x:485,y:125}).wait(1).to({graphics:mask_graphics_357,x:485,y:125}).wait(1).to({graphics:mask_graphics_358,x:485,y:125}).wait(1).to({graphics:mask_graphics_359,x:485,y:125}).wait(1).to({graphics:mask_graphics_360,x:485,y:125}).wait(1).to({graphics:mask_graphics_361,x:485,y:125}).wait(1).to({graphics:mask_graphics_362,x:485,y:125}).wait(1).to({graphics:mask_graphics_363,x:485,y:125}).wait(1).to({graphics:mask_graphics_364,x:485,y:125}).wait(1).to({graphics:mask_graphics_365,x:485,y:125}).wait(1).to({graphics:mask_graphics_366,x:485,y:125}).wait(1).to({graphics:mask_graphics_367,x:485,y:125}).wait(1).to({graphics:mask_graphics_368,x:485,y:125}).wait(1).to({graphics:mask_graphics_369,x:485,y:125}).wait(1).to({graphics:mask_graphics_370,x:485,y:125}).wait(1).to({graphics:mask_graphics_371,x:485,y:125}).wait(1).to({graphics:mask_graphics_372,x:485,y:125}).wait(1).to({graphics:mask_graphics_373,x:485,y:125}).wait(1).to({graphics:mask_graphics_374,x:485,y:125}).wait(1).to({graphics:mask_graphics_375,x:485,y:125}).wait(1).to({graphics:mask_graphics_376,x:485,y:125}).wait(1).to({graphics:mask_graphics_377,x:485,y:125}).wait(1).to({graphics:mask_graphics_378,x:485,y:125}).wait(1).to({graphics:mask_graphics_379,x:485,y:125}).wait(1).to({graphics:mask_graphics_380,x:485,y:125}).wait(1).to({graphics:mask_graphics_381,x:485,y:125}).wait(1).to({graphics:mask_graphics_382,x:485,y:125}).wait(1).to({graphics:mask_graphics_383,x:485,y:125}).wait(1).to({graphics:mask_graphics_384,x:485,y:125}).wait(1).to({graphics:mask_graphics_385,x:485,y:125}).wait(1).to({graphics:mask_graphics_386,x:485,y:125}).wait(1).to({graphics:mask_graphics_387,x:485,y:125}).wait(1).to({graphics:mask_graphics_388,x:485,y:125}).wait(1).to({graphics:mask_graphics_389,x:485,y:125}).wait(1));

	// logo_negatif
	this.instance = new lib.Logo_SantanderInternationalneg();
	this.instance.setTransform(301.5,336.75,0.6647,0.664,0,0,0,408.4,123);
	this.instance._off = true;

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(24).to({_off:false},0).wait(285).to({y:101.7},0).to({regX:408.6,x:301.6,y:176.7},18,cjs.Ease.quadInOut).wait(52).to({alpha:0},10).wait(1));

	// logo_pos
	this.instance_1 = new lib.Logo_SantanderInternationalpos();
	this.instance_1.setTransform(301.5,176.75,0.6647,0.664,0,0,0,408.4,123);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(309).to({regX:408.5,x:301.55,y:351.65},18,cjs.Ease.quadInOut).wait(63));

	// header_animated
	this.instance_2 = new lib.mc_level1_animated();
	this.instance_2.setTransform(406.4,94.8,0.8674,0.8674,0,0,0,86.3,77);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(29).to({_off:false},0).wait(1).to({regX:179.1,regY:63.9,x:486.9,y:83.45},0).wait(269).to({regX:86.3,regY:77,x:406.4,y:94.8},0).wait(1).to({regX:179.1,regY:63.9,x:486.9,y:84.5,alpha:0.9911},0).wait(1).to({y:86.3,alpha:0.976},0).wait(1).to({y:89,alpha:0.9536},0).wait(1).to({y:92.7,alpha:0.9225},0).wait(1).to({y:97.7,alpha:0.8811},0).wait(1).to({y:104.15,alpha:0.827},0).wait(1).to({y:112.5,alpha:0.7574},0).wait(1).to({y:123.25,alpha:0.6679},0).wait(1).to({y:137,alpha:0.5532},0).wait(1).to({y:154.6,alpha:0.4064},0).wait(1).to({y:176.8,alpha:0.2214},0).wait(1).to({regX:86.3,regY:77,x:406.4,y:214.7,alpha:0},0).wait(1).to({regX:179.1,regY:63.9,x:486.9,y:224.1},0).wait(1).to({y:243.25},0).wait(1).to({y:259.05},0).wait(1).to({y:271.4},0).wait(1).to({y:280.9},0).wait(1).to({y:288.15},0).wait(1).to({y:293.65},0).wait(1).to({y:297.8},0).wait(1).to({y:300.85},0).wait(1).to({y:303.05},0).wait(1).to({y:304.45},0).wait(1).to({y:305.2},0).wait(1).to({regX:86.3,regY:77,x:406.4,y:316.8},0).wait(66));

	// subheader
	this.instance_3 = new lib.mc_level2();
	this.instance_3.setTransform(411.7,450.4,1.1666,1.1666,0,0,0,68.7,43.2);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(59).to({_off:false},0).wait(1).to({regX:143.8,regY:26.9,x:499.3,y:430.65},0).wait(1).to({y:429.35},0).wait(1).to({y:427.45},0).wait(1).to({y:424.85},0).wait(1).to({y:421.35},0).wait(1).to({y:416.75},0).wait(1).to({y:410.9},0).wait(1).to({y:403.3},0).wait(1).to({y:393.65},0).wait(1).to({y:381.25},0).wait(1).to({y:365.6},0).wait(1).to({y:346.9},0).wait(1).to({y:326.9},0).wait(1).to({y:308.45},0).wait(1).to({y:293.25},0).wait(1).to({regX:68.7,regY:43.2,x:411.7,y:300.4},0).wait(1).to({regX:143.8,regY:26.9,x:499.3,y:247.05,alpha:0.2784},0).wait(1).to({y:220.75,alpha:0.4913},0).wait(1).to({y:200.8,alpha:0.6534},0).wait(1).to({y:185.75,alpha:0.7753},0).wait(1).to({y:174.65,alpha:0.865},0).wait(1).to({y:166.85,alpha:0.9284},0).wait(1).to({y:161.75,alpha:0.9699},0).wait(1).to({y:158.9,alpha:0.9928},0).wait(1).to({regX:68.7,regY:43.2,x:411.7,y:177.05,alpha:1},0).wait(216).to({regX:143.8,regY:26.9,x:499.3,y:159.45,alpha:0.9801},0).wait(1).to({y:161.85,alpha:0.9463},0).wait(1).to({y:165.45,alpha:0.896},0).wait(1).to({y:170.4,alpha:0.8265},0).wait(1).to({y:177,alpha:0.7338},0).wait(1).to({y:185.6,alpha:0.6129},0).wait(1).to({y:196.7,alpha:0.4569},0).wait(1).to({y:211,alpha:0.2567},0).wait(1).to({regX:68.7,regY:43.2,x:411.7,y:248.3,alpha:0},0).to({y:177.05},16,cjs.Ease.quartInOut).wait(66));

	// T_C
	this.instance_4 = new lib.mc_level3();
	this.instance_4.setTransform(396.75,440.95,0.9588,0.9589,0,0,0,68,42.7);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(84).to({_off:false},0).wait(1).to({regX:151,regY:18,x:476.35,y:417.05},0).wait(1).to({y:416.55},0).wait(1).to({y:415.6},0).wait(1).to({y:414.15},0).wait(1).to({y:412.05},0).wait(1).to({y:409.15},0).wait(1).to({y:405.15},0).wait(1).to({y:399.65},0).wait(1).to({y:391.95},0).wait(1).to({y:380.45},0).wait(1).to({y:361.95},0).wait(1).to({x:476.4,y:331.9},0).wait(1).to({y:303.45},0).wait(1).to({y:286.1},0).wait(1).to({y:275},0).wait(1).to({regX:68,regY:42.8,x:396.75,y:291.05},0).wait(1).to({regX:151,regY:18,x:476.3,y:248.45,alpha:0.2857},0).wait(1).to({y:234.4,alpha:0.4987},0).wait(1).to({x:476.25,y:223.85,alpha:0.659},0).wait(1).to({y:215.95,alpha:0.779},0).wait(1).to({y:210.15,alpha:0.8671},0).wait(1).to({y:206.05,alpha:0.9294},0).wait(1).to({y:203.4,alpha:0.9703},0).wait(1).to({y:201.9,alpha:0.9929},0).wait(1).to({regX:68,regY:42.7,x:396.75,y:225.2,alpha:1},0).wait(185).to({regY:42.8,y:291.05,alpha:0},8,cjs.Ease.quartInOut).to({regY:42.7,y:440.95},22,cjs.Ease.quartInOut).to({_off:true},1).wait(65));

	// primary_cta
	this.instance_5 = new lib.primary_cta();
	this.instance_5.setTransform(860.05,269,1.1103,1.111,0,0,0,72,17.1);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;
	new cjs.ButtonHelper(this.instance_5, 0, 1, 2, false, new lib.primary_cta(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(119).to({_off:false},0).wait(1).to({regX:-264.5,regY:16.5,x:486.4,y:268.1},0).wait(1).to({y:267.75},0).wait(1).to({y:267.2},0).wait(1).to({y:266.4},0).wait(1).to({y:265.4},0).wait(1).to({y:264.05},0).wait(1).to({y:262.35},0).wait(1).to({y:260.15},0).wait(1).to({y:257.3},0).wait(1).to({y:253.7},0).wait(1).to({y:249.15},0).wait(1).to({y:243.7},0).wait(1).to({y:237.85},0).wait(1).to({y:232.45},0).wait(1).to({y:228.05},0).wait(1).to({y:224.6},0).wait(1).to({y:221.9},0).wait(1).to({y:219.9},0).wait(1).to({regX:72,regY:17.1,x:860.05,y:219},0).wait(1).to({regX:-264.5,regY:16.5,x:486.4,y:185.3,alpha:0.3518},0).wait(1).to({y:161,alpha:0.6106},0).wait(1).to({y:143.85,alpha:0.7935},0).wait(1).to({y:132.65,alpha:0.9131},0).wait(1).to({y:126.4,alpha:0.9794},0).wait(1).to({regX:72,regY:17.1,x:860.05,y:125.15,alpha:1},0).wait(146).to({regX:-264.5,regY:16.5,x:486.4,y:129.3,alpha:0.9487},0).wait(1).to({y:137.5,alpha:0.8612},0).wait(1).to({y:149.7,alpha:0.7315},0).wait(1).to({y:166.55,alpha:0.5519},0).wait(1).to({y:189,alpha:0.3124},0).wait(1).to({regX:72,regY:17.1,x:860.05,y:219,alpha:0},0).wait(1).to({regX:-264.5,regY:16.5,x:486.4,y:220.05},0).wait(1).to({y:222.3},0).wait(1).to({y:225.2},0).wait(1).to({y:228.9},0).wait(1).to({y:233.55},0).wait(1).to({y:239.1},0).wait(1).to({y:245.05},0).wait(1).to({y:250.5},0).wait(1).to({y:255.05},0).wait(1).to({y:258.55},0).wait(1).to({y:261.3},0).wait(1).to({y:263.35},0).wait(1).to({y:264.95},0).wait(1).to({y:266.15},0).wait(1).to({y:267},0).wait(1).to({y:267.65},0).wait(1).to({y:268.05},0).wait(1).to({y:268.25},0).wait(1).to({regX:72,regY:17.1,x:860.05,y:269},0).wait(76));

	// background_colour
	this.instance_6 = new lib.mc_background();
	this.instance_6.setTransform(150,300,1,1,0,0,0,150,300);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({regY:299.9,x:149.85,y:49.9},24,cjs.Ease.quartInOut).wait(285).to({x:150},0).to({regY:300,y:300},25,cjs.Ease.cubicInOut).wait(56));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(480.1,-125,497.69999999999993,581.1);
// library properties:
lib.properties = {
	id: '05920BE2A36F420086AAC3866015E257',
	width: 970,
	height: 250,
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