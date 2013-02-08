var Transformer = (function () {
    function Transformer(x, y, buttonBashing) {
        var _this = this;
        this.electrifiedAlex = new Sprite(Sprites.animations.alexElectrified);
        this.sprite = new Sprite(Sprites.animations.transformerAlex);
        this.setUpPhysics(x, y);
        this.body.SetUserData(this);
        this.mashedPotatoes = false;
        this.powerUp = 0;
        this.pump = new Pump(x + 1100, y + 300);
        this.buttonBashing = buttonBashing;
        this.buttonBashing.SetOnDone(function () {
            if(!_this.pump.isPumpOn()) {
                _this.pump.pumpState(true);
                GameInstance.camera.panToPosition(new b2Vec2(_this.pump.x, _this.pump.y));
                GameInstance.level.alex.setCanDraw(true);
                GameInstance.level.alex.setCanWalk(true);
            }
        });
    }
    Transformer.prototype.update = function () {
        this.buttonBashing.update(this.mashedPotatoes);
        if(this.mashedPotatoes) {
            this.electrifiedAlex.update();
        }
    };
    Transformer.prototype.SetCloud = function (value) {
        this._cloud = value;
    };
    Transformer.prototype.beginContact = function (contact) {
        var a = contact.GetFixtureA().GetBody().GetUserData();
        var b = contact.GetFixtureB().GetBody().GetUserData();
        if(a instanceof Alex || b instanceof Alex) {
            this.mashedPotatoes = true;
        }
    };
    Transformer.prototype.endContact = function (contact) {
        var a = contact.GetFixtureA().GetBody().GetUserData();
        var b = contact.GetFixtureB().GetBody().GetUserData();
        if(a instanceof Alex || b instanceof Alex) {
            this.mashedPotatoes = false;
            GameInstance.level.alex.setCanDraw(true);
        }
    };
    Transformer.prototype.draw = function (ctx) {
        this.sprite.update();
        var pos = Physics.vectorMetersToPixels(this.body.GetPosition());
        ctx.save();
        ctx.translate(pos.x, pos.y);
        this.sprite.draw(ctx, (-this.sprite.getFrameWidth() / 2), (-this.sprite.getFrameHeight() / 2));
        if(this.mashedPotatoes && this.buttonBashing.getPercentage() < 100) {
            GameInstance.level.alex.setCanDraw(false);
            this.electrifiedAlex.draw(ctx, -this.electrifiedAlex.getFrameWidth(), -this.electrifiedAlex.getFrameHeight() / 2);
        }
        ctx.restore();
        this.pump.draw(ctx);
        this.buttonBashing.draw(ctx);
    };
    Transformer.prototype.setUpPhysics = function (xInPixels, yInPixels) {
        var fixDef = new b2FixtureDef();
        fixDef.density = 1.0;
        fixDef.friction = 1.0;
        fixDef.restitution = 0.1;
        fixDef.shape = new b2PolygonShape();
        fixDef.shape.SetAsBox(Physics.pixelToMeters(this.sprite.getFrameWidth() / 2), Physics.pixelToMeters(this.sprite.getFrameHeight() / 2));
        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.x = Physics.pixelToMeters(xInPixels);
        bodyDef.position.y = Physics.pixelToMeters(yInPixels);
        this.body = Physics.world.CreateBody(bodyDef).CreateFixture(fixDef).GetBody();
        this.body.SetSleepingAllowed(false);
        this.body.SetFixedRotation(true);
    };
    return Transformer;
})();
