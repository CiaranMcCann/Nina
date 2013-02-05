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
///<reference path="Pump.ts"/>
///<reference path="Level.ts"/>
///<reference path="Platform.ts"/>
///<reference path="Transformer.ts" />

class Game
{
    canvas: HTMLCanvasElement;
    canvasContext: CanvasRenderingContext2D;
    camera: Camera;
    energybar: EnergyBar;
    level: Level;
    pump: Pump;
    

    levelDataString = '{"platforms":[{"x":-1,"y":618,"h":30,"w":1407},{"x":1376,"y":647,"h":1321,"w":30},{"x":1406,"y":1938,"h":30,"w":1575},{"x":2951,"y":1965,"h":490,"w":30},{"x":2978,"y":2424,"h":30,"w":365},{"x":3341,"y":2338,"h":86,"w":87},{"x":3428,"y":2251,"h":88,"w":89},{"x":3516,"y":2164,"h":89,"w":87},{"x":3602,"y":2076,"h":89,"w":94},{"x":3689,"y":1988,"h":91,"w":88},{"x":3776,"y":1899,"h":91,"w":1109}],"alex":{"x":4518,"y":1780},"walter":{"x":4644,"y":1780},"waterCoins":[{"x":3736,"y":1950}],"elecCoins":[{"x":3393,"y":1656}],"fires":[{"x":1817,"y":1929}],"poles":[{"x":3948,"y":1799},{"x":2901,"y":1838}],"levelImage":"level_design_level_01_00_front"}';

    constructor()
    {
        Graphics.init();

        //Create action canvas
        this.canvas = Graphics.createCanvas("action");

        //This is the GL context used to draw to the screen
        this.canvasContext = this.canvas.getContext("2d");

        Physics.init(this.canvasContext);

 
        this.level = new Level(this.levelDataString);
        this.pump = new Pump();
        this.camera = new Camera(AssetManager.getImage(this.level.image).width, AssetManager.getImage(this.level.image).height, this.canvas.width, this.canvas.height);
        this.energybar = new EnergyBar(this.level.alex,this.level.walter);
    }

    update()
    {
        this.level.update();
        this.camera.update();

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
            Physics.world.DrawDebugData();


        //Restore previous GL context
            this.canvasContext.restore();
            this.energybar.draw(this.canvasContext);
        
    }
}
