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
        console.log("create cloud!");
        //TODO: add the correct animation here
        super(new Sprite(Sprites.animations.cloudAnim, true),4800, 1900);

        var width   = Physics.pixelToMeters(200);
        var height  = Physics.pixelToMeters(100);
        super.SetupPhysics(0.0, 1.0, 0.0, width, height);

        this._puzzleManager = pm;
      
        this._speed = Physics.pixelToMeters(0.5);

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

    Draw( ctx )
    {
        
    }

    CloudWithAlex()
    {
        if (this._hasCloudReachedTop) return;
        //this.body.SetPosition(;
        this.body.SetPosition(new b2Vec2(0, this.body.GetPosition().y - Physics.pixelToMeters(1)));
        if (this.body.GetPosition().y < Physics.pixelToMeters( 100 ))
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

        var newTime: number = new Date().getTime();
        if (this._hasCloudReachedTop && newTime - this._currentTime >= 75 )
        {
            this.Raining();
            for (var i: number = 0; i < 2; i++)
            {
                var x: number = this.body.GetPosition().x + Math.random( ) * this.sprite.getFrameWidth( );
                var y: number = this.body.GetPosition().y + Math.random( ) * this.sprite.getFrameHeight( );

                this._puzzleManager.CreatePuzzle(new RainDrop(this._puzzleManager,x, y));
            }
            this._currentTime = newTime;
        }
    }
}