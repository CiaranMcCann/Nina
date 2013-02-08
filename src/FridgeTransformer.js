var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var FridgeTransformer = (function (_super) {
    __extends(FridgeTransformer, _super);
    function FridgeTransformer(x, y, buttonBashing) {
        _super.call(this, x, y, buttonBashing);
        this.pump = new Fridge(x - 150, y + 20);
        this.powerUp = 100;
    }
    FridgeTransformer.prototype.update = function () {
        if(this.mashedPotatoes) {
            this.electrifiedAlex.update();
        }
    };
    FridgeTransformer.prototype.beginContact = function (contact) {
        var a = contact.GetFixtureA().GetBody().GetUserData();
        var b = contact.GetFixtureB().GetBody().GetUserData();
        if(a instanceof Alex || b instanceof Alex) {
            this.pump.pumpState(true);
            this.mashedPotatoes = true;
        }
    };
    FridgeTransformer.prototype.endContact = function (contact) {
        var a = contact.GetFixtureA().GetBody().GetUserData();
        var b = contact.GetFixtureB().GetBody().GetUserData();
        if(a instanceof Alex || b instanceof Alex) {
            this.pump.pumpState(false);
            this.mashedPotatoes = false;
            GameInstance.level.alex.setCanDraw(true);
        }
    };
    return FridgeTransformer;
})(Transformer);
