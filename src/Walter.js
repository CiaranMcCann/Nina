var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Walter = (function (_super) {
    __extends(Walter, _super);
    function Walter(x, y) {
        _super.call(this, x, y, Sprites.animations.walterWalking, Sprites.animations.walterJumping, Sprites.animations.walterIdel);
        this.respawnPosition = new b2Vec2(0, 0);
        this.controls = {
            left: keyboard.keyCodes.a,
            right: keyboard.keyCodes.d,
            jump: keyboard.keyCodes.w,
            positive: keyboard.keyCodes.e,
            negative: keyboard.keyCodes.q
        };
        this.controlImage = AssetManager.getImage("walterControl");
    }
    Walter.prototype.setPipe = function (value) {
        this.setCanDraw(false);
        this._pipe = value;
    };
    Walter.prototype.beginContact = function (contact) {
        _super.prototype.beginContact.call(this, contact);
    };
    Walter.prototype.transformReturn = function () {
        this.mayJump = true;
        this.iceBlock = false;
    };
    Walter.prototype.transform = function () {
        this.mayJump = false;
        this.iceBlock = true;
    };
    Walter.prototype.respawn = function () {
        this.timer = new Date().getTime();
        this.Mayrespawn = true;
    };
    Walter.prototype.update = function () {
        if(this.iceBlock) {
        }
        _super.prototype.update.call(this);
        this.sprite.update();
        if(this.Mayrespawn) {
            var _time = new Date().getTime();
            if(_time - this.timer > 2250) {
                this.setCanDraw(true);
                this.body.SetPosition(this.respawnPosition);
                this.body.ApplyImpulse(new b2Vec2(0, -100), this.body.GetPosition());
                this.Mayrespawn = false;
                this._pipe.onWalterReachedEnd();
            }
        }
    };
    return Walter;
})(Player);
