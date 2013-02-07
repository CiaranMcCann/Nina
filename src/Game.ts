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

class Game
{
    canvas: HTMLCanvasElement;
    canvasContext: CanvasRenderingContext2D;
    camera: Camera;
    energybar: EnergyBar;
    level: Level;
  
    

    levelDataString = '{"platforms":[{"x":3866,"y":1847,"h":40,"w":1629},{"x":3866,"y":1887,"h":36,"w":30},{"x":3770,"y":1919,"h":30,"w":126},{"x":3770,"y":1947,"h":68,"w":30},{"x":3683,"y":2009,"h":30,"w":117},{"x":3683,"y":2039,"h":60,"w":30},{"x":3595,"y":2097,"h":30,"w":118},{"x":3595,"y":2127,"h":57,"w":30},{"x":3509,"y":2184,"h":30,"w":116},{"x":3509,"y":2213,"h":59,"w":30},{"x":3421,"y":2271,"h":30,"w":118},{"x":3421,"y":2298,"h":45,"w":30},{"x":3059,"y":2343,"h":30,"w":392},{"x":1493,"y":1845,"h":30,"w":1578},{"x":3041,"y":1872,"h":501,"w":30},{"x":1464,"y":553,"h":1322,"w":30},{"x":1,"y":527,"h":30,"w":1493},{"x":5469,"y":0,"h":1887,"w":30},{"x":-10,"y":0,"h":556,"w":30},{"x":20,"y":-1,"h":30,"w":5449}],"alex":{"x":4999,"y":1737},"walter":{"x":4698,"y":1737},"waterCoins":[{"x":3165,"y":2298},{"x":2801,"y":1785}],"elecCoins":[{"x":3302,"y":2299},{"x":3438,"y":1630}],"fires":[],"poles":[{"x":3954,"y":1621},{"x":2967,"y":1624}],"pipes":[],"levelImage":"level_design_level_01_00"}';

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
        /*var midPoint = this.level.alex.body.GetPosition().Copy();
        midPoint.Subtract(this.level.walter.body.GetPosition());
        midPoint.Multiply(0.5);
        midPoint.Add(this.level.walter.body.GetPosition());
        midPoint.x = Physics.metersToPixels(midPoint.x);
        midPoint.y = Physics.metersToPixels(midPoint.y);
        this.camera.panToPosition(midPoint);*/

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
            if (Settings.DEVELOPMENT_MODE)
                Physics.world.DrawDebugData();


        //Restore previous GL context
            this.canvasContext.restore();
            this.energybar.draw(this.canvasContext);
      
        
    }
}
