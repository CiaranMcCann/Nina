var Sauna = (function () {
    function Sauna(xInPixels, yInPixels) {
        this.objectWidth = 0;
        this.objectHeight = 0;
        this.objectWidth = 100;
        this.objectHeight = 100;
        this.x = xInPixels;
        this.y = yInPixels;
        this.setUpPhysics(xInPixels, yInPixels);
        this.image = AssetManager.getImage("fridge");
        this.body.SetUserData(this);
        this.sprite = new Sprite(Sprites.animations.saunaAnimation);
    }
    Sauna.prototype.draw = function (ctx) {
        this.sprite.update();
        ctx.save();
        ctx.translate(this.x, this.y);
        this.sprite.draw(ctx, -this.sprite.getFrameWidth() / 2, -this.sprite.getFrameHeight() / 2);
        ctx.restore();
    };
    Sauna.prototype.beginContact = function (contact) {
        var a = contact.GetFixtureA().GetBody().GetUserData();
        var b = contact.GetFixtureB().GetBody().GetUserData();
        if(a instanceof Walter) {
            var walter = contact.GetFixtureA().GetBody().GetUserData();
            walter.transformReturn();
        } else if(b instanceof Walter) {
            var walter = contact.GetFixtureB().GetBody().GetUserData();
        }
    };
    Sauna.prototype.endContact = function (contact) {
        if(contact.GetFixtureA().GetBody().GetUserData() instanceof Player) {
            console.log("OnLadder");
        }
    };
    Sauna.prototype.setUpPhysics = function (xInPixels, yInPixels) {
        var fixDef = new b2FixtureDef();
        fixDef.density = 1.0;
        fixDef.friction = 1.0;
        fixDef.restitution = 0.1;
        fixDef.isSensor = true;
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
    return Sauna;
})();
