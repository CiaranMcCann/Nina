var Sprite = (function () {
    function Sprite(spriteDef, noLoop) {
        if (typeof noLoop === "undefined") { noLoop = false; }
        this.lastUpdateTime = 0;
        this.accumulateDelta = 0;
        this.isSpriteLocked = false;
        this.setSpriteDef(spriteDef);
        this.noLoop = noLoop;
    }
    Sprite.prototype.update = function () {
        if(this.finished == false) {
            var delta = Date.now() - this.lastUpdateTime;
            if(this.accumulateDelta > this.spriteDef.msPerFrame) {
                this.accumulateDelta = 0;
                this.currentFrameY++;
                if(this.currentFrameY >= this.spriteDef.frameCount) {
                    if(this.noLoop) {
                        this.finished = true;
                        if(this.onFinishFunc != null) {
                            this.onFinishFunc();
                            this.onFinishFunc = null;
                        }
                    }
                    this.currentFrameY = this.spriteDef.frameY;
                }
            } else {
                this.accumulateDelta += delta;
            }
            this.lastUpdateTime = Date.now();
        }
    };
    Sprite.prototype.drawOnCenter = function (ctx, x, y, spriteToCenterOn) {
        if(this.finished == false) {
            ctx.save();
            ctx.translate((spriteToCenterOn.getImage().width - this.getImage().width) / 2, (spriteToCenterOn.getFrameHeight() - this.getFrameHeight()) / 2);
            this.draw(ctx, x, y);
            ctx.restore();
        }
    };
    Sprite.prototype.draw = function (ctx, x, y) {
 {
            ctx.drawImage(this.image, 0, Math.floor(this.currentFrameY) * this.frameHeight, this.image.width, this.frameHeight, Math.round(x), Math.round(y), this.image.width, this.frameHeight);
        }
    };
    Sprite.prototype.getImage = function () {
        return this.image;
    };
    Sprite.prototype.getCurrentFrame = function () {
        return this.currentFrameY;
    };
    Sprite.prototype.setCurrentFrame = function (frame) {
        if(frame > 0 && frame < this.spriteDef.frameCount) {
            this.currentFrameY = frame;
        }
    };
    Sprite.prototype.setNoLoop = function (val) {
        this.noLoop = val;
    };
    Sprite.prototype.getFrameHeight = function () {
        return this.frameHeight;
    };
    Sprite.prototype.getFrameWidth = function () {
        return this.image.width;
    };
    Sprite.prototype.getTotalFrames = function () {
        return this.spriteDef.frameCount;
    };
    Sprite.prototype.onAnimationFinish = function (func) {
        this.onFinishFunc = func;
    };
    Sprite.prototype.setSpriteDef = function (spriteDef, lockSprite, noLoop) {
        if (typeof lockSprite === "undefined") { lockSprite = false; }
        if (typeof noLoop === "undefined") { noLoop = false; }
        if(spriteDef != this.spriteDef) {
            if(this.isSpriteLocked == false) {
                this.noLoop = noLoop;
                this.finished = false;
                this.spriteDef = spriteDef;
                this.currentFrameY = spriteDef.frameY;
                this.isSpriteLocked = lockSprite;
                this.image = AssetManager.images[spriteDef.imageName];
                this.frameHeight = this.image.height / spriteDef.frameCount;
            }
        }
        if(this.spriteDef == spriteDef) {
            this.isSpriteLocked = lockSprite;
        }
    };
    return Sprite;
})();
