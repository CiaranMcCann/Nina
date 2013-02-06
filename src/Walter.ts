///<reference path="Player.ts"/>
///<reference path="system/Utilies.ts">
///<reference path="system/timer.ts"/>

class Walter extends Player
{
    public respawnPosition;
    public timer;


    constructor(x,y)
    {
        super(x,y,Sprites.animations.walterWalking);
        this.respawnPosition = new b2Vec2(0, 0);
        this.controls = {
            left: keyboard.keyCodes.a,
            right: keyboard.keyCodes.d,
            jump: keyboard.keyCodes.w,
            use: keyboard.keyCodes.s
        }
    }
   
    animateEyes() {
    }

    public respawn() {
        this.timer = new Date().getTime();
        this.Mayrespawn = true;
    }

    update() {
        super.update();
        if (this.Mayrespawn) {
            var _time = new Date().getTime();
            if (_time - this.timer > 3000) {
                this.body.SetPosition(this.respawnPosition);
                this.Mayrespawn = false;
            }
           
        }
    }

}