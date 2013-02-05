///<reference path="../BasePuzzle.ts"/>
///<reference path="Cloud.ts"/>

class RainDrop extends BasePuzzle
{    
    private _puzzleManager: IPuzzleManager;
    constructor( pm: IPuzzleManager, xInPxs: number, yInPxs: number )
    {
        super(new Sprite(Sprites.animations.droplet), xInPxs, yInPxs);
        this.SetupPhysics(1.0, 1.0, 1.0, Physics.pixelToMeters(6), Physics.pixelToMeters(32.5), b2Body.b2_dynamicBody);
        this._puzzleManager = pm;
    }

    Update()
    {
        super.Update();
        this.body.SetPosition(new b2Vec2(this.body.GetPosition().x - Physics.pixelToMeters(5), this.body.GetPosition().y + Physics.pixelToMeters(5)));
    }

    DrawSprite(ctx)
    {
        this.sprite.draw(ctx, -this.sprite.getFrameWidth() / 2, -this.sprite.getFrameHeight() / 2);
    }

    beginContact(contact)
    {
       
        //when we are having contact( and the contacted is not another raindrop, nor the cloud), we will respawn the droplet in the cloud )
        var a: any = contact.GetFixtureA().GetBody().GetUserData();
        var b: any = contact.GetFixtureB().GetBody().GetUserData();

        var other: any = a instanceof RainDrop ? b : a;

        if (other instanceof RainDrop || other instanceof Cloud) return;

        this.isAlive = false;        
    }
};