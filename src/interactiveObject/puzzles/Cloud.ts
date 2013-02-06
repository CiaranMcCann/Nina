///<reference path="BasePuzzle.ts"/>

class Cloud extends BasePuzzle
{
    private _puzzleManager;

    //after Walter has jumped into the fire, we create a cloud.
    //when Alex has joined Walter, the cloud will turn into a thundercloud
    private _isAlexJoined: bool;
    private _hasCloudReachedTop: bool;
    private _newPos;

    //there is a minimum and maximum to the heiht of the cloud when alex hasn't joined yet. 
    private _hoverPosMin;
    private _hoverPosMax;

    private _speed: number;

    constructor( pm: IPuzzleManager )
    {
        //TODO: add the correct animation here
        super(new Sprite(Sprites.animations.alexWalking), 200, 750);

        var width   = Physics.pixelToMeters(200);
        var height  = Physics.pixelToMeters(100);
        super.SetupPhysics(0.0, 1.0, 0.0, width, height);

        this._puzzleManager = pm;
        
        this._hoverPosMin = Utilies.VectorPixels( 200, 700 );
        this._hoverPosMax = Utilies.VectorPixels( 200, 750 );
        this._newPos = Utilies.VectorPixels( 200, 700 );
        this._speed = Physics.pixelToMeters(0.5);
    }

    beginContact( contact )
    {
        var a: any = contact.GetFixtureA().GetBody().GetUserData();
        var b: any = contact.GetFixtureB().GetBody().GetUserData();

        var other: any = a instanceof InteractiveFire ? b : a;

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
            this._hasCloudReachedTop = true;
        }
    }

    CloudWithoutAlex()
    {
        var v = new b2Vec2(this._newPos.x, this._newPos.y);
        //alex hasn't joined yet, so we are just hovering over the fire for a bit
        if (Utilies.Distance(this._newPos, this.body.GetPosition()) <= Physics.metersToPixels(this._speed))
        {
            v = Utilies.Distance(this._newPos, this._hoverPosMax) <= this._speed ? this._hoverPosMin : this._hoverPosMax;
            this._newPos.Set(v.x, v.y);
        }
        //switch direction
        v.x -= this.body.GetPosition().x;
        v.y -= this.body.GetPosition().y;

        v.Normalize();

        v.x *= Physics.pixelToMeters(this._speed);
        v.y *= Physics.pixelToMeters(this._speed);

        this.body.SetPosition(new b2Vec2(0, this.body.GetPosition().y + v.y));
    }

    Raining( )
    {
        
    }

    Update( )
    {
        if (this._isAlexJoined )
        {
            this.CloudWithAlex();
        } else
        {
            this.CloudWithoutAlex();
        }
        if (this._hasCloudReachedTop)
        {
            this.Raining();
        }
    }
}