/**
 * Game.js
 * This is the main game object which controls gameloop and basically everything in the game
 *
 */
///<reference path="system/Camera.ts"/>
///<reference path="system/Graphics.ts"/>
///<reference path="system/AssetManager.ts"/>
///<reference path="system/Utilies.ts"/>
///<reference path="Walter.ts"/>
///<reference path="Alex.ts"/>
///<reference path="animation/Sprite.ts"/>
///<reference path="interactiveObject/puzzles/PuzzleManager.ts"/>
///<reference path="EnergyBar.ts"/>
///<reference path="Coin.ts"/>
///<reference path="Platform.ts"/>
///<reference path="Level.ts"/>

class Game
{

    canvas: HTMLCanvasElement;
    canvasContext: CanvasRenderingContext2D;
    camera: Camera;
    puzzleManager: PuzzleManager;
    energybar: EnergyBar;
    level: Level;

    levelDataString = '{"platforms":[{"x":8,"y":858,"h":30,"w":1389},{"x":1367,"y":887,"h":1214,"w":30},{"x":1390,"y":2097,"h":30,"w":2856},{"x":4216,"y":2126,"h":445,"w":30},{"x":4243,"y":2554,"h":30,"w":764},{"x":4986,"y":2062,"h":522,"w":30},{"x":5015,"y":2062,"h":30,"w":659},{"x":4580,"y":2473,"h":87,"w":81},{"x":4661,"y":2392,"h":81,"w":82},{"x":4742,"y":2309,"h":86,"w":83},{"x":4823,"y":2227,"h":95,"w":83},{"x":4904,"y":2145,"h":89,"w":86}],"alex":{"x":5453,"y":1960},"walter":{"x":5217,"y":1961},"waterCoins":[{"x":4783,"y":2270}],"elecCoins":[{"x":4619,"y":2433}],"levelImage":"level_design_level_01_00"}';

    constructor()
    {
        Graphics.init();

        //Create action canvas
        this.canvas = Graphics.createCanvas("action");

        //This is the GL context used to draw to the screen
        this.canvasContext = this.canvas.getContext("2d");

        Physics.init(this.canvasContext);

        this.puzzleManager = new PuzzleManager();
        this.energybar = new EnergyBar();
 
        this.level = new Level(this.levelDataString);
        this.camera = new Camera(AssetManager.getImage(this.level.image).width, AssetManager.getImage(this.level.image).height, this.canvas.width, this.canvas.height);

    }


    update()
    {
        this.level.update();
        this.camera.update();
        this.puzzleManager.update();

        // Debug move camera
        if (keyboard.isKeyDown(keyboard.keyCodes.y)) //up
        {
            GameInstance.camera.cancelPan();
            GameInstance.camera.incrementY(-15)
        }

        if (keyboard.isKeyDown(keyboard.keyCodes.h)) //down
        {
            GameInstance.camera.cancelPan();
            GameInstance.camera.incrementY(15)
        }


        if (keyboard.isKeyDown(keyboard.keyCodes.g)) //left
        {
            GameInstance.camera.cancelPan();
            GameInstance.camera.incrementX(-15)
        }


        if (keyboard.isKeyDown(keyboard.keyCodes.j)) //right
        {
            GameInstance.camera.cancelPan();
            GameInstance.camera.incrementX(15)
        }
    }

    step()
    {
        // Physics world time-step
        Physics.world.Step((1 / 60), 10, 10);
    }

    draw()
    {
        //Clear the previous frame from the screen
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Blit a section of the Level image onto the screen
        this.canvasContext.drawImage(
            AssetManager.getImage(this.level.image),
            this.camera.getX(),
            this.camera.getY(),
            this.canvas.width,
            this.canvas.height,
            0,
            0,
            this.canvas.width,
            this.canvas.height
       );

        // Saving the GL context here
        this.canvasContext.save();

        //Modifying the GL context here, by translating the origin 
        this.canvasContext.translate(-this.camera.getX(), -this.camera.getY());

        //Draw all entities here
            
            this.level.draw(this.canvasContext);
            this.level.draw(this.canvasContext);
            this.puzzleManager.draw(this.canvasContext);
            Physics.world.DrawDebugData();


        //Restore previous GL context
            this.canvasContext.restore();
            this.energybar.draw(this.canvasContext, 100, 100);
        this.energybar.draw(this.canvasContext, 100, 100);

        
    }
}
