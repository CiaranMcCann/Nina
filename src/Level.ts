///<reference path="Coin.ts"/>
///<reference path="interactiveObject/puzzles/Pipe.ts"/>
///<reference path="Transformer.ts"/>
///<reference path="ButtonBashing.ts"/>
///<reference path="FridgeTransformer.ts"/>
///<reference path="Sauna.ts"/>
///<reference path="Wall.ts"/>


class Level
{
    coins: Coin[];
    walter: Walter;
    alex: Alex;
    transformer: Transformer;
    image: string;
    puzzleManager: PuzzleManager;
    poles: ElectricPole[];
    fridgeTransformer: FridgeTransformer;
    sauna: Sauna;
    wall: Wall;
    
    

    constructor(levelData: string)
    {
        this.puzzleManager = new PuzzleManager();

        // Parers level
        var level = JSON.parse(levelData);
        var i;
        for (i in level["platforms"]) {
            var x = level["platforms"][i].x;
            var y = level["platforms"][i].y;
            var w = level["platforms"][i].w / 2;
            var h = level["platforms"][i].h / 2;
            var p = new Platform(x + w, y + h, w, h);
        }
        
        this.coins = [];
        for (i in level['waterCoins']) {
            this.coins.push(new Coin(level['waterCoins'][i].x, level['waterCoins'][i].y, Coin.COIN_TYPE.water));
        }
        for (i in level['elecCoins']) {
            this.coins.push(new Coin(level['elecCoins'][i].x, level['elecCoins'][i].y, Coin.COIN_TYPE.electity));
        }

        for (i in level['fires']) {
            var tmpFire = new InteractiveFire(this.puzzleManager, level['fires'][i].x, level['fires'][i].y);
            this.puzzleManager.CreatePuzzle(tmpFire);
        }

        //Load electricity poles
        this.poles = [];
        var count = 0;
        for (i = level['poles'].length - 1; i >= 0; i--) {
            // Magic numbers!!!!!! Poles could be resizable in the editor
            var x = level['poles'][i].x + 5;
            var y = level['poles'][i].y + 100;
            this.poles.push(new ElectricPole(x, y));
            this.puzzleManager.CreatePuzzle(this.poles[count]);
            this.puzzleManager.CreatePuzzle(new Ladder(x, y));
            if (!(i % 2)) {
                this.puzzleManager.CreatePuzzle(new ElectricWire(this.poles[count - 1], this.poles[count]));
            }
            ++count;
        }

        // Load pipes
        this.puzzleManager.CreatePuzzle(new Pipe(4050, 1840));
        
        this.walter = new Walter(level['walter'].x, level['walter'].y);
        this.alex = new Alex(level['alex'].x, level['alex'].y);

        this.transformer = new Transformer(
            2980, 1650, new ButtonBashing(this.alex.controls, this.alex)
        );

        this.image = level["levelImage"];
       
        this.fridgeTransformer = new FridgeTransformer(1400, 450, new ButtonBashing(this.alex.controls, this.alex)
        );
        this.sauna = new Sauna(300, 450);
        this.wall = new Wall(450, 450);

    }

    draw(ctx)
    {
        for( var coin in this.coins )
            this.coins[coin].draw(ctx);

        this.alex.draw(ctx);
        this.walter.draw(ctx);
        this.sauna.draw(ctx);
        this.fridgeTransformer.draw(ctx);
        this.puzzleManager.draw(ctx);
        this.transformer.draw(ctx);
        this.wall.draw(ctx);
    }

    update()
    {
        for (var coin in this.coins)
        {
            if (this.coins[coin].isAlive == false)
            {
                Physics.world.DestroyBody(this.coins[coin].body);
                Utilies.deleteFromCollection(this.coins, coin);
            }
        }

        this.puzzleManager.update();
        
        this.walter.update();
        this.alex.update();
        this.transformer.update();
    }
}
