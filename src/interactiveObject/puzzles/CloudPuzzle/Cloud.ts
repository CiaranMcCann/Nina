///<reference path="../BasePuzzle.ts"/>
///<reference path="InteractiveFire.ts"/>
///<reference path="RainDrop.ts"/>

class Cloud extends BasePuzzle
{
    private _puzzleManager: IPuzzleManager;

    //after Walter has jumped into the fire, we create a cloud.
    //when Alex has joined Walter, the cloud will turn into a thundercloud
    private _isAlexJoined: bool;
    private _hasCloudReachedTop: bool;
    private _newPos;

    //there is a minimum and maximum to the heiht of the cloud when alex hasn't joined yet. 
    private _hoverPosMin;
    private _hoverPosMax;

    private _speed: number;
    private _rainDif: number;
    
    private _currentTime: number;
    private _timeRainStarted: number;

    constructor( pm: IPuzzleManager )
    {       
        //TODO: add the correct animation here
        super(new Sprite(Sprites.animations.cloudAnim, true), 4000, 1900);

        var width   = Physics.pixelToMeters(200);
        var height  = Physics.pixelToMeters(100);
        super.SetupPhysics(0.0, 1.0, 0.0, width, height);

        this._puzzleManager = pm;
      
        this._speed = Physics.pixelToMeters(5);

        this._currentTime = new Date().getTime();
    }

    beginContact( contact )
    {
        var a: any = contact.GetFixtureA().GetBody().GetUserData();
        var b: any = contact.GetFixtureB().GetBody().GetUserData();

        var other: any = a instanceof Cloud ? b : a;

        //we only do something if the other collider is alex and he hasn't already joined the cloud
        if (!(other instanceof Alex) || this._isAlexJoined) return;

        this._isAlexJoined = true;        
    }

    DrawSprite( ctx )
    {
        this.sprite.draw(ctx, -this.sprite.getFrameWidth() / 2, -this.sprite.getFrameHeight() / 2);
    }

    CloudWithAlex()
    {
        if (this._hasCloudReachedTop) return;
        //this.body.SetPosition(;
        this.body.SetPosition(new b2Vec2(this.body.GetPosition().x, this.body.GetPosition().y - this._speed));
        if (this.body.GetPosition().y < Physics.pixelToMeters( 1000 ))
        {            
            this._hasCloudReachedTop    = true;
            this._timeRainStarted = new Date().getTime();
        }
    }
   
    Raining( )
    {
        if (this._currentTime - this._timeRainStarted >= 3000)
        {

        }
    }

    Update( )
    {
        if (this._isAlexJoined )
        {
            this.CloudWithAlex();
        }
        /*if (this.sprite.getCurrentFrame() <= 5)*/ super.Update();
        var newTime: number = new Date().getTime();
        if (this._hasCloudReachedTop && newTime - this._currentTime >= 1500 )
        {
            this.Raining();
            for (var i: number = 0; i < 1; i++)
            {
                var x: number = this.body.GetPosition().x - Physics.pixelToMeters( 200 ) + Math.random() * Physics.pixelToMeters(400);
                this._puzzleManager.CreatePuzzle(new RainDrop(this._puzzleManager, Physics.metersToPixels(x), Physics.metersToPixels(this.body.GetPosition().y)));
            }
            this._currentTime = newTime;
        }        
    }
}