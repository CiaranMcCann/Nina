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
///<reference path=Pump.ts"/>
///<reference path="Level.ts"/>
///<reference path="Platform.ts"/>
///<reference path="Transformer.ts" />

class Game
{
    canvas: HTMLCanvasElement;
    canvasContext: CanvasRenderingContext2D;
    camera: Camera;
    puzzleManager: PuzzleManager;
    energybar: EnergyBar;
    level: Level;
    pump: Pump;
    

    levelDataString = '{"platforms":[{"x":-1,"y":881,"h":30,"w":1257},{"x":1226,"y":911,"h":1260,"w":30},{"x":1256,"y":2141,"h":30,"w":2154},{"x":3379,"y":2171,"h":465,"w":30},{"x":3409,"y":2606,"h":30,"w":765},{"x":4171,"y":2104,"h":532,"w":30},{"x":4200,"y":2104,"h":30,"w":687},{"x":3754,"y":2524,"h":82,"w":420},{"x":3838,"y":2441,"h":85,"w":334},{"x":3921,"y":2358,"h":84,"w":252},{"x":4004,"y":2273,"h":86,"w":167},{"x":4087,"y":2191,"h":87,"w":85}],"alex":{"x":4615,"y":2004},"walter":{"x":4352,"y":2004},"waterCoins":[{"x":4130,"y":2150},{"x":3965,"y":2319},{"x":3797,"y":2483}],"elecCoins":[{"x":4047,"y":2232},{"x":3883,"y":2403},{"x":3713,"y":2564}],"levelImage":"level_design_level_01_00"}';

    constructor()
    {
        Graphics.init();

        //Create action canvas
        this.canvas = Graphics.createCanvas("action");

        //This is the GL context used to draw to the screen
        this.canvasContext = this.canvas.getContext("2d");

        Physics.init(this.canvasContext);

        this.puzzleManager = new PuzzleManager();
 
        this.level = new Level(this.levelDataString);
        this.pump = new Pump();
        this.camera = new Camera(AssetManager.getImage(this.level.image).width, AssetManager.getImage(this.level.image).height, this.canvas.width, this.canvas.height);
        this.energybar = new EnergyBar(this.level.alex,this.level.walter);
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
        this.pump.draw(this.canvasContext);
            this.puzzleManager.draw(this.canvasContext);
            Physics.world.DrawDebugData();


        //Restore previous GL context
            this.canvasContext.restore();
            this.energybar.draw(this.canvasContext);
        
    }
}
