///<reference path="Ladder.ts"/>
///<reference path="ElectricPole.ts"/>
///<reference path="ElectricWire.ts"/>

class PuzzleManager
{
    ladder: Ladder;
    pole: ElectricPole;
    pole2: ElectricPole;
    wire: ElectricWire;
    pipe: Pipe;
    pipe2: Pipe;
    
    constructor(  )
    {
        this.ladder = new Ladder(550, 580);
        this.pole = new ElectricPole(450, 580);
        this.pole2 = new ElectricPole(150, 580);
        this.wire = new ElectricWire(this.pole, this.pole2);
        this.pipe = new Pipe(null, 800, 640);
        this.pipe2 = new Pipe(this.pipe, 1100, 640);

        
    }



}