
///<reference path="system/Physics.ts"/>
///<reference path="animation/Sprite.ts"/>

class Player implements isPhysicsBody
{
   static DIRECTION = {
        left: -1,
        right: 1
    }

    // Animated image
    private sprite: Sprite;

    //Physics body
    private body;

    // Direction character  is facing
    private direction: number;

    //Amount player moves at
    private speed: number;

    //Keyboard Controls
    controls: any;

    constructor(xInPixels : number, yInPixels: number)
    {       
        this.sprite = new Sprite(Sprites.animations.walking);
        this.setUpPhysics(xInPixels,yInPixels);

        this.speed = 3;
        this.direction = Player.DIRECTION.right;
    }

    update()
    {
        if (keyboard.isKeyDown(this.controls.right))
        {
            this.direction = Player.DIRECTION.right;
            this.sprite.update();
            this.body.SetPosition(new b2Vec2(this.body.GetPosition().x + Physics.pixelToMeters(this.speed), this.body.GetPosition().y));
        }

        if (keyboard.isKeyDown(this.controls.jump))
        {           
                var currentPos = this.body.GetPosition();
                var forces = new b2Vec2(this.direction, -2);
                forces.Multiply(5.5);

                this.body.ApplyImpulse(forces, this.body.GetPosition());
        }

        if (keyboard.isKeyDown(this.controls.left))
        {
            this.direction = Player.DIRECTION.left;
            this.sprite.update();
            this.body.SetPosition(new b2Vec2(this.body.GetPosition().x - Physics.pixelToMeters(this.speed), this.body.GetPosition().y));
        }
    }

    draw(ctx)
    {
        //Get position of the physics body and convert it to pixel cordinates
        var pos = Physics.vectorMetersToPixels(this.body.GetPosition());

        ctx.save();
        ctx.translate(pos.x, pos.y);

        if (this.direction == Player.DIRECTION.left)
        {
            // Used to flip the sprites       
            ctx.scale(-1, 1);
        }

        this.sprite.draw(ctx, -this.sprite.getFrameWidth()/2, -this.sprite.getFrameHeight()/2);

        ctx.restore()
    }

    beginContact(contact)
    {
        // On collsion with any box2d object
    }

    endContact(contact)
    {
       // When a contact ends with any box2d object
    }

    setUpPhysics(xInPixels,yInPixels)
    {
        var fixDef = new b2FixtureDef;
        fixDef.density = 1.0;
        fixDef.friction = 1.0;
        fixDef.restitution = 0.1;
        fixDef.shape = new b2PolygonShape();
        fixDef.shape.SetAsBox(
            Physics.pixelToMeters(this.sprite.getFrameWidth()/2.5), 
            Physics.pixelToMeters(this.sprite.getFrameHeight()/2)
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