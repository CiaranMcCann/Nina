///<reference path="../BasePuzzle.ts"/>
///<reference path="Cloud.ts"/>

class RainDrop extends BasePuzzle
{
    private _puzzleManager: IPuzzleManager;
    constructor( pm: IPuzzleManager, xInPxs: number, yInPxs: number )
    {
        super(new Sprite(Sprites.animations.waterCoin), xInPxs, yInPxs);
        this._puzzleManager = pm;
    }

    Update()
    {
        this.body.SetPosition(new b2Vec2(this.body.GetPosition().x, this.body.GetPosition().y + Physics.pixelToMeters(0.5)));
    }

    beginContact(contact)
    {
        //when we are having contact( and the contacted is not another raindrop, nor the cloud), we will respawn the droplet in the cloud )
        var a: any = contact.GetFixtureA().GetBody().GetUserData();
        var b: any = contact.GetFixtureB().GetBody().GetUserData();

        var other: any = a instanceof RainDrop ? b : a;

        if (other instanceof RainDrop || other instanceof Cloud) return;

        this._puzzleManager.RemovePuzzle(this);
    }
};