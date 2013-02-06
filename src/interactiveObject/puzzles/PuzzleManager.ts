///<reference path="Ladder.ts"/>
///<reference path="Pipe.ts"/>
///<reference path="CloudPuzzle/InteractiveFire.ts"/>
///<reference path="ElectricPole.ts"/>
///<reference path="ElectricWire.ts"/>

interface IPuzzleManager
{
    CreatePuzzle(puzzle: BasePuzzle);
    RemovePuzzle(puzzle: BasePuzzle);
}

class PuzzleManager implements IPuzzleManager
{
    private _dynamicObjects: BasePuzzle[];
    pole: ElectricPole;
    pole2: ElectricPole;
    pipe: Pipe;


    constructor(  )
    {

        this._dynamicObjects = [];
       // this.CreatePuzzle(this.pole = new ElectricPole(450, 580));
       // this.CreatePuzzle(this.pole2 = new ElectricPole(150, 580));
       // this.CreatePuzzle(new Ladder(550, 580));
        // this.CreatePuzzle(new ElectricWire(this.pole, this.pole2));
        this.CreatePuzzle(new InteractiveFire(this, 1600, 1953));        
        //this.CreatePuzzle(this.pipe = new Pipe(null, 3000, 2100,true));
       //this.CreatePuzzle(this.pipe2 = new Pipe(4360, 2100));
          
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
        Physics.world.DestroyBody(puzzle.body);
        Utilies.deleteFromCollection(this._dynamicObjects, i);
    }

    update( )
    {
        for (var i in this._dynamicObjects)
        {
            var p: BasePuzzle = this._dynamicObjects[i];
            p.Update();
            if (!p.isAlive) this.RemovePuzzle(p);
        }

    }

    draw(ctx:CanvasRenderingContext2D)
    {
        for (var i = 0; i < this._dynamicObjects.length; i++)
        {
            var p: BasePuzzle = this._dynamicObjects[i];
            p.Draw(ctx);
        }
    }
}