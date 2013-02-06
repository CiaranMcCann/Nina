///<reference path="Coin.ts"/>
///<reference path="Transformer.ts"/>
///<reference path="Pump.ts" />
///<reference path="ButtonBashing.ts" />
class Level
{
    coins: Coin[];
    walter: Walter;
    alex: Alex;
    transformer: Transformer;
    image: string;
    puzzleManager: PuzzleManager;
    pump: Pump;
    buttonbashing: ButtonBashing;

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
        // creating the transformer
        this.pump = new Pump();
        
        this.walter = new Walter(level['walter'].x, level['walter'].y);
        this.alex = new Alex(level['alex'].x, level['alex'].y);
        
        this.transformer = new Transformer(
            2400, 1400, this.pump, new ButtonBashing(this.alex.controls, this.alex)
        );
        this.image = level["levelImage"];
    }

    draw(ctx)
    {
        for( var coin in this.coins )
            this.coins[coin].draw(ctx);

        this.alex.draw(ctx);
        this.walter.draw(ctx);

        this.puzzleManager.draw(ctx);
        this.pump.draw(ctx);
        this.transformer.draw(ctx);
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
