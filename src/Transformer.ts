///<reference path="animation/Sprite.ts"/>

class Transformer {
    // This is the transformer on stage #1 that powers up the pump
    // only applicable by Alex

    // animated image (CURRENTLY NOT USED)
    private sprite: Sprite;

    // displays the % of the powering of the transformer
    private powerUp: number;

    // keyboard controls
    controls: any;

    // physics body
    private body;

    // is alex and the transformer in contact with each other?
    private mashedPotatoes: bool;

    // So we can turn the pump on or off
    private pump: Pump;

    constructor(x : number, y : number) {
        this.setUpPhysics(x, y);
        this.body.SetUserData(this)
        this.mashedPotatoes = false;
        this.powerUp = 0;

        this.pump = new Pump();
    }

    update() {
        // if he's near the transformer and spamming the 'Power Up'-button.
        if (this.mashedPotatoes && this.powerUp < 100) { // && keyboard.isKeyDown(this.controls.use)
            this.powerUp += 0.5;
            console.log(this.powerUp);
        }

        // if he's reaching a hundred, he's fully powered up the transformer.
        if (this.powerUp < 100 && !this.mashedPotatoes) {
            if (this.powerUp > 0) {
                this.powerUp--;
                console.log(this.powerUp);
            }            
        }
        if (this.powerUp == 100) {
            this.pump.pumpState(true);
            console.log("This just happened");
        }
    }

    beginContact(contact) {
        var a = contact.GetFixtureA().GetBody().GetUserData();
        var b = contact.GetFixtureB().GetBody().GetUserData();

        // checking to see if Alex is near the transformer
        if (a instanceof Alex || b instanceof Alex) {
            console.log("Contact.");
            this.mashedPotatoes = true;
        }
    }

    endContact(contact) {
        console.log("Contact ended.");
        this.mashedPotatoes = false;
    };

    draw(ctx: CanvasRenderingContext2D) {
        //Get position of the physics body and convert it to pixel cordinates
        var pos = Physics.vectorMetersToPixels(this.body.GetPosition());
        var image = AssetManager.getImage("PLACEHOLDERtransformer");
        ctx.drawImage(image, pos.x - (image.width / 2), pos.y - (image.height / 2));
    }

    setUpPhysics(xInPixels, yInPixels) {
        var fixDef = new b2FixtureDef;
        fixDef.density = 1.0;
        fixDef.friction = 1.0;
        fixDef.restitution = 0.1;
        fixDef.shape = new b2PolygonShape();

        fixDef.shape.SetAsBox(
            Physics.pixelToMeters(96 / 2.5),
            Physics.pixelToMeters(96 / 2)
        );

        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.x = Physics.pixelToMeters(xInPixels);
        bodyDef.position.y = Physics.pixelToMeters(yInPixels);

        this.body = Physics.world.CreateBody(bodyDef).CreateFixture(fixDef).GetBody();
        this.body.SetSleepingAllowed(false);
        this.body.SetFixedRotation(true);
    }
}