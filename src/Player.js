var Player = (function () {
    function Player(xInPixels, yInPixels, animation, jumpAnimation, idelAnimation) {
        this._canWalk = true;
        this._canDraw = true;
        this.speed = 1;
        this.canJump = 0;
        this.direction = Player.DIRECTION.right;
        this.animationWalking = animation;
        this.sprite = new Sprite(animation);
        this.jumpSprite = new Sprite(jumpAnimation);
        this.iceAnimation = new Sprite(Sprites.animations.walterIceAnimation);
        this.idelAnimation = idelAnimation;
        this.idelTimer = new Timer(1);
        this.setUpPhysics(xInPixels, yInPixels);
        this.energy = 20;
        this.hasMovedLeft = this.hasMovedRight = this.hasMovedUp = false;
        this.body.SetUserData(this);
        this.mayJump = true;
        this.jumpForce = 30;
    }
    Player.DIRECTION = {
        left: -1,
        right: 1
    };
    Player.prototype.setCanWalk = function (value) {
        this._canWalk = value;
    };
    Player.prototype.getCanWalk = function () {
        return this._canWalk;
    };
    Player.prototype.setCanDraw = function (value) {
        this._canDraw = value;
    };
    Player.prototype.getCanDraw = function () {
        return this._canDraw;
    };
    Player.prototype.getBody = function () {
        return this.body;
    };
    Player.prototype.getEnergy = function () {
        return this.energy;
    };
    Player.prototype.setEnergy = function (e) {
        this.energy = e;
        if(this.energy < 0) {
            this.energy = 0;
        }
        if(this.energy > 100) {
            this.energy = 100;
        }
    };
    Player.prototype.update = function () {
        if(this.body.GetLinearVelocity().Length() >= 0.01) {
            GameInstance.camera.panToPosition(Physics.vectorMetersToPixels(this.body.GetPosition()));
        }
        if(!this._canWalk) {
            return;
        }
        if(this.Mayrespawn) {
            return;
        }
        if(this.canClimb) {
            this.body.SetAwake(false);
        }
        if(keyboard.isKeyDown(this.controls.right)) {
            this.hasMovedRight = true;
            this.direction = Player.DIRECTION.right;
            this.sprite.setSpriteDef(this.animationWalking);
            this.idelTimer.reset();
            if(this.iceBlock) {
                this.iceAnimation.update();
            } else {
                this.sprite.update();
            }
            this.body.ApplyImpulse(new b2Vec2(this.direction * 5, 0), this.body.GetPosition());
            this.body.SetPosition(new b2Vec2(this.body.GetPosition().x + Physics.pixelToMeters(this.speed), this.body.GetPosition().y));
        }
        if(keyboard.isKeyDown(this.controls.jump)) {
            this.hasMovedUp = true;
            if(this.canJump >= 1 && this.mayJump) {
                var currentPos = this.body.GetPosition();
                var forces = new b2Vec2(0, -2);
                AssetManager.getSound("jump").play(0.2);
                forces.Multiply(this.jumpForce);
                this.body.ApplyImpulse(forces, this.body.GetWorldCenter());
            }
            if(this.canClimb) {
                var currentPos = this.body.GetPosition();
                var forces = new b2Vec2(0, -2);
                forces.Multiply(2);
                var newPosition = new b2Vec2(this.body.GetPosition().x, this.body.GetPosition().y -= 0.2);
                this.body.SetPosition(newPosition);
            }
        }
        if(this.canJump < 1 && !this.canClimb) {
            if(this.jumpSprite.getCurrentFrame() == 9) {
                this.jumpSprite.setCurrentFrame(4);
            }
            this.jumpSprite.update();
        } else if(this.canJump >= 1 && !this.canClimb) {
            this.jumpSprite.setCurrentFrame(1);
        }
        if(keyboard.isKeyDown(this.controls.left)) {
            this.direction = Player.DIRECTION.left;
            this.sprite.setSpriteDef(this.animationWalking);
            this.idelTimer.reset();
            if(this.iceBlock) {
                this.iceAnimation.update();
            } else {
                this.sprite.update();
            }
            this.hasMovedLeft = true;
            this.body.ApplyImpulse(new b2Vec2(this.direction * 7, 0), this.body.GetPosition());
            this.body.SetPosition(new b2Vec2(this.body.GetPosition().x - Physics.pixelToMeters(this.speed), this.body.GetPosition().y));
        }
        if(keyboard.isKeyDown(this.controls.down)) {
        }
        this.idelTimer.update();
        if(this.idelTimer.hasTimePeriodPassed(false)) {
            if(this.idelAnimation != null) {
                this.sprite.setSpriteDef(this.idelAnimation);
            }
        }
        if(this.sprite.spriteDef == this.idelAnimation) {
            this.sprite.update();
        }
    };
    Player.prototype.MakeCameraFollow = function () {
        this.body.ApplyImpulse(new b2Vec2(this.direction * 0.5, 0), this.body.GetPosition());
    };
    Player.prototype.draw = function (ctx) {
        if(this instanceof Alex) {
            Logger.log(this._canDraw);
        }
        if(!this._canDraw) {
            return;
        }
        var pos = Physics.vectorMetersToPixels(this.body.GetPosition());
        ctx.save();
        ctx.translate(pos.x, pos.y);
        if(!this.hasMovedLeft || !this.hasMovedRight || !this.hasMovedUp) {
            if(this.controlImage != null) {
                ctx.drawImage(this.controlImage, -(this.controlImage.width / 2), -(this.controlImage.height / 2) - 100);
            }
        }
        if(this.direction == Player.DIRECTION.left) {
            ctx.scale(-1, 1);
        }
        if(this.canJump < 1 && !this.canClimb && !this.iceBlock) {
            this.jumpSprite.draw(ctx, -this.jumpSprite.getFrameWidth() / 2, -this.jumpSprite.getFrameHeight() / 2);
        } else if(this.iceBlock) {
            this.iceAnimation.draw(ctx, -this.sprite.getFrameWidth() / 2, -this.sprite.getFrameHeight() / 2);
        } else {
            this.sprite.draw(ctx, -this.sprite.getFrameWidth() / 2, -this.sprite.getFrameHeight() / 2);
        }
        ctx.restore();
    };
    Player.prototype.beginContact = function (contact) {
        var userDataA = contact.GetFixtureA().GetBody().GetUserData();
        var userDataB = contact.GetFixtureB().GetBody().GetUserData();
        if(this.footSensor == contact.GetFixtureA() || this.footSensor == contact.GetFixtureB()) {
            if(userDataA instanceof Platform || userDataB instanceof Platform || userDataA instanceof ElectricWire || userDataB instanceof ElectricWire) {
                this.canJump++;
            }
        }
    };
    Player.prototype.endContact = function (contact) {
        var userDataA = contact.GetFixtureA().GetBody().GetUserData();
        var userDataB = contact.GetFixtureB().GetBody().GetUserData();
        if(this.footSensor == contact.GetFixtureA() || this.footSensor == contact.GetFixtureB()) {
            if(userDataA instanceof Platform || userDataB instanceof Platform || userDataA instanceof ElectricWire || userDataB instanceof ElectricWire) {
                this.canJump--;
            }
        }
    };
    Player.prototype.setUpPhysics = function (xInPixels, yInPixels) {
        var fixDef = new b2FixtureDef();
        fixDef.density = 5.0;
        fixDef.friction = 1.0;
        fixDef.restitution = 0.1;
        fixDef.shape = new b2PolygonShape();
        fixDef.shape.SetAsBox(Physics.pixelToMeters(64 / 2.5), Physics.pixelToMeters(100 / 2));
        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.x = Physics.pixelToMeters(xInPixels);
        bodyDef.position.y = Physics.pixelToMeters(yInPixels);
        this.body = Physics.world.CreateBody(bodyDef).CreateFixture(fixDef).GetBody();
        this.body.SetSleepingAllowed(false);
        this.body.SetFixedRotation(true);
        fixDef.shape = new b2PolygonShape();
        fixDef.shape.SetAsBox(Physics.pixelToMeters(64 / 3), Physics.pixelToMeters(100 / 19));
        fixDef.isSensor = true;
        this.footSensor = this.body.CreateFixture(fixDef);
        for(var v in this.footSensor.m_shape.m_vertices) {
            this.footSensor.m_shape.m_vertices[v].y += Physics.pixelToMeters(100 / 2);
        }
    };
    return Player;
})();
