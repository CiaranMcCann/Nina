var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var InteractiveFire = (function (_super) {
    __extends(InteractiveFire, _super);
    function InteractiveFire(pm, xInPixels, yInPixels) {
        _super.call(this, new Sprite(Sprites.animations.fireAnim), xInPixels, yInPixels);
        var width = Physics.pixelToMeters(150);
        var height = Physics.pixelToMeters(10);
        _super.prototype.SetupPhysics.call(this, 0.0, 1.0, 0.0, width, height);
        this._puzzleManager = pm;
    }
    InteractiveFire.isCloudCreated = false;
    InteractiveFire.hasWalterCollision = false;
    InteractiveFire.prototype.beginContact = function (contact) {
        var a = contact.GetFixtureA().GetBody().GetUserData();
        var b = contact.GetFixtureB().GetBody().GetUserData();
        var other = a instanceof InteractiveFire ? b : a;
        if(!(other instanceof Walter) || InteractiveFire.hasWalterCollision) {
            return;
        }
        InteractiveFire.isCloudCreated = InteractiveFire.hasWalterCollision = true;
    };
    InteractiveFire.prototype.DrawSprite = function (ctx) {
        this.sprite.draw(ctx, -this.sprite.getFrameWidth() / 2, -this.sprite.getFrameHeight() / 0.935);
    };
    InteractiveFire.prototype.Update = function () {
        if(InteractiveFire.isCloudCreated) {
            InteractiveFire.isCloudCreated = false;
            this._puzzleManager.CreatePuzzle(new Cloud(this._puzzleManager));
        }
        _super.prototype.Update.call(this);
    };
    return InteractiveFire;
})(BasePuzzle);
