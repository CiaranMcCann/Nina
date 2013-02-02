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

class Game
{

    canvas : HTMLCanvasElement ;
    canvasContext : CanvasRenderingContext2D;
    walter: Walter;
    alex: Alex;

    constructor()
    {
        Graphics.init();

        //Create action canvas
        this.canvas = Graphics.createCanvas("action");
        this.canvasContext = this.canvas.getContext("2d");

        Physics.init(this.canvasContext);
        this.demo();

        this.walter = new Walter();
        this.alex = new Alex();
    }


    update()
    {
        this.walter.update();
        this.alex.update();
    }

    step()
    {    
        Physics.world.Step((1 / 60), 10, 10);
        Physics.world.DrawDebugData();
    }

    draw()
    {
       //this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
       this.canvasContext.fillStyle = "red";
       this.canvasContext.fillRect(800, 500, 100, 100);
       //this.canvasContext.drawImage(AssetManager.getImage("placeHolderImage") ,20,20);

       this.alex.draw(this.canvasContext);
       this.walter.draw(this.canvasContext);

    }

    demo()
    {
        var canvas = this.canvas;
        		  // Create static ground
		  var bounds = 20;
		  var fixDef = new b2FixtureDef;
		  fixDef.density = 1.0;
		  fixDef.friction = 1.0;
		  fixDef.restitution = 0.2;
		  fixDef.shape = new b2PolygonShape;

		  var bodyDef = new b2BodyDef;
		  bodyDef.type = b2Body.b2_staticBody;

		  //bottom wall
		  fixDef.shape.SetAsBox(canvas.width / Physics.worldScale, 0);
		  bodyDef.position.x = 0;
		  bodyDef.position.y = canvas.height / Physics.worldScale;
		  Physics.world.CreateBody(bodyDef).CreateFixture(fixDef);

		  //left wall
		  fixDef.shape.SetAsBox(bounds / Physics.worldScale, canvas.height / Physics.worldScale);
		  bodyDef.position.x = bounds*-1/Physics.worldScale;
		  bodyDef.position.y = 0;
		  Physics.world.CreateBody(bodyDef).CreateFixture(fixDef);

		  //right wall
		  fixDef.shape.SetAsBox(0, canvas.height / Physics.worldScale);
		  bodyDef.position.x = canvas.width / Physics.worldScale;
		  bodyDef.position.y = 0;
		  Physics.world.CreateBody(bodyDef).CreateFixture(fixDef);

		   //top wall
		  fixDef.shape.SetAsBox(canvas.width / Physics.worldScale, bounds / Physics.worldScale);
		  bodyDef.position.x = 0;
		  bodyDef.position.y = bounds*-1/Physics.worldScale;
		  Physics.world.CreateBody(bodyDef).CreateFixture(fixDef);


      var fixDef = new b2FixtureDef;
      fixDef.density = 1.0;
      fixDef.friction = 1.0;
      fixDef.restitution = 0.0;
      fixDef.shape = new b2PolygonShape;

        //create some objects
      var bodyDef = new b2BodyDef;
      bodyDef.type = b2Body.b2_dynamicBody;
      for (var i = 0; i < 20; ++i) {
        if (Math.random() > 0.5) {
          fixDef.shape = new b2PolygonShape;
          fixDef.shape.SetAsBox(
          Math.random() + 0.1 //half width
          ,
          Math.random() + 0.1 //half height
          );
        } else {
          fixDef.shape = new b2CircleShape(
          Math.random() + 0.1 //radius
          );
        }
        bodyDef.position.x = Math.random() * 25;
        bodyDef.position.y = Math.random() * 10;
        Physics.world.CreateBody(bodyDef).CreateFixture(fixDef);
    }

    }

}
