///<reference path="Coin.ts"/>
class Level
{
    coins: Coin[];
    walter: Walter;
    alex: Alex;

    constructor(levelData: string)
    {
        // Parers level
        var level = JSON.parse(levelData);
        for (var i in level["platforms"]) {
            var x = level["platforms"][i].x;
            var y = level["platforms"][i].y;
            var w = level["platforms"][i].w / 2;
            var h = level["platforms"][i].h / 2;
            var p = new Platform(x + w, y + h, w, h);
        }

        this.walter = new Walter(level['walter'].x, level['walter'].y);
        this.alex = new Alex(level['alex'].x, level['alex'].y);

        //Create a load of random coins
        this.coins = [];
        for(var k = 0; k < 10; k++)
        {
            this.coins.push(new Coin(
                 Utilies.random(100, 3000),
                Utilies.random(100, 3000),
                Utilies.pickRandom([Coin.COIN_TYPE.electity, Coin.COIN_TYPE.water])
            ));
        }
    }

    draw(ctx)
    {

        for( var coin in this.coins )
            this.coins[coin].draw(ctx);

        this.alex.draw(ctx);
        this.walter.draw(ctx);
    }

    update()
    {
        this.walter.update();
        this.alex.update();
    }
}