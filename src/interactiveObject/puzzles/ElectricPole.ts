///<reference path="BasePuzzle.ts"/>

class ElectricPole extends BasePuzzle {


    body;
    objectWidth: number = 0;
    objectHeight: number = 0;
    image;
    position;
    x: number;
    y: number;

    constructor(xInPixels: number, yInPixels: number)
    {
        super(null,xInPixels,yInPixels);
        this.objectWidth = 10;
        this.objectHeight = 200;
        this.setUpPhysics(xInPixels, yInPixels);
        this.body.SetUserData(this);
        this.image = AssetManager.getImage("objectmap");
        this.position = new b2Vec2(xInPixels, yInPixels);
        this.x = xInPixels;
        this.y = yInPixels;
    }


    Draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.drawImage(this.image, 150, 0, 220, 210, -(this.objectWidth/2)-12, -(this.objectHeight/2), 120, 200);
        ctx.restore();
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