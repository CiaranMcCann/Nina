///<reference path="Player.ts"/>
///<reference path="system/Utilies.ts">
class Alex extends Player
{
    constructor(x,y)
    {
        super(x,y,Sprites.animations.alexWalking);

        this.controls = {
            left: keyboard.keyCodes.Leftarrow,
            right: keyboard.keyCodes.Rightarrow,
            jump: keyboard.keyCodes.Uparrow,
            use: keyboard.keyCodes.Downarrow
        }

        this.controlImage = AssetManager.getImage("alexControl");

    }

}