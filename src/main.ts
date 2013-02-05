/**
 *  
 *  HTML5 Base framwork Clone 
 *
 *  Main entry piont
 *
 *  author:  Ciarán McCann
 *  url: http://www.ciaranmccann.me/
 */
///<reference path="Game.ts"/>


// This varible is global and can be acessed anywhere for convencene.
var GameInstance: Game;

$(document).ready(function () =>
{
    Settings.getSettingsFromUrl();
    AssetManager.loadAssets(function ()
    {
        Logger.log(" All assets loaded ");
        GameInstance = new Game();

        function gameloop()
        {
           if(Settings.DEVELOPMENT_MODE)
            Graphics.stats.update();

            GameInstance.step();
            GameInstance.update();
            GameInstance.draw();
            window.requestAnimationFrame(gameloop);
        }
        gameloop();
    });
});