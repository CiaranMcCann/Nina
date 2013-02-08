var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Cloud = (function (_super) {
    __extends(Cloud, _super);
    function Cloud(pm) {
        var _this = this;
        _super.call(this, new Sprite(Sprites.animations.cloudAnimCreation, true), 1800, 1540);
        this.sprite.onAnimationFinish(function () {
            _this.sprite = new Sprite(Sprites.animations.cloudAnimWithoutAlex);
        });
        var width = Physics.pixelToMeters(200);
        var height = Physics.pixelToMeters(100);
        _super.prototype.SetupPhysics.call(this, 0.0, 1.0, 0.0, width, height);
        this._puzzleManager = pm;
        this._speed = Physics.pixelToMeters(5);
        this._currentTime = new Date().getTime();
        this._walter = GameInstance.level.walter;
        this._alex = GameInstance.level.alex;
        this._walter.getBody().SetPosition(new b2Vec2(this.body.GetPosition().x, this.body.GetPosition().y - Physics.pixelToMeters(220)));
        this._walter.setCanDraw(false);
        this._walter.setCanWalk(false);
    }
    Cloud.prototype.IsAlexOnCloud = function () {
        return this._isAlexJoined;
    };
    Cloud.prototype.beginContact = function (contact) {
        var a = contact.GetFixtureA().GetBody().GetUserData();
        var b = contact.GetFixtureB().GetBody().GetUserData();
        var other = a instanceof Cloud ? b : a;
        if(!(other instanceof Alex) || this._isAlexJoined) {
            return;
        }
        this.sprite = new Sprite(Sprites.animations.cloudAnimWithAlex);
        this._alex.setCanDraw(false);
        this._alex.setCanWalk(false);
        this._isAlexJoined = true;
    };
    Cloud.prototype.DrawSprite = function (ctx) {
        this.sprite.draw(ctx, -this.sprite.getFrameWidth() / 2, -this.sprite.getFrameHeight() / 2);
    };
    Cloud.prototype.CloudWithAlex = function () {
        if(this._hasCloudReachedTop) {
            return;
        }
        this._alex.MakeCameraFollow();
        this.body.SetPosition(new b2Vec2(this.body.GetPosition().x, this.body.GetPosition().y - this._speed));
        if(this.body.GetPosition().y < Physics.pixelToMeters(100)) {
            this._hasCloudReachedTop = true;
            this._timeRainStarted = new Date().getTime();
        }
    };
    Cloud.prototype.Raining = function () {
        if(this._isWalterOnGround) {
            return;
        }
        if(!this._isWalterSpawned) {
            if(this._currentTime - this._timeRainStarted >= 3000) {
                this._walter.getBody().SetPosition(new b2Vec2(this.body.GetPosition().x - Physics.pixelToMeters(200), this.body.GetPosition().y));
                this._isWalterSpawned = true;
                this._walter.setCanDraw(true);
            }
        } else {
            this._walter.getBody().SetPosition(new b2Vec2(this._walter.getBody().GetPosition().x - Physics.pixelToMeters(25), this._walter.getBody().GetPosition().y));
            if(this._currentTime - this._timeRainStarted >= 4500) {
                this._walter.setCanWalk(true);
                this._isWalterOnGround = true;
            }
        }
    };
    Cloud.prototype.Thundering = function () {
        if(this._isAlexOnGround) {
            return;
        }
        if(!this._isAlexSpawned) {
            if(this._currentTime - this._timeRainStarted >= 2000) {
                this._alex.getBody().SetPosition(new b2Vec2(this.body.GetPosition().x - Physics.pixelToMeters(200), this.body.GetPosition().y));
                this._isAlexSpawned = true;
                this._alex.setCanDraw(true);
            }
        } else {
            this._alex.getBody().SetPosition(new b2Vec2(this._alex.getBody().GetPosition().x - Physics.pixelToMeters(25), this._alex.getBody().GetPosition().y));
            if(this._currentTime - this._timeRainStarted >= 3500) {
                this._alex.setCanWalk(true);
                this._isAlexOnGround = true;
            }
        }
    };
    Cloud.prototype.Update = function () {
        if(this._isAlexOnGround && this._isWalterOnGround) {
            this.isAlive = false;
            this._isAlexJoined = false;
            InteractiveFire.hasWalterCollision = false;
            InteractiveFire.isCloudCreated = false;
        }
        if(this._isAlexJoined) {
            this.CloudWithAlex();
            if(!this._hasCloudReachedTop) {
                this._alex.getBody().SetPosition(new b2Vec2(this.body.GetPosition().x - Physics.pixelToMeters(100), this.body.GetPosition().y - Physics.pixelToMeters(220)));
            }
        }
        _super.prototype.Update.call(this);
        var newTime = new Date().getTime();
        if(this._hasCloudReachedTop && newTime - this._currentTime >= 100) {
            this.Raining();
            this.Thundering();
            for(var i = 0; i < 2; i++) {
                var x = this.body.GetPosition().x - Physics.pixelToMeters(200) + Math.random() * Physics.pixelToMeters(400);
                this._puzzleManager.CreatePuzzle(new RainDrop(this._puzzleManager, Physics.metersToPixels(x), Physics.metersToPixels(this.body.GetPosition().y) + 120));
            }
            this._currentTime = newTime;
        }
    };
    return Cloud;
})(BasePuzzle);
