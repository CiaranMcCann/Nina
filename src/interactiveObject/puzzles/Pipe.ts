///<reference path="BasePuzzle.ts"/>


class Pipe extends BasePuzzle
{

    public body;
    private objectWidth: number = 0;
    private objectHeight: number = 0;
    respawnPipe: Pipe;

    constructor(spawn: Pipe, xInPixels: number, yInPixels: number)
    {
  
        super(new Sprite(Sprites.animations.alexWalking), xInPixels, yInPixels);
        if (spawn != null) {
            this.respawnPipe = spawn;
        }

        this.objectWidth = 100;
        this.objectHeight = 40;
        this.setUpPhysics(xInPixels, yInPixels);
        this.body.SetUserData(this);
        

    }



    beginContact(contact) {
        if (contact.GetFixtureA().GetBody().GetUserData() instanceof Walter) {
            if(this.respawnPipe == null)return;
            var walter:Walter = contact.GetFixtureA().GetBody().GetUserData();
            if (!walter.Mayrespawn) {
                walter.respawnPosition = new b2Vec2(this.respawnPipe.body.GetPosition().x, this.respawnPipe.body.GetPosition().y-1);
                walter.Mayrespawn = true;
            }
        }
    }

    endContact(contact) {
       
    }

    setUpPhysics(xInPixels, yInPixels) {
        var fixDef = new b2FixtureDef;
        fixDef.density = 1.0;
        fixDef.friction = 1.0;
        fixDef.restitution = 0.1;
        
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