///<reference path="Coin.ts"/>
class Level
{
    coins: Coin[];

    constructor(levelData: string)
    {
        // Parers level

        //Create a load of random coins
        for (var i = 0 ; i < 30; i++)
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