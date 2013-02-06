///<reference path="animation/Sprite.ts"/>
///<reference path="Pump.ts"/>
///<reference path="ButtonBashing.ts"/>

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

    // so we can do the button bashing
    private buttonbashing: ButtonBashing;

    constructor(x: number, y: number, actualPump: Pump, buttonBasher: ButtonBashing)
    {
        this.sprite = new Sprite(Sprites.animations.transformerAlex);
        this.setUpPhysics(x, y);
        this.body.SetUserData(this)
        this.mashedPotatoes = false;
        this.powerUp = 0;

        this.pump = actualPump;
        console.log(this.pump);
        this.buttonbashing = buttonBasher;
        this.buttonbashing.SetOnDone(function () =>
        {
            console.log("Percentage should be 100 now");
            if (!this.pump.isPumpOn()) {
                this.pump.pumpState(true);
            }
        }
        );
    }


    update() {
        // if he's near the transformer and spamming the 'Power Up'-button.
        if (this.mashedPotatoes && this.powerUp < 100) { // && keyboard.isKeyDown(this.controls.use)
            this.powerUp += 0.5;
        }

        // if he's reaching a hundred, he's fully powered up the transformer.
        if (this.powerUp < 100 && !this.mashedPotatoes) {
            if (this.powerUp > 0) {
                this.powerUp--;
            }            
        }
        if (this.powerUp == 100 && !this.pump.isPumpOn()) {
           // this.pump.pumpState(true);
        }        
        this.buttonbashing.update(this.mashedPotatoes);
    }

    beginContact(contact) {
        var a = contact.GetFixtureA().GetBody().GetUserData();
        var b = contact.GetFixtureB().GetBody().GetUserData();

        // checking to see if Alex is near the transformer
        if (a instanceof Alex || b instanceof Alex) {
            this.mashedPotatoes = true;
        }
    }

    endContact(contact) {
        var a = contact.GetFixtureA().GetBody().GetUserData();
        var b = contact.GetFixtureB().GetBody().GetUserData();

        // checking to see if Alex is near the transformer
        if (a instanceof Alex || b instanceof Alex) {
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
        
        this.buttonbashing.draw(ctx);
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
        bodyDef.position.x = Physics.pixelToMeters(xInPixels + 1750);
        bodyDef.position.y = Physics.pixelToMeters(yInPixels + 650);

        this.body = Physics.world.CreateBody(bodyDef).CreateFixture(fixDef).GetBody();
        this.body.SetSleepingAllowed(false);
        this.body.SetFixedRotation(true);
    }
}