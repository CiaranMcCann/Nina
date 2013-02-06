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
    

    levelDataString = '{"platforms":[{"x":3777,"y":1899,"h":30,"w":1097},{"x":3777,"y":1928,"h":494,"w":30},{"x":2974,"y":2421,"h":30,"w":833},{"x":2953,"y":1938,"h":513,"w":30},{"x":3340,"y":2338,"h":85,"w":89},{"x":3429,"y":2251,"h":87,"w":87},{"x":3515,"y":2163,"h":97,"w":93},{"x":3603,"y":2077,"h":90,"w":88},{"x":3690,"y":1989,"h":98,"w":91},{"x":1399,"y":1938,"h":32,"w":1565},{"x":1376,"y":1687,"h":283,"w":30}],"alex":{"x":4330,"y":1799},"walter":{"x":4494,"y":1799},"waterCoins":[{"x":2491,"y":1908}],"waterCoins":[{"x":3379,"y":2100}],"elecCoins":[{"x":3379,"y":1657}],"fires":[],"poles":[{"x":2889,"y":1738},{"x":3840,"y":1699}],"pipes":[{"x":2581,"y":1900}, {"x":4035,"y":1862}],"levelImage":"level_design_level_01_00_front"}';

    constructor()
    {
        Graphics.init();

        //Create action canvas
        this.canvas = Graphics.createCanvas("action");

        //This is the GL context used to draw to the screen
        this.canvasContext = this.canvas.getContext("2d");

        Physics.init(this.canvasContext);

 
        this.level = new Level(this.levelDataString);
      
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
       

        if (!Settings.DEVELOPMENT_MODE)
        {

            this.canvasContext.drawImage(
                AssetManager.getImage("level_design_level_01_00_back"),
                this.camera.getX(),
                this.camera.getY(),
                this.canvas.width,
                this.canvas.height,
                0,
                0,
                this.canvas.width,
                this.canvas.height
           );


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
        }

        // Saving the GL context here
        this.canvasContext.save();

        //Modifying the GL context here, by translating the origin 
        this.canvasContext.translate(-this.camera.getX(), -this.camera.getY());

        //Draw all entities here
            
            this.level.draw(this.canvasContext);
            //Physics.world.DrawDebugData();


        //Restore previous GL context
            this.canvasContext.restore();
            this.energybar.draw(this.canvasContext);
      
        
    }
}
