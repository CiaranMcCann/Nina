///<reference path="Player.ts"/>
///<reference path="system/Utilies.ts">
class Walter extends Player
{
    constructor()
    {
        super(500,100);

        this.controls = {
            left: keyboard.keyCodes.a,
            right: keyboard.keyCodes.d,
            jump: keyboard.keyCodes.w
        }
    }

}