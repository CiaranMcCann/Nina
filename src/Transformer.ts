///<reference path="animation/Sprite.ts"/>
///<reference path="Pump.ts"/>
///<reference path="ButtonBashing.ts"/>

class Transformer {
    // This is the transformer on stage #1 that powers up the pump
    // only applicable by Alex

    // animated image (CURRENTLY NOT USED)
    private sprite: Sprite;

    //animated image of alex zzzzzzz
    electrifiedAlex: Sprite;

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

    private buttonBashing: ButtonBashing;

    constructor(x: number, y: number, buttonBashing: ButtonBashing) {
        this.electrifiedAlex = new Sprite(Sprites.animations.alexElectrified);
        this.sprite = new Sprite(Sprites.animations.transformerAlex);
        this.setUpPhysics(x, y);
        this.body.SetUserData(this)
        this.mashedPotatoes = false;
        this.powerUp = 0;

        this.pump = new Pump(x + 1070, y + 300);
          this.buttonBashing = buttonBashing;
        this.buttonBashing.SetOnDone(function () =>
        {
            
            if (!this.pump.isPumpOn()) {
                this.pump.pumpState(true);
                GameInstance.camera.panToPosition(new b2Vec2(this.pump.x, this.pump.y));
            }
        }
       );
    }

    update() {       
        this.buttonBashing.update(this.mashedPotatoes);
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
        if (this.mashedPotatoes) {
            GameInstance.level.alex.drawable = false;
            this.electrifiedAlex.draw(ctx, -this.electrifiedAlex.getFrameWidth(), -this.electrifiedAlex.getFrameHeight() / 2);
        } else {
            GameInstance.level.alex.drawable = true;
        }
        ctx.restore();

        this.pump.draw(ctx);
        this.buttonBashing.draw(ctx);
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