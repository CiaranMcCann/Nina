///<reference path="../BasePuzzle.ts"/>
///<reference path="Cloud.ts"/>

class RainDrop extends BasePuzzle
{
    private _startPosition;

    constructor( xInPxs: number, yInPxs: number )
    {
        super(new Sprite(Sprites.animations.waterCoin), xInPxs, yInPxs);
        this._startPosition = new b2Vec2(this.body.GetPosition().x, this.body.GetPosition().y);
    }

    Update()
    {
        
    }

    beginContact(contact)
    {
        //when we are having contact( and the contacted is not another raindrop, nor the cloud), we will respawn the droplet in the cloud )
        var a: any = contact.GetFixtureA().GetBody().GetUserData();
        var b: any = contact.GetFixtureB().GetBody().GetUserData();

        var other: any = a instanceof RainDrop ? b : a;

        if (other instanceof RainDrop || other instanceof Cloud) return;

        this.body.SetPosition(this._startPosition);
    }
};