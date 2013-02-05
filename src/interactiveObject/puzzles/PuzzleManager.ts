///<reference path="InteractiveFire.ts"/>

interface IPuzzleManager
{
    CreatePuzzle(puzzle: BasePuzzle);
    RemovePuzzle(puzzle: BasePuzzle);
};

class PuzzleManager implements IPuzzleManager
{
    private _dynamicObjects: BasePuzzle[];

    constructor(  )
    {
        this._dynamicObjects = [];
        this.CreatePuzzle(new InteractiveFire(this));
    }

    //creates a new puzzle and adds it to the array of dynamicPuzzles
    CreatePuzzle(puzzle: BasePuzzle)
    {
        if (puzzle == null) throw new Error( "create a new instance of the puzzle that should be added" );
        this._dynamicObjects.push(puzzle);
    }

    RemovePuzzle(puzzle: BasePuzzle)
    {
        var i: number = this._dynamicObjects.indexOf(puzzle);
        if ( i < 0 )    return; //if i is not in our array, we don't remove it ( logically =) )
        this._dynamicObjects.splice(i);
    }

    update( )
    {
        for (var i = 0; i < this._dynamicObjects.length; i++)
        {
            var p: BasePuzzle = this._dynamicObjects[i];
            p.Update();
        }
    }

    draw(ctx)
    {
        for (var i = 0; i < this._dynamicObjects.length; i++)
        {
            var p: BasePuzzle = this._dynamicObjects[i];
            p.Draw(ctx);
        }
    }
}