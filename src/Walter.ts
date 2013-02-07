///<reference path="Player.ts"/>
///<reference path="system/Utilies.ts">
///<reference path="system/timer.ts"/>

class Walter extends Player
{
    public respawnPosition;
    public timer;
    private _pipe: Pipe;

    constructor(x,y)
    {
        super(x, y, Sprites.animations.walterWalking, Sprites.animations.walterJumping,Sprites.animations.walterIdel);
        this.respawnPosition = new b2Vec2(0, 0);
        this.controls = {
            left: keyboard.keyCodes.a,
            right: keyboard.keyCodes.d,
            jump: keyboard.keyCodes.w,
            positive: keyboard.keyCodes.e,
            negative: keyboard.keyCodes.q
        }

        this.controlImage = AssetManager.getImage("walterControl");
    }
   
    setPipe(value: Pipe)
    {
        this.setCanDraw(false);
        this._pipe = value;
    }

    beginContact(contact) {
     super.beginContact(contact);
    }


    public transformReturn() {

        //this.sprite = new Sprite(Sprites.animations.walterWalking);
        this.mayJump = true;
        this.iceBlock = false;
        
    }

    public transform() {

        //this.sprite = new Sprite(Sprites.animations.walterIceAnimation);
        this.mayJump = false;
        this.iceBlock = true;
    }


    public respawn() {
        this.timer = new Date().getTime();
        this.Mayrespawn = true;
    }

    update() {
        if (this.iceBlock) {

        }
        super.update();
        this.sprite.update();
        if (this.Mayrespawn) {
            var _time = new Date().getTime();
            if (_time - this.timer > 2250)
            {
                this.setCanDraw(true);
                this.body.SetPosition(this.respawnPosition);
                this.body.ApplyImpulse(new b2Vec2(0, -100), this.body.GetPosition());
                this.Mayrespawn = false;
                this._pipe.onWalterReachedEnd();
            }           
        }
    }

}