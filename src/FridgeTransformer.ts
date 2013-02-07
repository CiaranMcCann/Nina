///<reference path="Transformer.ts"/>
///<reference path="Fridge.ts"/>
///<reference path="Pump.ts"/>


class FridgeTransformer extends Transformer {

   

    constructor(x: number, y: number, buttonBashing: ButtonBashing) {
        super(x, y,buttonBashing);
        
        //  this.pump = new Fridge(x - 300, y);
        this.pump = new Fridge(x - 150, y+20 );
        this.powerUp = 100;
        
    }


    update() {
     
        if (this.mashedPotatoes) {
            this.electrifiedAlex.update();
        }
    }


    beginContact(contact) {
        var a = contact.GetFixtureA().GetBody().GetUserData();
        var b = contact.GetFixtureB().GetBody().GetUserData();

        // checking to see if Alex is near the transformer
        if (a instanceof Alex || b instanceof Alex) {
            this.pump.pumpState(true);
            this.mashedPotatoes = true;

        }
    }


    endContact(contact) {
        var a = contact.GetFixtureA().GetBody().GetUserData();
        var b = contact.GetFixtureB().GetBody().GetUserData();

        // checking to see if Alex is near the transformer
        if (a instanceof Alex || b instanceof Alex) {
            this.pump.pumpState(false);
            this.mashedPotatoes = false;
             GameInstance.level.alex.setCanDraw(true);
        }
    };




}