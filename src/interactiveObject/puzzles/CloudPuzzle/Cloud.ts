///<reference path="../BasePuzzle.ts"/>
///<reference path="InteractiveFire.ts"/>
///<reference path="RainDrop.ts"/>

class Cloud extends BasePuzzle {
    private _walter: Walter;
    private _alex: Alex;

    private _puzzleManager: IPuzzleManager;

    //after Walter has jumped into the fire, we create a cloud.
    //when Alex has joined Walter, the cloud will turn into a thundercloud
    private _isAlexJoined: bool;
    private _hasCloudReachedTop: bool;

    private _isWalterSpawned: bool;//flags whether walter is spawned as a raindrop
    private _isWalterOnGround: bool;//flags whether Walter is back on the ground

    // private _isAlexSpawned: bool;
    private _isAlexOnGround: bool;
    private _isAlexSpawned: bool;

    private _newPos;

    //there is a minimum and maximum to the heiht of the cloud when alex hasn't joined yet. 
    private _hoverPosMin;
    private _hoverPosMax;

    private _speed: number;
    private _rainDif: number;

    private _currentTime: number;
    private _timeRainStarted: number;

    constructor(pm: IPuzzleManager) {
        //TODO: add the correct animation here
        super(new Sprite(Sprites.animations.cloudAnimCreation, true), 1600, 1700);

        var width = Physics.pixelToMeters(200);
        var height = Physics.pixelToMeters(100);
        super.SetupPhysics(0.0, 1.0, 0.0, width, height);

        this._puzzleManager = pm;

        this._speed = Physics.pixelToMeters(5);

        this._currentTime = new Date().getTime();

        this._walter = GameInstance.level.walter;
        this._alex = GameInstance.level.alex;

        this._walter.getBody().SetPosition(new b2Vec2(this.body.GetPosition().x, this.body.GetPosition().y - Physics.pixelToMeters(220)));
        this._walter.setCanDraw(false);
        this._walter.setCanWalk(false);
    }

    beginContact(contact) {
        var a: any = contact.GetFixtureA().GetBody().GetUserData();
        var b: any = contact.GetFixtureB().GetBody().GetUserData();

        var other: any = a instanceof Cloud ? b : a;

        //we only do something if the other collider is alex and he hasn't already joined the cloud
        if (!(other instanceof Alex) || this._isAlexJoined) return;

        this._alex.setCanDraw(false);
        this._alex.setCanWalk(false);

        this._isAlexJoined = true;
    }

    DrawSprite(ctx) {
        this.sprite.draw(ctx, -this.sprite.getFrameWidth() / 2, -this.sprite.getFrameHeight() / 2);
    }

    CloudWithAlex()
    {
        if (this._hasCloudReachedTop) return;
        this._alex.MakeCameraFollow();
        //this.body.SetPosition(;
        this.body.SetPosition(new b2Vec2(this.body.GetPosition().x, this.body.GetPosition().y - this._speed));
        if (this.body.GetPosition().y < Physics.pixelToMeters(0))
        {
            this._hasCloudReachedTop = true;
            this._timeRainStarted = new Date().getTime();
        }
    }

    Raining() {
        if (this._isWalterOnGround) return;
        if (!this._isWalterSpawned) {
            if (this._currentTime - this._timeRainStarted >= 3000) {
                //here, we are going to place Walter in the cloud, and then he will move down
                this._walter.getBody().SetPosition(new b2Vec2(this.body.GetPosition().x, this.body.GetPosition().y + Physics.pixelToMeters(220)));
                this._isWalterSpawned = true;
                this._walter.setCanDraw(true);
            }
        } else {
            this._walter.getBody().SetPosition(new b2Vec2(this._walter.getBody().GetPosition().x - Physics.pixelToMeters(15), this._walter.getBody().GetPosition().y));
            //after six seconds, the player should be able to move again.
            if (this._currentTime - this._timeRainStarted >= 5500) {
                this._walter.setCanWalk(true);
                this._isWalterOnGround = true;
            }
        }
    }

    Thundering() {
        if (this._isAlexOnGround) return;
        if (!this._isAlexSpawned) {
            if (this._currentTime - this._timeRainStarted >= 2000) {
                //here, we are going to place alex in the cloud, and then he will move down
                this._alex.getBody().SetPosition(new b2Vec2(this.body.GetPosition().x, this.body.GetPosition().y + Physics.pixelToMeters(220)));
                this._isAlexSpawned = true;
                this._alex.setCanDraw(true);
            }
        } else {
            this._alex.getBody().SetPosition(new b2Vec2(this._alex.getBody().GetPosition().x - Physics.pixelToMeters(15), this._alex.getBody().GetPosition().y));
            //after six seconds, the player should be able to move again.
            if (this._currentTime - this._timeRainStarted >= 5500) {
                this._alex.setCanWalk(true);
                this._isAlexOnGround = true;
            }
        }
    }

    Update() {
        if (this._isAlexOnGround && this._isWalterOnGround) {
            this.isAlive = false;
            this._isAlexJoined = false;
            InteractiveFire.hasWalterCollision = false;
            InteractiveFire.isCloudCreated = false;
        }
        if (this._isAlexJoined) {
            this.CloudWithAlex();
            if (!this._hasCloudReachedTop)
                this._alex.getBody().SetPosition(new b2Vec2(this.body.GetPosition().x, this.body.GetPosition().y - Physics.pixelToMeters(220)));
        }
        if (this.sprite.getCurrentFrame() <= 7) super.Update();
        var newTime: number = new Date().getTime();
        if (this._hasCloudReachedTop && newTime - this._currentTime >= 75) {
            this.Raining();
            this.Thundering();
            for (var i: number = 0; i < 1; i++) {
                var x: number = this.body.GetPosition().x - Physics.pixelToMeters(200) + Math.random() * Physics.pixelToMeters(400);
                this._puzzleManager.CreatePuzzle(new RainDrop(this._puzzleManager, Physics.metersToPixels(x), Physics.metersToPixels(this.body.GetPosition().y) + 120));
            }
            this._currentTime = newTime;
        }
    }
}