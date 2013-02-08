var Sound = (function () {
    function Sound(buffer) {
        this.buffer = buffer;
        this.playing = false;
        if(!this.buffer) {
            Logger.error("buffer null");
        }
    }
    Sound.context = new webkitAudioContext();
    Sound.prototype.play = function (volume, time, allowSoundOverLay) {
        if (typeof volume === "undefined") { volume = 1; }
        if (typeof time === "undefined") { time = 0; }
        if (typeof allowSoundOverLay === "undefined") { allowSoundOverLay = false; }
        var _this = this;
        if(Settings.SOUND) {
            if(this.playing == false || allowSoundOverLay == true) {
                this.source = Sound.context.createBufferSource();
                this.source.buffer = this.buffer;
                var gainNode = Sound.context.createGainNode();
                this.source.connect(gainNode);
                gainNode.connect(Sound.context.destination);
                gainNode.gain.value = volume;
                this.source.noteOn(time);
                this.playing = true;
                var bufferLenght = this.buffer.duration;
                setTimeout(function () {
                    _this.playing = false;
                }, bufferLenght * 1000);
            }
        } else {
            Logger.debug("Sounds are currently disabled");
        }
    };
    Sound.prototype.isPlaying = function () {
        return this.playing;
    };
    Sound.prototype.pause = function () {
        if(Settings.SOUND) {
            this.source.noteOff(0);
        }
    };
    return Sound;
})();
