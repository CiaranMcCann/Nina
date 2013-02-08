var PuzzleManager = (function () {
    function PuzzleManager() {
        this._dynamicObjects = [];
        this.CreatePuzzle(new InteractiveFire(this, 1800, 1850));
    }
    PuzzleManager.prototype.CreatePuzzle = function (puzzle) {
        if(puzzle == null) {
            throw new Error("create a new instance of the puzzle that should be added");
        }
        this._dynamicObjects.push(puzzle);
    };
    PuzzleManager.prototype.RemovePuzzle = function (puzzle) {
        var i = this._dynamicObjects.indexOf(puzzle);
        if(i < 0) {
            return;
        }
        Physics.world.DestroyBody(puzzle.body);
        Utilies.deleteFromCollection(this._dynamicObjects, i);
    };
    PuzzleManager.prototype.update = function () {
        for(var i in this._dynamicObjects) {
            var p = this._dynamicObjects[i];
            p.Update();
            if(!p.isAlive) {
                this.RemovePuzzle(p);
            }
        }
    };
    PuzzleManager.prototype.draw = function (ctx) {
        for(var i = 0; i < this._dynamicObjects.length; i++) {
            var p = this._dynamicObjects[i];
            p.Draw(ctx);
        }
    };
    return PuzzleManager;
})();
