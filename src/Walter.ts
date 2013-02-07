///<reference path="Player.ts"/>
///<reference path="system/Utilies.ts">
///<reference path="system/timer.ts"/>

class Walter extends Player
{
    public respawnPosition;
    public timer;


    constructor(x,y)
    {
        super(x, y, Sprites.animations.walterWalking, Sprites.animations.walterJumping);
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
   

    beginContact(contact) {
     super.beginContact(contact);
    }


    public transformReturn() {

        this.sprite = new Sprite(Sprites.animations.walterWalking);
        this.mayJump = true;
    }

    public transform() {

        this.sprite = new Sprite(Sprites.animations.walterIceAnimation);
        this.mayJump = false;
    }


    public respawn() {
        this.timer = new Date().getTime();
        this.Mayrespawn = true;
    }

    update() {
        super.update();

        if (this.Mayrespawn) {
            var _time = new Date().getTime();
            if (_time - this.timer > 2500) {
                this.body.SetPosition(this.respawnPosition);
                this.body.ApplyImpulse(new b2Vec2(0, -100), this.body.GetPosition());
                this.Mayrespawn = false;
            }
           
        }
    }

}