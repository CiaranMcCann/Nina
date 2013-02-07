///<reference path="animation/Sprite.ts"/>
///<reference path="Pump.ts"/>
///<reference path="ButtonBashing.ts"/>


class Wall {

    private body;
    private objectWidth: number = 0;
    private objectHeight: number = 0;
    image;
    x;
    y;
    private destroyed: bool;

    constructor(xInPixels: number, yInPixels: number) {

        this.objectWidth = 100;
        this.objectHeight = 200;
        this.x = xInPixels;
        this.y = yInPixels;
        this.setUpPhysics(xInPixels, yInPixels);
        this.image = AssetManager.getImage("wall");
        this.body.SetUserData(this);
        this.destroyed = false;

    }


    draw(ctx: CanvasRenderingContext2D) {
      
        if (this.destroyed) {
            console.log("destroyed");
            Physics.world.DestroyBody(this.body);
        }

        if(this.destroyed)return;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.drawImage(this.image, -(this.image.width / 2), -(this.image.height / 2));
        ctx.restore();
    }

    beginContact(contact) {

        var a = contact.GetFixtureA().GetBody().GetUserData();
        var b = contact.GetFixtureB().GetBody().GetUserData();

        if (a instanceof Walter) {
            var walter: Walter = contact.GetFixtureA().GetBody().GetUserData();
            if (!walter.mayJump) {
                this.destroyed = true;
            }
            
        } else if (b instanceof Walter) {
            var walter: Walter = contact.GetFixtureB().GetBody().GetUserData();
        }



    }

    endContact(contact) {
        if (contact.GetFixtureA().GetBody().GetUserData() instanceof Player) {
    
        }
    }

    setUpPhysics(xInPixels, yInPixels) {
        var fixDef = new b2FixtureDef;
        fixDef.density = 1.0;
        fixDef.friction = 1.0;
        fixDef.restitution = 0.1;
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