///<reference path="../../system/Physics.ts"/>
///<reference path="../../animation/Sprite.ts/>"

interface IPuzzle
{
    Draw(ctx);
    Update();
    SetupPhysics(density: number, friction, number, restitution: number, width: number, height: number);
};

class BasePuzzle implements isPhysicsBody, IPuzzle
{
    public sprite: Sprite;

    //the physics body, PROTECTED YA BASTARDS ^.^
    public body;
    
    private _xInPxs: number;
    private _yInPxs: number;

    constructor(sprite: Sprite, xInpxs: number, yInPxs: number )
    {
        this.sprite = sprite;

        this._xInPxs = xInpxs;
        this._yInPxs = yInPxs;     
    }

    Draw(ctx)
    {
        if (Sprite === null) return;
        
        //Get position of the physics body and convert it to pixel cordinates
        var pos = Physics.vectorMetersToPixels(this.body.GetPosition());

        ctx.save();
        ctx.translate(pos.x, pos.y);

        this.DrawSprite(ctx);

        ctx.restore()
    }

    DrawSprite(ctx)
    {

    }

    Update( )
    {
        this.sprite.update();
    }



    beginContact( contact )
    {
        
    }

    endContact( contact )
    {
        
    }

    //create a 
    SetupPhysics(density: number, friction: number, restitution: number, width: number = 50, height: number = 50 )
    {
        var fixDef = new b2FixtureDef;

        fixDef.density = density;
        fixDef.friction = friction;
        fixDef.restitution = restitution;
        fixDef.shape = new b2PolygonShape();

        fixDef.shape.SetAsBox(width, height);

        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_kinematicBody;

        bodyDef.position.x = Physics.pixelToMeters(this._xInPxs);
        bodyDef.position.y = Physics.pixelToMeters(this._yInPxs);
        console.log(bodyDef.position);

        this.body = Physics.world.CreateBody(bodyDef).CreateFixture(fixDef).GetBody();
        //fixDef.isSensor = true;        

        this.body.SetUserData(this);
        return fixDef.shape;
    }
}