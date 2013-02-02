///<reference path="Player.ts"/>
///<reference path="system/Utilies.ts">
class Alex extends Player
{
    constructor()
    {
        super(600,100);

        this.controls = {
            left: keyboard.keyCodes.Leftarrow,
            right: keyboard.keyCodes.Rightarrow,
            jump: keyboard.keyCodes.Uparrow
        }
    }

}