///<reference path="../BasePuzzle.ts"/>
///<reference path="Cloud.ts"/>

class RainDrop extends BasePuzzle
{
    public isAlive: bool = true;
    private _puzzleManager: IPuzzleManager;
    constructor( pm: IPuzzleManager, xInPxs: number, yInPxs: number )
    {
        super(new Sprite(Sprites.animations.droplet), xInPxs, yInPxs);
        this.SetupPhysics(1.0, 1.0, 1.0, Physics.pixelToMeters(6), Physics.pixelToMeters(32.5));
        this._puzzleManager = pm;
    }

    Update()
    {
        super.Update();
        this.body.SetPosition(new b2Vec2(this.body.GetPosition().x - Physics.pixelToMeters(2), this.body.GetPosition().y + Physics.pixelToMeters(10)));       
    }

    DrawSprite(ctx)
    {
        this.sprite.draw(ctx, -this.sprite.getFrameWidth() / 2, -this.sprite.getFrameHeight() / 2);
    }

    beginContact(contact)
    {
        console.log("collision");
        //when we are having contact( and the contacted is not another raindrop, nor the cloud), we will respawn the droplet in the cloud )
        var a: any = contact.GetFixtureA().GetBody().GetUserData();
        var b: any = contact.GetFixtureB().GetBody().GetUserData();

        var other: any = a instanceof RainDrop ? b : a;

        if (other instanceof RainDrop || other instanceof Cloud) return;

        this._puzzleManager.RemovePuzzle(this);
        this.isAlive = false;        
    }
};