var ButtonBashing = (function () {
    function ButtonBashing(controls, wearer) {
        this._isAlive = true;
        this._percentage = 0;
        this.tubeWidth = 280;
        this.controls = controls;
        this._wearer = wearer;
        this._hertzValue = 0;
        this._hertzDelta = 0;
        this._currentTime = new Date().getTime();
        this._currentTime2 = new Date().getTime();
        this._buttons = new Sprite(Sprites.animations.buttonsAlex);
        this.image = AssetManager.getImage("EmptyBar");
    }
    ButtonBashing.prototype.getPercentage = function () {
        return this._percentage;
    };
    ButtonBashing.prototype.SetOnDone = function (f) {
        this._onDone = f;
    };
    ButtonBashing.prototype.draw = function (ctx) {
        if(!this._hasCollision || !this._isAlive) {
            return;
        }
        var posX = Physics.metersToPixels(this._wearer.getBody().GetPosition().x);
        var posY = Physics.metersToPixels(this._wearer.getBody().GetPosition().y);
        var difX = 100;
        var difY = 100;
        this.tubeWidth = ctx.canvas.width * 0.15;
        this.tubeHeight = ctx.canvas.height * 0.05;
        var hertzBarY = ctx.canvas.height - (ctx.canvas.height * 0.1);
        var hertzBarX = ctx.canvas.width * 0.05;
        var grd = ctx.createLinearGradient(posX - (ctx.canvas.width * 0.065), 0, (posX - (ctx.canvas.width * 0.065)) + this.tubeWidth, 0);
        grd.addColorStop(0, 'red');
        grd.addColorStop(0.25, 'yellow');
        grd.addColorStop(0.5, "green");
        grd.addColorStop(0.75, 'yellow');
        grd.addColorStop(1.0, 'red');
        ctx.fillStyle = grd;
        ctx.fillRect(posX - (ctx.canvas.width * 0.065), posY - (ctx.canvas.height * 0.09), this.tubeWidth, this.tubeHeight);
        ctx.fillStyle = "rgba(0, 0, 0, 255)";
        ctx.fillRect((posX - (ctx.canvas.width * 0.065)) + this.tubeWidth / 2 + this._hertzValue, posY - (ctx.canvas.height * 0.09), 0.3, this.tubeHeight);
        ctx.drawImage(this.image, posX - (ctx.canvas.width * 0.068), posY - (ctx.canvas.height * 0.1), this.tubeWidth * 1.04, this.tubeHeight * 1.5);
        var thisIsHorribleX = 0.9835;
        var grd2 = ctx.createLinearGradient(posX * thisIsHorribleX, 0, posX + 100, 0);
        grd2.addColorStop(0, 'red');
        grd2.addColorStop(0.5, 'yellow');
        grd2.addColorStop(1.0, 'green');
        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        ctx.fillRect(posX - (ctx.canvas.width * 0.0125), posY - (ctx.canvas.height * 0.115), 100, this.tubeHeight * 0.475);
        ctx.fillStyle = grd2;
        ctx.fillRect(posX - (ctx.canvas.width * 0.0125), posY - (ctx.canvas.height * 0.115), this._percentage, this.tubeHeight * 0.475);
        ctx.drawImage(this.image, posX - (ctx.canvas.width * 0.0145), posY - (ctx.canvas.height * 0.12), 105, this.tubeHeight * 0.65);
        ctx.save();
        this._buttons.draw(ctx, posX - difX, posY - (difY + 100));
        ctx.restore();
    };
    ButtonBashing.prototype.update = function (hasCollision) {
        this._hasCollision = hasCollision;
        if(!this._hasCollision || !this._isAlive) {
            return;
        }
        var newTime = new Date().getTime();
        if(newTime - this._currentTime >= 500) {
            this._currentTime = newTime;
            this._hertzDelta = Math.random() > 0.5 ? -0.25 : 0.25;
        }
        var newTime2 = new Date().getTime();
        if(newTime2 - this._currentTime2 >= 100) {
            this._hertzDelta *= 1.5;
            this._currentTime2 = newTime2;
        }
        this._hertzValue += this._hertzDelta;
        if(keyboard.isKeyDown(this.controls.positive)) {
            if(!this._isButtonOneDown) {
                this._hertzValue += 15;
                this._isButtonOneDown = true;
            }
        } else {
            this._isButtonOneDown = false;
        }
        if(keyboard.isKeyDown(this.controls.negative)) {
            if(!this._isButtonTwoDown) {
                this._hertzValue -= 15;
                this._isButtonTwoDown = true;
            }
        } else {
            this._isButtonTwoDown = false;
        }
        this._hertzValue = Math.max(this._hertzValue, -(this.tubeWidth / 2));
        this._hertzValue = Math.min(this._hertzValue, this.tubeWidth / 2);
        if(Math.abs(this._hertzValue) <= 35) {
            this._percentage += 0.25;
        } else {
            this._percentage -= 1;
            this._percentage = Math.max(this._percentage, 0);
        }
        if(this._percentage >= 100) {
            this._onDone();
            this._isAlive = false;
        }
        this._buttons.update();
    };
    return ButtonBashing;
})();
