var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Ladder = (function (_super) {
    __extends(Ladder, _super);
    function Ladder(xInPixels, yInPixels) {
        _super.call(this, null, xInPixels, yInPixels);
        this.objectWidth = 0;
        this.objectHeight = 0;
        this.objectWidth = 100;
        this.objectHeight = 200;
        this.setUpPhysics(xInPixels, yInPixels);
        this.body.SetUserData(this);
    }
    Ladder.prototype.beginContact = function (contact) {
        if(contact.GetFixtureA().GetBody().GetUserData() instanceof Player) {
            var player = contact.GetFixtureA().GetBody().GetUserData();
            player.canClimb = true;
            player.canJump--;
        }
    };
    Ladder.prototype.endContact = function (contact) {
        if(contact.GetFixtureA().GetBody().GetUserData() instanceof Player) {
            console.log("OnLadder");
            var player = contact.GetFixtureA().GetBody().GetUserData();
            player.canClimb = false;
            player.canJump++;
        }
    };
    Ladder.prototype.setUpPhysics = function (xInPixels, yInPixels) {
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
    return Ladder;
})(BasePuzzle);
