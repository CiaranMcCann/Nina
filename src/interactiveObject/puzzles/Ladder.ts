///<reference path="BasePuzzle.ts"/>


class Ladder extends BasePuzzle {


    private body;
    private objectWidth: number =0;
    private objectHeight: number = 0;

    ladderTopSensor: any;
 

    constructor(xInPixels: number, yInPixels: number)
    {
        super();
        this.objectWidth = 100;
        this.objectHeight = 200;
        this.setUpPhysics(xInPixels, yInPixels);
        this.body.SetUserData(this);
    }

    beginContact(contact)
    {
        if (contact.GetFixtureA().GetBody().GetUserData() instanceof Player)
        {
            var player: Player = contact.GetFixtureA().GetBody().GetUserData();
            player.canClimb = true;
            player.canJump--;
          
        }
    }

    endContact(contact)
    {
        if (contact.GetFixtureA().GetBody().GetUserData() instanceof Player) {
            console.log("OnLadder");
            var player: Player = contact.GetFixtureA().GetBody().GetUserData();
            player.canClimb = false;
            player.canJump++;
        }
    }

    setUpPhysics(xInPixels, yInPixels) {
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

}