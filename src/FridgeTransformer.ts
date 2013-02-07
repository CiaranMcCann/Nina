///<reference path="Transformer.ts"/>
///<reference path="Fridge.ts"/>


class FridgeTransformer extends Transformer {

    constructor(x: number, y: number) {
        super(x, y);

        this.pump = new Fridge(x - 300, y);
    }




}