///<reference path="Coin.ts"/>
class Level
{
    coins: Coin[];

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

        //Create a load of random coins
        this.coins = [];
        for(var k = 0; k < 20; k++)
        {
            this.coins.push(new Coin(
                 Utilies.random(100, 1000),
                Utilies.random(100, 1000),
                Utilies.pickRandom([Coin.COIN_TYPE.electity, Coin.COIN_TYPE.water])
            ));
        }
    }

    draw(ctx)
    {
        for( var coin in this.coins )
            this.coins[coin].draw(ctx);
    }

    update()
    {

    }
}