var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ElectricWire = (function (_super) {
    __extends(ElectricWire, _super);
    function ElectricWire(pole, pole2) {
        _super.call(this, null, 0, 0);
        this.objectWidth = 0;
        this.objectHeight = 0;
        this.ropeJoints = [];
        this.ropeNots = [];
        this.pole = pole;
        this.pole2 = pole2;
        var fixDef = new b2FixtureDef();
        fixDef.density = 15.0;
        fixDef.friction = 1.0;
        fixDef.restitution = 0.0;
        fixDef.shape = new b2PolygonShape();
        fixDef.shape.SetAsBox(0.2, 0.2);
        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.x = pole.body.GetPosition().x;
        bodyDef.position.y = pole.body.GetPosition().y - 3;
        var bodyDef2 = new b2BodyDef();
        bodyDef2.type = b2Body.b2_staticBody;
        bodyDef2.position.x = pole2.body.GetPosition().x;
        bodyDef2.position.y = pole2.body.GetPosition().y - 3;
        this.anchor = Physics.world.CreateBody(bodyDef).CreateFixture(fixDef).GetBody();
        this.anchor2 = Physics.world.CreateBody(bodyDef2).CreateFixture(fixDef).GetBody();
        this.ropeNots.push(this.anchor);
        fixDef.shape = new b2CircleShape(0.3);
        var ropeDef = new b2DistanceJointDef();
        ropeDef.frequencyHz = 10.0;
        ropeDef.dampingRatio = 60.0;
        var prevBody = this.anchor;
        var direction = this.anchor.GetPosition().Copy();
        var Pos = this.anchor2.GetPosition().Copy();
        Pos.Subtract(direction);
        var distance = 2;
        if(Pos.Length() > distance) {
            distance = Math.floor(Pos.Length() / 1.2);
        }
        Pos.Normalize();
        direction = Pos;
        for(var i = 1; i < distance; ++i) {
            var bd = new b2BodyDef();
            bd.type = b2Body.b2_dynamicBody;
            var pos = this.anchor.GetPosition().Copy();
            var dScaled = direction.Copy();
            dScaled.Multiply(i * 0.7);
            pos.Add(dScaled);
            bd.position.SetV(pos);
            var nextBody;
            if(i == distance - 1) {
                nextBody = this.anchor2;
            } else {
                nextBody = Physics.world.CreateBody(bd);
                nextBody.CreateFixture(fixDef);
                nextBody.SetUserData(this);
                nextBody.SetFixedRotation(true);
                this.lastRopeDef = ropeDef;
                this.ropeNots.push(nextBody);
            }
            ropeDef.bodyA = prevBody;
            ropeDef.bodyB = nextBody;
            var joint = Physics.world.CreateJoint(ropeDef);
            this.ropeJoints.push(joint);
            joint.SetLength(0.0001);
            prevBody = nextBody;
        }
        this.objectWidth = Physics.metersToPixels(Math.abs(pole.body.GetPosition().x - pole2.body.GetPosition().x) + 1);
        this.objectHeight = 50;
        var newPosition = new b2Vec2(pole2.body.GetPosition().x + 5, pole2.body.GetPosition().y - 3);
    }
    ElectricWire.prototype.SetUpPhysics = function (xInPixels, yInPixels) {
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
    ElectricWire.prototype.Draw = function (ctx) {
        var context = ctx;
        context.strokeStyle = "rgb(0, 0, 0)";
        context.lineWidth = 4;
        var count = 0;
        for(var i = 0; i < this.ropeNots.length - 1; i += 1) {
            var p1 = Physics.vectorMetersToPixels(this.ropeNots[i].GetPosition());
            var p2 = Physics.vectorMetersToPixels(this.ropeNots[i + 1].GetPosition());
            context.beginPath();
            context.moveTo(p1.x, p1.y);
            context.lineTo(p2.x, p2.y);
            context.closePath();
            context.stroke();
            if(GameInstance.level.transformer.mashedPotatoes) {
                if(count % 2) {
                    context.save();
                    context.translate(p1.x, p1.y);
                    context.scale(0.3, 0.3);
                    var image = AssetManager.getImage('Ligthning_for_wire_03');
                    context.drawImage(image, 0, -image.height / 2);
                    context.restore();
                }
                count++;
            }
        }
        context.fillStyle = "black";
        var x = 3962;
        context.fillRect(x, 1821, 4, 120);
        context.fillRect(x, 1940, 45, 4);
        if(GameInstance.level.transformer.mashedPotatoes) {
            context.save();
            context.translate(x, 1940);
            context.scale(0.3, 0.3);
            var image = AssetManager.getImage('Ligthning_for_wire_03');
            context.drawImage(image, 0, -image.height / 2);
            context.drawImage(AssetManager.getImage('Ligthning_for_wire_01'), -50, -400);
            context.restore();
        }
        var p1 = Physics.vectorMetersToPixels(this.ropeNots[this.ropeNots.length - 1].GetPosition());
        var p2 = Physics.vectorMetersToPixels(this.pole2.body.GetPosition());
        p2.y -= 90;
        p2.x += 20;
        context.beginPath();
        context.moveTo(p1.x, p1.y);
        context.lineTo(p2.x, p2.y);
        context.closePath();
        context.stroke();
    };
    ElectricWire.prototype.beginContact = function (contact) {
        var a = contact.GetFixtureA().GetBody().GetUserData();
        var b = contact.GetFixtureB().GetBody().GetUserData();
        if(a instanceof Walter) {
            a.body.ApplyImpulse(new b2Vec2(150, -150), a.body.GetWorldCenter());
        }
        if(b instanceof Walter) {
            b.body.ApplyImpulse(new b2Vec2(150, -150), b.body.GetWorldCenter());
        }
    };
    ElectricWire.prototype.endContact = function (contact) {
    };
    return ElectricWire;
})(BasePuzzle);
