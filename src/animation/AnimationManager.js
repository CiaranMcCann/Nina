var AnimationManager = (function () {
    function AnimationManager() {
        this.particleEffects = [];
    }
    AnimationManager.prototype.add = function (effect) {
        this.particleEffects.push(effect);
    };
    AnimationManager.prototype.stopAll = function () {
        for(var i = this.particleEffects.length - 1; i >= 0; i--) {
            this.particleEffects[i].finished = true;
        }
    };
    AnimationManager.prototype.draw = function (ctx) {
        for(var i = this.particleEffects.length - 1; i >= 0; i--) {
            this.particleEffects[i].draw(ctx);
        }
    };
    AnimationManager.prototype.update = function () {
        for(var i = this.particleEffects.length - 1; i >= 0; i--) {
            this.particleEffects[i].update();
            if(this.particleEffects[i].finished == true) {
                Utilies.deleteFromCollection(this.particleEffects, i);
            }
        }
    };
    return AnimationManager;
})();
