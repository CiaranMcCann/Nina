///<reference path="system/Physics.ts"/>
///<reference path="Alex.ts"/>
///<reference path="Walter.ts"/>
///<reference path="animation/Sprite.ts"/>

class Coin implements isPhysicsBody
{
    static COIN_TYPE = {
        water: 0,
        electity: 1
    }

    coinType;

    // Animated sprite
    sprite: Sprite;

    amountOfEnergy: number;

    //Box2d Physics body
    private body;

    constructor(xInPixels: number, yInPixels: number, coinType)
    {
        this.setUpPhysics(xInPixels, yInPixels);
        this.amountOfEnergy = 20;
        this.coinType = coinType;

        if (this.coinType == Coin.COIN_TYPE.water)
        {
            this.sprite.setSpriteDef(Sprites.animations.waterCoin);
        } else
        {
            this.sprite.setSpriteDef(Sprites.animations.electricityCoin);
        }
    }

    beginContact(contact) 
    {
    
        var a = contact.GetFixtureA().GetBody().GetUserData();
        var b = contact.GetFixtureB().GetBody().GetUserData();


        if (this.coinType == Coin.COIN_TYPE.water)
        {
            if (a instanceof Walter)
            {
                a.setEnergy(a.getEnergy() + this.amountOfEnergy);
            }
            else if (b instanceof Walter)
            {
                b.setEnergy(a.getEnergy() + this.amountOfEnergy);
            }

        } else
        {
            if (a instanceof Alex)
            {
                a.setEnergy(a.getEnergy() + this.amountOfEnergy);

            }else if (b instanceof Alex)
            {
                b.setEnergy(a.getEnergy() + this.amountOfEnergy);
            }
        }

    };


    endContact(contact) { };

    setUpPhysics(xInPixels, yInPixels)
    {
        var fixDef = new b2FixtureDef;
        fixDef.density = 1.0;
        fixDef.friction = 1.0;
        fixDef.restitution = 0.1;
        fixDef.isSensor = true;
        fixDef.shape = new b2PolygonShape();

        fixDef.shape.SetAsBox(
            Physics.pixelToMeters(this.sprite.getFrameWidth() / 2),
            Physics.pixelToMeters(this.sprite.getFrameHeight() / 2)
        );

        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.x = Physics.pixelToMeters(xInPixels);
        bodyDef.position.y = Physics.pixelToMeters(yInPixels);

        this.body = Physics.world.CreateBody(bodyDef).CreateFixture(fixDef).GetBody();
   
    }


}