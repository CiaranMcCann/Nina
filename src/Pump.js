var Pump = (function () {
    function Pump(x, y) {
        this.runPump = false;
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.image = AssetManager.getImage("Propeller");
    }
    Pump.prototype.draw = function (ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(0.5, 0.5);
        if(this.isPumpOn()) {
            this.angle += 10;
            ctx.rotate(Utilies.toRadians(this.angle));
        }
        ctx.drawImage(this.image, -(this.image.width / 2), -(this.image.height / 2));
        ctx.restore();
    };
    Pump.prototype.pumpState = function (state) {
        this.runPump = state;
    };
    Pump.prototype.isPumpOn = function () {
        return this.runPump;
    };
    return Pump;
})();
