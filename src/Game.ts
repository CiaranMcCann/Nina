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
///<reference path="Coin.ts"/>
///<reference path="Platform.ts"/>

class Game
{

    canvas: HTMLCanvasElement;
    canvasContext: CanvasRenderingContext2D;
    walter: Walter;
    alex: Alex;
    camera: Camera;
    level: Level;
    
    levelDataString = '{"platforms":[{"x":6,"y":677,"h":30,"w":386},{"x":362,"y":704,"h":1017,"w":30},{"x":362,"y":1720,"h":30,"w":1309},{"x":1641,"y":1749,"h":270,"w":30},{"x":1641,"y":2013,"h":30,"w":673},{"x":2304,"y":1670,"h":372,"w":36},{"x":2336,"y":1670,"h":30,"w":580}]}';

    constructor()
    {
        Graphics.init();

        //Create action canvas
        this.canvas = Graphics.createCanvas("action");

        //This is the GL context used to draw to the screen
        this.canvasContext = this.canvas.getContext("2d");

        Physics.init(this.canvasContext);

        this.walter = new Walter(200,20);
        this.alex = new Alex(400,10);

        this.camera = new Camera(AssetManager.getImage("level").width, AssetManager.getImage("level").height, this.canvas.width, this.canvas.height);
        this.level = new Level(this.levelDataString);
    }


    update()
    {
        this.walter.update();
        this.alex.update();
        this.camera.update();
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
            AssetManager.getImage("level"),
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
            this.alex.draw(this.canvasContext);
            this.walter.draw(this.canvasContext);
            this.level.draw(this.canvasContext);
            Physics.world.DrawDebugData();

        //Restore previous GL context
        this.canvasContext.restore();

    }
}
