var ToastMessage = (function () {
    function ToastMessage(pos, message, color) {
        this.finished = false;
        this.color = color;
        this.pos = pos;
        this.message = message;
        if(Utilies.isNumber(this.message)) {
            this.message = Math.floor(this.message);
            this.box = this.preRenderNumberBox();
        } else {
            this.box = this.preRenderMessageBox();
        }
        this.pos.x -= this.box.width / 2;
        this.pos.y -= this.box.height * 2;
        this.timer = new Timer(2700);
    }
    ToastMessage.prototype.preRenderNumberBox = function () {
        var healthBoxWidth = 39;
        var healthBoxHeight = 18;
        return Graphics.preRenderer.render(function (ctx) {
            ctx.fillStyle = '#1A1110';
            ctx.strokeStyle = "#eee";
            Graphics.roundRect(ctx, 0, 0, healthBoxWidth, healthBoxHeight, 4).fill();
            Graphics.roundRect(ctx, 0, 0, healthBoxWidth, healthBoxHeight, 4).stroke();
        }, 39, 20);
    };
    ToastMessage.prototype.preRenderMessageBox = function () {
        var _this = this;
        var nameBoxWidth = this.message.length * 10;
        var healthBoxWidth = 39;
        var healthBoxHeight = 18;
        return Graphics.preRenderer.render(function (ctx) {
            ctx.fillStyle = '#1A1110';
            ctx.strokeStyle = "#eee";
            ctx.font = 'bold 16.5px Sans-Serif';
            ctx.textAlign = 'center';
            Graphics.roundRect(ctx, 0, 0, nameBoxWidth, 20, 4).fill();
            Graphics.roundRect(ctx, 0, 0, nameBoxWidth, 20, 4).stroke();
            ctx.fillStyle = _this.color;
            ctx.fillText(_this.message, (_this.message.length * 10) / 2, 15);
        }, nameBoxWidth, 20);
    };
    ToastMessage.prototype.draw = function (ctx) {
        ctx.drawImage(this.box, this.pos.x, this.pos.y);
        ctx.fillStyle = this.color;
        if(Utilies.isNumber(this.message)) {
            ctx.fillText(this.message, this.pos.x + (this.box.width / 2), this.pos.y + (this.box.height / 1.4));
        }
    };
    ToastMessage.prototype.onAnimationFinish = function (func) {
        this.onFinishFunc = func;
    };
    ToastMessage.prototype.update = function () {
        this.timer.update();
        if(this.timer.hasTimePeriodPassed()) {
            this.finished = true;
            if(this.onFinishFunc) {
                this.onFinishFunc();
            }
        }
        this.pos.y -= 0.85;
    };
    return ToastMessage;
})();
