var GameInstance;
$(document).ready(function () {
    Settings.getSettingsFromUrl();
    AssetManager.loadAssets(function () {
        Logger.log(" All assets loaded ");
        GameInstance = new Game();
        function gameloop() {
            Graphics.stats.update();
            GameInstance.step();
            GameInstance.update();
            GameInstance.draw();
            window.requestAnimationFrame(gameloop);
        }
        gameloop();
    });
});
