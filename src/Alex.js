var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Alex = (function (_super) {
    __extends(Alex, _super);
    function Alex(x, y) {
        _super.call(this, x, y, Sprites.animations.alexWalking, Sprites.animations.alexJumping, Sprites.animations.alexIdel);
        this.jumpForce = 30;
        this.controls = {
            left: keyboard.keyCodes.Leftarrow,
            right: keyboard.keyCodes.Rightarrow,
            jump: keyboard.keyCodes.Uparrow,
            positive: keyboard.keyCodes.p,
            negative: keyboard.keyCodes.o
        };
        this.controlImage = AssetManager.getImage("alexControl");
    }
    return Alex;
})(Player);
