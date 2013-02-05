///<reference path="Player.ts"/>
///<reference path="system/Utilies.ts">
class Walter extends Player
{
    public respawnPosition;
    public Mayrespawn;

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






    update() {
        super.update();
        if (this.Mayrespawn) {

            this.body.SetPosition(this.respawnPosition);
            this.Mayrespawn = false;
        }
    }

}