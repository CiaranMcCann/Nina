///<reference path="animation/Sprite.ts"/>
///<reference path="system/Utilies.ts">

class Pump {

    // is the pump running
    private runPump: bool;

    // rotation
    private angle: number;

    // image
    private image;

    x: number;
    y: number;

    constructor(x,y) {

        this.x = x;
        this.y = y;
        this.runPump = false;
        this.angle = 0;
        this.image = AssetManager.getImage("Propeller");
    }

    draw(ctx: CanvasRenderingContext2D) {

        if (this.isPumpOn()) {

            // increasing the angle
            this.angle++;

            // save the current co-ordinate system before we screw with it
            ctx.save();

            // move to the middle of where we want to draw our image
            ctx.translate(this.x, this.y);

            // rotate around that point, converting our angle from degrees to radians
            ctx.rotate(Utilies.toRadians(this.angle));

            // draw it up and to the left by half the width and height of the image
            //this.image = AssetManager.getImage("PLACEHOLDERpump");
            ctx.drawImage(this.image, -(this.image.width / 2), -(this.image.height / 2));

            // and restore the co-ords to how they were when we began
            ctx.restore();
        }
        else {
            // freeze the image
            ctx.drawImage(this.image, -(this.image.width / 2) + this.x, -(this.image.height / 2) + this.y);
            //console.log("Drawing still image because the bool is " + this.runPump);
        }
    }

    pumpState(state) {
        this.runPump = state;
        console.log("The pump is now " + this.runPump);
    }

    isPumpOn() {
        return this.runPump;
    }
}