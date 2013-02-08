;
var BasePuzzle = (function () {
    function BasePuzzle(sprite, xInpxs, yInPxs) {
        this.isAlive = true;
        this.sprite = sprite;
        this._xInPxs = xInpxs;
        this._yInPxs = yInPxs;
    }
    BasePuzzle.prototype.Draw = function (ctx) {
        if(Sprite === null) {
            return;
        }
        var pos = Physics.vectorMetersToPixels(this.body.GetPosition());
        ctx.save();
        ctx.translate(pos.x, pos.y);
        this.DrawSprite(ctx);
        ctx.restore();
    };
    BasePuzzle.prototype.DrawSprite = function (ctx) {
    };
    BasePuzzle.prototype.Update = function () {
        if(this.sprite != null) {
            this.sprite.update();
        }
    };
    BasePuzzle.prototype.beginContact = function (contact) {
    };
    BasePuzzle.prototype.endContact = function (contact) {
    };
    BasePuzzle.prototype.SetupPhysics = function (density, friction, restitution, width, height, type) {
        if (typeof width === "undefined") { width = 50; }
        if (typeof height === "undefined") { height = 50; }
        if (typeof type === "undefined") { type = b2Body.b2_kinematicBody; }
        var fixDef = new b2FixtureDef();
        fixDef.density = density;
        fixDef.friction = friction;
        fixDef.restitution = restitution;
        fixDef.shape = new b2PolygonShape();
        fixDef.shape.SetAsBox(width, height);
        var bodyDef = new b2BodyDef();
        bodyDef.type = type;
        bodyDef.position.x = Physics.pixelToMeters(this._xInPxs);
        bodyDef.position.y = Physics.pixelToMeters(this._yInPxs);
        console.log(bodyDef.position);
        this.body = Physics.world.CreateBody(bodyDef).CreateFixture(fixDef).GetBody();
        this.body.SetUserData(this);
        return fixDef.shape;
    };
    return BasePuzzle;
})();
