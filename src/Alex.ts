///<reference path="Player.ts"/>
///<reference path="system/Utilies.ts">
class Alex extends Player
{
    constructor(x,y)
    {
        super(x, y, Sprites.animations.alexWalking, Sprites.animations.alexJumping,Sprites.animations.alexIdel);
        this.jumpForce = 30;
        this.controls = {
            left: keyboard.keyCodes.Leftarrow,
            right: keyboard.keyCodes.Rightarrow,
            jump: keyboard.keyCodes.Uparrow,
            positive: keyboard.keyCodes.p,
            negative: keyboard.keyCodes.o
        }

        this.controlImage = AssetManager.getImage("alexControl");

    }

}