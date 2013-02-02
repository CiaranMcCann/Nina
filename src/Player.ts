
///<reference path="system/Physics.ts"/>
///<reference path="animation/Sprite.ts"/>

class Player implements isPhysicsBody
{
   static DIRECTION = {
        left: -1,
        right: 1
    }

    // Animated image
    sprite: Sprite;

    //Physics body
    body;

    // Direction character  is facing
    direction: number;

    //Amount player moves at
    speed: number;

    constructor()
    {       
        this.sprite = new Sprite(Sprites.animations.walking);
        this.setUpPhysics();

        this.speed = 3;
        this.direction = Player.DIRECTION.right;

    }

    update()
    {
        if (keyboard.isKeyDown(keyboard.keyCodes.d))
        {
            this.direction = Player.DIRECTION.right;
            this.sprite.update();
            this.body.SetPosition(new b2Vec2(this.body.GetPosition().x + Physics.pixelToMeters(this.speed), this.body.GetPosition().y));
        }

        if (keyboard.isKeyDown(keyboard.keyCodes.w))
        {           
                var currentPos = this.body.GetPosition();
                var forces = new b2Vec2(this.direction, -2);
                forces.Multiply(5.5);

                this.body.ApplyImpulse(forces, this.body.GetPosition());
        }

        if (keyboard.isKeyDown(keyboard.keyCodes.a))
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

    setUpPhysics()
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
        bodyDef.position.x = 2;
        bodyDef.position.y = 1;

        this.body = Physics.world.CreateBody(bodyDef).CreateFixture(fixDef).GetBody();
        this.body.SetSleepingAllowed(false);
        this.body.SetFixedRotation(true);
    }

}