///<reference path="Player.ts"/>
///<reference path="system/Utilies.ts">
class Walter extends Player
{
    constructor(x,y)
    {
        super(x,y,Sprites.animations.walterWalking);

        this.controls = {
            left: keyboard.keyCodes.a,
            right: keyboard.keyCodes.d,
            jump: keyboard.keyCodes.w,
            positive: keyboard.keyCodes.e,
            negative: keyboard.keyCodes.q
        }

    }

}