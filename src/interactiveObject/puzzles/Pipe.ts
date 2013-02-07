///<reference path="BasePuzzle.ts"/>


class Pipe extends BasePuzzle
{

    public body;
    private objectWidth: number = 0;
    private objectHeight: number = 0;
    private spawnLocationX;
    private spawnLocation;
    private image;
    private imageExtension;
    private cornerImage;
    private rotated: bool;
    private pipeLenght: number;
    private pipeWidth: number;
    public timer;
    private x;
    private y;
    water: waterParticle;
    waterArray: waterParticle[];
    private canRespawn: bool;
    private walter: Walter;

    constructor(xInPixels: number, yInPixels: number)
    {
        super(null, xInPixels, yInPixels);
    
       this.image = AssetManager.getImage("Pipe1");
       this.imageExtension = AssetManager.getImage("Pipe3");
       this.cornerImage = AssetManager.getImage("Pipe4");

        this.objectWidth = 148;
        this.objectHeight = 38;
        this.setUpPhysics(xInPixels, yInPixels);
        this.body.SetUserData(this);
        this.pipeLenght = 6;
        this.pipeWidth = 10;
        this.timer = new Date().getTime();
        this.x = xInPixels;
        this.y = yInPixels;
        this.waterArray = [];

        this.canRespawn = false;
    }

    EmitParticle() {

       this.water = new waterParticle(this.x, this.y+50,this.pipeLenght,this.pipeWidth);
       this.waterArray.push(this.water);
        
    }


    Draw(ctx: CanvasRenderingContext2D) {

        var position = Physics.vectorMetersToPixels(this.body.GetPosition());
        ctx.save();

        ctx.translate(position.x,position.y);
        ctx.drawImage(this.image,-(this.image.width / 2), (this.image.height / 2)-45);
        

        var distanceY = 0;
        for (var i: number = 1; i < this.pipeLenght+1; i++) {
            distanceY = (this.image.height-5) * i;
            ctx.drawImage(this.imageExtension, -(this.imageExtension.width / 2), (this.imageExtension.height / 2) - 45+distanceY);
        }

        distanceY += (this.image.height-5);
        ctx.drawImage(this.cornerImage, -(this.cornerImage.width / 2)-11, (this.cornerImage.height / 2) - 45 + distanceY);



        ctx.rotate(Utilies.toRadians(90));

        var distanceX = 0;
        for (var l: number = 1; l < this.pipeWidth + 1; l++) {
            distanceX = (this.imageExtension.height-4) * l;
            ctx.drawImage(this.imageExtension, (this.imageExtension.height / 2) - 43 + distanceY , -(this.imageExtension.width / 2) + distanceX -10);
            
        }

       this.spawnLocationX = distanceX += (this.imageExtension.height - 4);
        ctx.drawImage(this.cornerImage, (this.cornerImage.height / 2) - 55 + distanceY, -(this.cornerImage.width / 2) + distanceX + 1);


        ctx.rotate(Utilies.toRadians(-90));

        distanceY -= (this.image.height - 5)+33;

        for (var i: number = 1; i < this.pipeLenght + 1; i++) {
          
            ctx.drawImage(this.imageExtension, -(this.imageExtension.width / 2)-distanceX-2, (this.imageExtension.height / 2) - 45 + distanceY);
            distanceY -= (this.image.height - 5);
        }
        ctx.drawImage(this.image, -(this.image.width / 2)-distanceX-2, (this.image.height / 2) - 45);
        var pixelVector = new b2Vec2( distanceX ,distanceY);
     
        this.spawnLocation = new b2Vec2(this.body.GetPosition().x - Physics.pixelToMeters(this.spawnLocationX), this.body.GetPosition().y);

        ctx.restore();

        
        if (GameInstance.level.transformer.pump.isPumpOn()) {
            var _time = new Date().getTime();
            if (_time - this.timer > 500) {
                this.timer = _time;
                this.EmitParticle();
            }
        }
        

        for (var i: number = 0; i < this.waterArray.length; i++) {
            
                this.waterArray[i].Draw(ctx);
            
           
            if (this.waterArray[i].destroyed) {
                this.waterArray.splice(i, 1);
            }
        }

       

       

        if(this.walter == null)return;


        if (this.canRespawn) {
            if (GameInstance.level.transformer.pump.isPumpOn()) {
                this.walter.respawn();
                this.canRespawn = false;
               
            }
        }

    }


    beginContact(contact) {

        if (contact.GetFixtureA().GetBody().GetUserData() instanceof Walter) {
            this.canRespawn = true;
            this.walter = contact.GetFixtureA().GetBody().GetUserData();
            this.walter.respawnPosition = this.spawnLocation;

        }
        
    }

    endContact(contact) {
        if (contact.GetFixtureA().GetBody().GetUserData() instanceof Walter) {
            this.canRespawn = false;
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


class waterParticle {

    private position;
    private image;
    private travelIndex: number = 0;
    public destroyed: bool;
    private pipeLenght;
    private pipeWidth;
    private destination;
    private destination2;
    private destination3;


    constructor(xInPixels: number, yInPixels: number,pipeLenght:number,pipeWidth:number) {
        this.image = AssetManager.getImage("waterParticle");
        this.position = new b2Vec2(xInPixels, yInPixels);
        this.destroyed = false;
        this.pipeLenght = pipeLenght;
        this.pipeWidth = pipeWidth;
        this.destination = this.position.y + (114 * (pipeLenght+1))-(10*pipeLenght);
        this.destination2 = this.position.x - 1200; 
        this.destination3 = this.position.y + 50;
        
    }

    Draw(ctx: CanvasRenderingContext2D) {

        if (this.travelIndex == 0) {
            this.position.y+=10;
            if (this.position.y > this.destination)  this.travelIndex = 1;
        }
        if (this.travelIndex == 1) {
            this.position.x -= 10;
            if (this.position.x < this.destination2) this.travelIndex = 2;
        }
        if (this.travelIndex == 2) {
            this.position.y -= 10;
            if (this.position.y < this.destination3) this.destroyed = true;
        }


        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.drawImage(this.image, -(this.image.width / 2), (this.image.height / 2) - 45);
        ctx.restore();
    }

}