///<reference path="BasePuzzle.ts"/>


class Pipe extends BasePuzzle
{

    public body;
    private objectWidth: number = 0;
    private objectHeight: number = 0;
    respawnPipe: Pipe;
    private image;
    private imageExtension;
    private rotated:bool;

    constructor(spawn: Pipe, xInPixels: number, yInPixels: number,rotated:bool)
    {
        super(null, xInPixels, yInPixels);
    
        this.rotated = rotated;
        this.image = AssetManager.getImage("Pipe2");
        this.imageExtension = AssetManager.getImage("extension");
        if (spawn != null) {
            this.respawnPipe = spawn;
        }

        this.objectWidth = 148;
        this.objectHeight = 38;
        this.setUpPhysics(xInPixels, yInPixels);
        this.body.SetUserData(this);
       
    }


    Draw(ctx: CanvasRenderingContext2D) {
        var position = Physics.vectorMetersToPixels(this.body.GetPosition());
        ctx.save();

        ctx.drawImage(this.image,0,0,120,100, position.x-(this.image.width / 2), position.y+20,120,100);
       
         var distance = 0;
         for (var i: number = 1; i < 4; i++) {
             distance = 100 * i;
             ctx.drawImage(this.imageExtension, position.x - (this.image.width / 2)+21, position.y + 18+distance);
         }

         if (this.rotated) {
             ctx.translate(position.x - (this.image.width / 2)+127, position.y + 20 + 40 + distance);
             ctx.scale(-1, 1);
            
         } else {
             ctx.translate(position.x - (this.image.width / 2), position.y + 20 + 40 + distance);
         }
         ctx.drawImage(this.image, 0, 40, 120, 313 - 40, 0, 0, 120, 313 - 40);

         ctx.rotate(Utilies.toRadians(90));
         var distance2 = 0;
         for (var i: number = 0; i < 6; i++) {
             distance2 = 100 * i;
             ctx.drawImage(this.imageExtension, 190, distance2-2);
         }
         
         ctx.restore();
    }


    beginContact(contact) {
        if (contact.GetFixtureA().GetBody().GetUserData() instanceof Walter) {
            if(this.respawnPipe == null)return;
            var walter:Walter = contact.GetFixtureA().GetBody().GetUserData();
            if (!walter.Mayrespawn) {
                walter.respawn();
                walter.respawnPosition = new b2Vec2(this.respawnPipe.body.GetPosition().x, this.respawnPipe.body.GetPosition().y-1);
                
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