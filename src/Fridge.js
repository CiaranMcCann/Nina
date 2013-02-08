var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fridge = (function (_super) {
    __extends(Fridge, _super);
    function Fridge(x, y) {
        _super.call(this, x, y);
        this.objectWidth = 0;
        this.objectHeight = 0;
        this.objectWidth = 120;
        this.objectHeight = 100;
        this.setUpPhysics(x, this.y);
        this.body.SetUserData(this);
        this.image = AssetManager.getImage("fridge");
        this.sprite = new Sprite(Sprites.animations.fridgeAnimatoin);
    }
    Fridge.prototype.update = function () {
    };
    Fridge.prototype.draw = function (ctx) {
        this.sprite.update();
        if(this.isPumpOn()) {
            ctx.save();
            ctx.translate(this.x, this.y);
            this.sprite.draw(ctx, -this.sprite.getFrameWidth() / 2, -this.sprite.getFrameHeight() / 2);
            ctx.restore();
        } else {
            ctx.drawImage(this.image, -(this.image.width / 2) + this.x, -(this.image.height / 2) + this.y);
        }
    };
    Fridge.prototype.beginContact = function (contact) {
        var a = contact.GetFixtureA().GetBody().GetUserData();
        var b = contact.GetFixtureB().GetBody().GetUserData();
        if(this.isPumpOn()) {
            if(a instanceof Walter) {
                var walter = contact.GetFixtureA().GetBody().GetUserData();
                walter.transform();
            } else if(b instanceof Walter) {
                var walter = contact.GetFixtureB().GetBody().GetUserData();
            }
        }
    };
    Fridge.prototype.endContact = function (contact) {
    };
    Fridge.prototype.setUpPhysics = function (xInPixels, yInPixels) {
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
    return Fridge;
})(Pump);
