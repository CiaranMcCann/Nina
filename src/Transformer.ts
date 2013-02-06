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
    public pump: Pump;

    constructor(x: number, y: number) {
        this.sprite = new Sprite(Sprites.animations.transformerAlex);
        this.setUpPhysics(x, y);
        this.body.SetUserData(this)
        this.mashedPotatoes = false;
        this.powerUp = 0;

        this.pump = new Pump(x+1070,y+300);
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
        if (this.powerUp == 100 && !this.pump.isPumpOn()) {
            console.log("This should be false - " + this.pump.isPumpOn());
            this.pump.pumpState(true);
            GameInstance.camera.panToPosition(new b2Vec2(this.pump.x,this.pump.y));
            console.log("so it is changed to " + this.pump.isPumpOn());
            console.log("something");
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
        var a = contact.GetFixtureA().GetBody().GetUserData();
        var b = contact.GetFixtureB().GetBody().GetUserData();

        // checking to see if Alex is near the transformer
        if (a instanceof Alex || b instanceof Alex) {
            console.log("Contact ended.");
            this.mashedPotatoes = false;
        }
    };

    draw(ctx: CanvasRenderingContext2D) {
        this.sprite.update();
        var pos = Physics.vectorMetersToPixels(this.body.GetPosition());
        ctx.save();
        ctx.translate(pos.x, pos.y)
        this.sprite.draw(ctx, (-this.sprite.getFrameWidth() / 2), (-this.sprite.getFrameHeight() / 2));
        ctx.restore();

        this.pump.draw(ctx);
    }

    setUpPhysics(xInPixels, yInPixels) {
        var fixDef = new b2FixtureDef;
        fixDef.density = 1.0;
        fixDef.friction = 1.0;
        fixDef.restitution = 0.1;
        fixDef.shape = new b2PolygonShape();

        fixDef.shape.SetAsBox(
            Physics.pixelToMeters(this.sprite.getFrameWidth() / 2),
            Physics.pixelToMeters(this.sprite.getFrameHeight() / 2)
        );

        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.x = Physics.pixelToMeters( xInPixels );
        bodyDef.position.y = Physics.pixelToMeters(yInPixels);

        this.body = Physics.world.CreateBody(bodyDef).CreateFixture(fixDef).GetBody();
        this.body.SetSleepingAllowed(false);
        this.body.SetFixedRotation(true);
    }
}