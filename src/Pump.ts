///<reference path="animation/Sprite.ts"/>
///<reference path="system/Utilies.ts">

class Pump {
    // animated image (CURRENTLY NOT USED)
    private sprite: Sprite;

    // is the pump running
    private runPump: bool;

    // rotation
    private angle: number;

    constructor {
        this.runPump = true;
        this.angle = 0;
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (this.runPump) {
            // increasing the angle
            this.angle++;

            // save the current co-ordinate system before we screw with it
            ctx.save();

            // move to the middle of where we want to draw our image
            ctx.translate(400, 400);

            // rotate around that point, converting our angle from degrees to radians
            ctx.rotate(Utilies.toRadians(this.angle));

            // draw it up and to the left by half the width and height of the image
            var image = AssetManager.getImage("PLACEHOLDERpump");
            ctx.drawImage(image, -(image.width / 2), -(image.height / 2));

            // and restore the co-ords to how they were when we began
            ctx.restore();
        }
        else {
            // freeze the image
            ctx.drawImage(AssetManager.getImage("PLACEHOLDERpump"), 400, 400);
        }
    }

    pumpState(state) {
        this.runPump = state;
    }
}