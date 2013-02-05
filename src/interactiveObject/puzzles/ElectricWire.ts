///<reference path="BasePuzzle.ts"/>
///<reference path="EletricPole.ts/>
///<reference path="../../system/Physics.ts"/>


class ElectricWire extends BasePuzzle {

    pole: ElectricPole;
    pole2: ElectricPole;
    ropeJoints;
    ropeNots;
    anchor;
    anchor2;
    lastRopeDef;
    private body;
    private objectWidth: number = 0;
    private objectHeight: number = 0;

    constructor(pole:ElectricPole,pole2:ElectricPole)
    {
        super(null, 0, 0);
        this.ropeJoints = [];
        this.ropeNots = [];
        
        var fixDef = new b2FixtureDef();
        fixDef.density = 0.5;
        fixDef.friction = 1.0;
        fixDef.restitution = 0.0;
        fixDef.shape = new b2PolygonShape();
        fixDef.shape.SetAsBox(0.2, 0.2);

        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.x = pole.body.GetPosition().x;
        bodyDef.position.y = pole.body.GetPosition().y-3;

        var bodyDef2 = new b2BodyDef();
        bodyDef2.type = b2Body.b2_staticBody;
        bodyDef2.position.x = pole2.body.GetPosition().x;
        bodyDef2.position.y = pole2.body.GetPosition().y-3;

        this.anchor = Physics.world.CreateBody(bodyDef).CreateFixture(fixDef).GetBody();
        this.anchor2 = Physics.world.CreateBody(bodyDef2).CreateFixture(fixDef).GetBody();

        this.ropeNots.push(this.anchor);

        fixDef.shape = new b2CircleShape(0.3);
        var ropeDef = new b2DistanceJointDef();
        ropeDef.frequencyHz = 10.0;
        ropeDef.dampingRatio = 0.0;
        var prevBody = this.anchor;

        var direction = this.anchor.GetPosition().Copy();
        var Pos = this.anchor2.GetPosition().Copy();
        Pos.Subtract(direction);
        
        var distance = 5;
        
        if (Pos.Length() > distance) {
            distance = Math.floor(Pos.Length() / 0.5);
        }

        Pos.Normalize();
        direction = Pos;

        for (var i = 1; i < distance; ++i) {
            var bd = new b2BodyDef();
            bd.type = b2Body.b2_dynamicBody;
            var pos = this.anchor.GetPosition().Copy();
            var dScaled = direction.Copy();
            dScaled.Multiply(0.5 * i);
            pos.Add(dScaled);
            bd.position.SetV(pos);
            var nextBody;
            if (i == distance - 1) {
                ropeDef.frequencyHz = 25.0;
                // ropeDef.dampingRatio = 2.0;
                nextBody = this.anchor2;
            } else {
                nextBody = Physics.world.CreateBody(bd);
                nextBody.CreateFixture(fixDef);
                nextBody.SetFixedRotation(true);
                this.lastRopeDef = ropeDef;
                this.ropeNots.push(nextBody);
            }
            ropeDef.bodyA = prevBody;
            ropeDef.bodyB = nextBody;
            var joint = Physics.world.CreateJoint(ropeDef);
            this.ropeJoints.push(joint);
            joint.SetLength(0.02);
            prevBody = nextBody;
        }

        this.objectWidth = Physics.metersToPixels(Math.abs(pole.body.GetPosition().x - pole2.body.GetPosition().x)+1);
        this.objectHeight = 50;

        this.SetUpPhysics(this.objectWidth,this.objectHeight);
        this.body.SetUserData(this);

        var newPosition = new b2Vec2(pole2.body.GetPosition().x+5,pole2.body.GetPosition().y-3);
        this.body.SetPosition(newPosition);
    }


    SetUpPhysics(xInPixels, yInPixels) {
        var fixDef = new b2FixtureDef;
        fixDef.density = 1.0;
        fixDef.friction = 1.0;
        fixDef.restitution = 0.1;
        fixDef.isSensor = true;
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

    beginContact(contact)
    {
      
        if (contact.GetFixtureA().GetBody().GetUserData() instanceof Walter) {
          
            var player:Walter = contact.GetFixtureA().GetBody().GetUserData();
            var currentPos = contact.GetFixtureA().GetBody().GetPosition();
            var direction = currentPos.x - this.body.GetPosition().x;

           
            var forces = new b2Vec2(direction, -5);
            forces.normal;
            forces.Multiply(10);

            contact.GetFixtureA().GetBody().ApplyImpulse(forces, currentPos);
           
            
        }

    }

    endContact(contact)
    {
        
    }

 

}