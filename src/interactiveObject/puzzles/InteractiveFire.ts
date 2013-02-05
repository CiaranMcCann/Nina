///<reference path="BasePuzzle.ts"/>
///<reference path="../../animation/Sprite.ts/>
///<reference path="../../system/Physics.ts"/>
///<reference path="Cloud.ts"/>

class InteractiveFire extends BasePuzzle
{
    private _puzzleManager: IPuzzleManager;
    private _isCloudCreated: bool = false;
    private _hasWalterCollision: bool = false;

    constructor( pm: IPuzzleManager, xInPixels: number, yInPixels: number )
    {
        super(new Sprite(Sprites.animations.alexWalking), xInPixels, yInPixels);
        var width   = Physics.pixelToMeters(150)
        var height  = Physics.pixelToMeters(10);

        super.SetupPhysics(0.0, 1.0, 0.0, width, height);
        this._puzzleManager = pm;   
    }

    beginContact( contact )
    {
        var a: any = contact.GetFixtureA().GetBody().GetUserData();
        var b: any = contact.GetFixtureB().GetBody().GetUserData();

        var other: any = a instanceof InteractiveFire ? b : a;

        if ( !(other instanceof Walter ) || this._hasWalterCollision ) return;
        
        //if the other collider is Walter, we create a cloud
        this._isCloudCreated = this._hasWalterCollision = true;
    }

    Update( )
    {
        if (this._isCloudCreated)
        {
            this._isCloudCreated = false;
            this._puzzleManager.CreatePuzzle(new Cloud(this._puzzleManager));
        }
    }
}