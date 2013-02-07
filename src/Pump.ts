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
        this.angle = 0;
        this.image = AssetManager.getImage("Propeller");
    }

    draw(ctx: CanvasRenderingContext2D) {
        // save the current co-ordinate system before we screw with it
        ctx.save();

        // move to the middle of where we want to draw our image
        ctx.translate(this.x, this.y);
        ctx.scale(0.5, 0.5);
        if (this.isPumpOn()) {
            // increasing the angle
            this.angle+=10;
            // rotate around that point, converting our angle from degrees to radians
            ctx.rotate(Utilies.toRadians(this.angle));
        }

        // draw it up and to the left by half the width and height of the image
        //this.image = AssetManager.getImage("PLACEHOLDERpump");
        ctx.drawImage(this.image, -(this.image.width / 2), -(this.image.height / 2));

        // and restore the co-ords to how they were when we began
        ctx.restore();
    }

    pumpState(state) {
        this.runPump = state;
    }

    isPumpOn() {
        return this.runPump;
    }
}