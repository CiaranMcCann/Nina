

class ButtonBashing {

    // keyboard controls
    controls: any;
    private _hasCollision: bool = true;
    private _isAlive: bool = true;

    // the hertz value, between 0 and 100 (50 is the best)
    private _hertzValue: number;
    private _hertzDelta: number;
    private _currentTime: number;
    private _currentTime2: number;

    private _wearer: Player;
    private _onDone: Function;

    private _isButtonOneDown: bool;
    private _isButtonTwoDown: bool;

    private _percentage: number = 0;
    private _buttons: Sprite;

    private tubeWidth: number = 280;
    private tubeHeight: number;

    // the black bar enveloping the hertzbar
    private image;

    constructor(controls:any, wearer: Player)
    {
        this.controls = controls;
        this._wearer = wearer;

        this._hertzValue = 0;

        this._hertzDelta = 0;
        this._currentTime = new Date().getTime();
        this._currentTime2 = new Date().getTime();
        this._buttons = new Sprite(Sprites.animations.buttonsAlex);
        this.image = AssetManager.getImage("EmptyBar");
    }

    getPercentage(): number
    {
        return this._percentage;
    }

    SetOnDone(f: Function)
    {
        this._onDone = f;
    }

    draw(ctx)
    {
        if (!this._hasCollision || !this._isAlive) return;
        
        //------------------------------- HERTZ BAR ------------------------

        //Tube size
        var posX: number = Physics.metersToPixels(this._wearer.getBody().GetPosition().x);
        var posY: number = Physics.metersToPixels(this._wearer.getBody().GetPosition().y);
        var difX: number = 100;
        var difY: number = 100;

        //Tube size - continued
        this.tubeWidth = ctx.canvas.width * 0.15;
        this.tubeHeight = ctx.canvas.height * 0.05;        

        //Tube positions
        var hertzBarY = ctx.canvas.height - (ctx.canvas.height * 0.1);
        var hertzBarX = ctx.canvas.width * 0.05;
       
        //color gradient filling
        var grd = ctx.createLinearGradient(posX - (ctx.canvas.width * 0.065), 0, (posX - (ctx.canvas.width * 0.065)) + this.tubeWidth,0);
        grd.addColorStop(0, 'red');
        grd.addColorStop(0.25, 'yellow');
        grd.addColorStop(0.5, "green");
        grd.addColorStop(0.75, 'yellow');
        grd.addColorStop(1.00, 'red');

        //This is the base tube
        ctx.fillStyle = grd;
        ctx.fillRect(posX - (ctx.canvas.width * 0.065), posY - (ctx.canvas.height * 0.09), this.tubeWidth, this.tubeHeight);

        //Hertz
        ctx.fillStyle = "rgba(0, 0, 0, 255)";
       // Logger.log(this._hertzValue);
        ctx.fillRect((posX - (ctx.canvas.width * 0.065)) + this.tubeWidth / 2 + this._hertzValue, posY - (ctx.canvas.height * 0.09), 0.3, this.tubeHeight);
        //ideal: Math.abs(hertzvalue) <= 12.5

        //Adding the border around the bar
        ctx.drawImage(this.image, posX - (ctx.canvas.width * 0.068), posY - (ctx.canvas.height*0.1), this.tubeWidth*1.04, this.tubeHeight*1.5);

        // ------------- Percentage completion bar --------------------
        var thisIsHorribleX = 0.9835;
        //color gradient filling
        var grd2 = ctx.createLinearGradient(posX * thisIsHorribleX, 0, posX + 100, 0);
        grd2.addColorStop(0, 'red');
        grd2.addColorStop(0.50, 'yellow');
        grd2.addColorStop(1.00, 'green');

        //This is the base tube 
        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        ctx.fillRect(posX - (ctx.canvas.width * 0.0125), posY - (ctx.canvas.height * 0.115), 100, this.tubeHeight * 0.475);

        //This is the filling
        ctx.fillStyle = grd2;
        ctx.fillRect(posX - (ctx.canvas.width * 0.0125), posY - (ctx.canvas.height * 0.115), this._percentage, this.tubeHeight * 0.475);
        
        //Adding the border around the thing
        ctx.drawImage(this.image, posX - (ctx.canvas.width * 0.0145), posY - (ctx.canvas.height * 0.12), 105 , this.tubeHeight * 0.65);
        

        //Get position of the physics body and convert it to pixel cordinates
        
        ctx.save();
        //ctx.translate(posX, posY);

        this._buttons.draw(ctx, posX - difX, posY - ( difY + 100 ));

        ctx.restore()
    }


    update(hasCollision)
    {
        this._hasCollision = hasCollision;
        if (!this._hasCollision || !this._isAlive) return;
        // changing the interval to 1 second
        var newTime: number = new Date().getTime();
        //if(this._hertzValue < -200 || this._hertzValue > 200) return; 

        if (newTime - this._currentTime >= 500)
        {
            //change the delta
            this._currentTime = newTime;
            this._hertzDelta = Math.random( ) > 0.5 ? -0.25 : 0.25;
        }

        var newTime2: number = new Date().getTime();
        // increasing the way the increase increases
        if (newTime2 - this._currentTime2 >= 100)
        {
            this._hertzDelta *= 1.5;
            this._currentTime2 = newTime2;
        }
      
        this._hertzValue += this._hertzDelta;

        // The player influencing the bar positively
        if (keyboard.isKeyDown(this.controls.positive)) {
            if (!this._isButtonOneDown) {
                this._hertzValue += 15
                this._isButtonOneDown = true;
            }
        }
        else {
            this._isButtonOneDown = false;
        }

        // The player influencing the bar negatively
        if (keyboard.isKeyDown(this.controls.negative)) {
            if (!this._isButtonTwoDown) {
                this._hertzValue -= 15;
                this._isButtonTwoDown = true;
            }
        } else {
            this._isButtonTwoDown = false;
        }
               
        this._hertzValue = Math.max(this._hertzValue, -(this.tubeWidth / 2));
        this._hertzValue = Math.min(this._hertzValue, this.tubeWidth / 2);
               
        if (Math.abs(this._hertzValue) <= 35) {
            this._percentage += 0.25;
        } else { this._percentage -= 1; this._percentage = Math.max(this._percentage, 0); }
        if (this._percentage >= 100)
        {
            this._onDone(); this._isAlive = false;
        }
        this._buttons.update();
    }
}