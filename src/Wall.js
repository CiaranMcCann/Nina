var Wall = (function () {
    function Wall(xInPixels, yInPixels) {
        this.objectWidth = 0;
        this.objectHeight = 0;
        this.objectWidth = 100;
        this.objectHeight = 200;
        this.x = xInPixels;
        this.y = yInPixels;
        this.setUpPhysics(xInPixels, yInPixels);
        this.image = AssetManager.getImage("wall");
        this.body.SetUserData(this);
        this.destroyed = false;
    }
    Wall.prototype.draw = function (ctx) {
        if(this.destroyed) {
            console.log("destroyed");
            Physics.world.DestroyBody(this.body);
        }
        if(this.destroyed) {
            return;
        }
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.drawImage(this.image, -(this.image.width / 2), -(this.image.height / 2));
        ctx.restore();
    };
    Wall.prototype.beginContact = function (contact) {
        var a = contact.GetFixtureA().GetBody().GetUserData();
        var b = contact.GetFixtureB().GetBody().GetUserData();
        if(a instanceof Walter) {
            var walter = contact.GetFixtureA().GetBody().GetUserData();
            if(!walter.mayJump) {
                this.destroyed = true;
            }
        } else if(b instanceof Walter) {
            var walter = contact.GetFixtureB().GetBody().GetUserData();
        }
    };
    Wall.prototype.endContact = function (contact) {
        if(contact.GetFixtureA().GetBody().GetUserData() instanceof Player) {
        }
    };
    Wall.prototype.setUpPhysics = function (xInPixels, yInPixels) {
        var fixDef = new b2FixtureDef();
        fixDef.density = 1.0;
        fixDef.friction = 1.0;
        fixDef.restitution = 0.1;
        fixDef.shape = new b2PolygonShape();
        fixDef.shape.SetAsBox(Physics.pixelToMeters(this.objectWidth / 2.5), Physics.pixelToMeters(this.objectHeight / 2));
        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.x = Physics.pixelToMeters(xInPixels);
        bodyDef.position.y = Physics.pixelToMeters(yInPixels);
        this.body = Physics.world.CreateBody(bodyDef).CreateFixture(fixDef).GetBody();
        this.body.SetSleepingAllowed(false);
        this.body.SetFixedRotation(true);
    };
    return Wall;
})();
