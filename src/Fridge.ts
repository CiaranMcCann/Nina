///<reference path="Pump.ts"/>

class Fridge extends Pump {

    public body;
    private objectWidth: number = 0;
    private objectHeight: number = 0;

    constructor(x, y) {
        super(x, y);
        this.objectWidth = 100;
        this.objectHeight = 200;
        this.setUpPhysics(x, y);
        this.body.SetUserData(this);
        this.image = AssetManager.getImage("fridge");
    }

    draw(ctx: CanvasRenderingContext2D) {

        if (this.isPumpOn()) {

         
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.drawImage(this.image, -(this.image.width / 2), -(this.image.height / 2));
            ctx.restore();
        }
        else {
            // freeze the image
            ctx.drawImage(this.image, -(this.image.width / 2) + this.x, -(this.image.height / 2) + this.y);
            //console.log("Drawing still image because the bool is " + this.runPump);
        }

    }


    public beginContact(contact) {
        var a = contact.GetFixtureA().GetBody().GetUserData();
        var b = contact.GetFixtureB().GetBody().GetUserData();

        if (this.isPumpOn()) {
            // checking to see if Alex is near the transformer
            if (a instanceof Walter) {
                var walter: Walter = contact.GetFixtureA().GetBody().GetUserData();
                walter.transform();
            } else if (b instanceof Walter) {
                var walter: Walter = contact.GetFixtureB().GetBody().GetUserData();
            }
        }
    }

    public endContact(contact) {
        
    }

    setUpPhysics(xInPixels, yInPixels) {
        var fixDef = new b2FixtureDef;
        fixDef.density = 1.0;
        fixDef.friction = 1.0;
        fixDef.restitution = 0.1;
        fixDef.isSensor = true;
        fixDef.shape = new b2PolygonShape();

        fixDef.shape.SetAsBox(
            Physics.pixelToMeters(this.objectWidth / 2.5),
            Physics.pixelToMeters(this.objectHeight / 2)
        );

        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.x = Physics.pixelToMeters(xInPixels);
        bodyDef.position.y = Physics.pixelToMeters(yInPixels);

        this.body = Physics.world.CreateBody(bodyDef).CreateFixture(fixDef).GetBody();
        this.body.SetSleepingAllowed(false);
        this.body.SetFixedRotation(true);
    }

  
}