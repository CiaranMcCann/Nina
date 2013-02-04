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
///<reference path=Pump.ts"/>
///<reference path="Level.ts"/>
///<reference path="Platform.ts"/>

class Game
{

    canvas: HTMLCanvasElement;
    canvasContext: CanvasRenderingContext2D;
    camera: Camera;
    level: Level;
    pump: Pump;
    
    levelDataString = '{"platforms":[{"x":7,"y":674,"h":30,"w":430},{"x":407,"y":703,"h":1003,"w":30},{"x":407,"y":1706,"h":30,"w":1269},{"x":1646,"y":1736,"h":277,"w":30},{"x":1675,"y":1981,"h":30,"w":650},{"x":2296,"y":1641,"h":348,"w":30},{"x":2317,"y":1641,"h":30,"w":752},{"x":1977,"y":1953,"h":30,"w":331},{"x":2040,"y":1917,"h":37,"w":266},{"x":2089,"y":1876,"h":43,"w":211},{"x":2149,"y":1828,"h":59,"w":160},{"x":2200,"y":1774,"h":63,"w":111},{"x":2246,"y":1715,"h":69,"w":66}],"alex":{"x":2611,"y":1538},"walter":{"x":2392,"y":1538}}';

    constructor()
    {
        Graphics.init();

        //Create action canvas
        this.canvas = Graphics.createCanvas("action");

        //This is the GL context used to draw to the screen
        this.canvasContext = this.canvas.getContext("2d");

        Physics.init(this.canvasContext);

        this.camera = new Camera(AssetManager.getImage("level").width, AssetManager.getImage("level").height, this.canvas.width, this.canvas.height);
        this.level = new Level(this.levelDataString);
    }


    update()
    {
        this.level.update();
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
            this.pump.draw(this.canvasContext);
            this.level.draw(this.canvasContext);
            this.level.draw(this.canvasContext);
            Physics.world.DrawDebugData();

        //Restore previous GL context
        this.canvasContext.restore();

    }
}
