///<reference path="Player.ts"/>
///<reference path="system/Utilies.ts">
class Walter extends Player
{
    constructor(xInPixels: number, yInPixels: number)
    {
        super(xInPixels,yInPixels);

        this.controls = {
            left: keyboard.keyCodes.a,
            right: keyboard.keyCodes.d,
            jump: keyboard.keyCodes.w
        }
    }

}