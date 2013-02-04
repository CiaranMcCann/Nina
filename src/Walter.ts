///<reference path="Player.ts"/>
///<reference path="system/Utilies.ts">
class Walter extends Player
{
    public respawnPosition;
    public Mayrespawn;

    constructor()
    {
        super(500, 100);
        this.respawnPosition = new b2Vec2(0, 0);
        this.controls = {
            left: keyboard.keyCodes.a,
            right: keyboard.keyCodes.d,
            jump: keyboard.keyCodes.w
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