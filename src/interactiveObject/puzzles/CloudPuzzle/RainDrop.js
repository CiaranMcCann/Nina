var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RainDrop = (function (_super) {
    __extends(RainDrop, _super);
    function RainDrop(pm, xInPxs, yInPxs) {
        _super.call(this, new Sprite(Sprites.animations.droplet), xInPxs, yInPxs);
        this.SetupPhysics(1.0, 1.0, 1.0, Physics.pixelToMeters(6), Physics.pixelToMeters(32.5), b2Body.b2_dynamicBody);
        this._puzzleManager = pm;
    }
    RainDrop.prototype.Update = function () {
        _super.prototype.Update.call(this);
        this.body.SetPosition(new b2Vec2(this.body.GetPosition().x - Physics.pixelToMeters(5), this.body.GetPosition().y + Physics.pixelToMeters(5)));
    };
    RainDrop.prototype.DrawSprite = function (ctx) {
        this.sprite.draw(ctx, -this.sprite.getFrameWidth() / 2, -this.sprite.getFrameHeight() / 2);
    };
    RainDrop.prototype.beginContact = function (contact) {
        var a = contact.GetFixtureA().GetBody().GetUserData();
        var b = contact.GetFixtureB().GetBody().GetUserData();
        var other = a instanceof RainDrop ? b : a;
        if(other instanceof RainDrop || other instanceof Cloud) {
            return;
        }
        this.isAlive = false;
    };
    return RainDrop;
})(BasePuzzle);
;
