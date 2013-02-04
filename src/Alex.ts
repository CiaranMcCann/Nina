///<reference path="Player.ts"/>
///<reference path="system/Utilies.ts">
class Alex extends Player
{
    constructor(xInPixels: number, yInPixels: number)
    {
        super(xInPixels,yInPixels);

        this.controls = {
            left: keyboard.keyCodes.Leftarrow,
            right: keyboard.keyCodes.Rightarrow,
            jump: keyboard.keyCodes.Uparrow
        }
    }

}