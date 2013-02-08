///<reference path="../system/AssetManager.ts"/>
///<reference path="Button.ts"/>
class StartMenu {

    private backgroundImage;
    private startButton;
    private optionButton;
    private aboutButton;
    private alexWalterimage;
    public selectedcount: number;
    public position;
    private mayPlay: bool;


    constructor() {
        this.position = new b2Vec2((window.innerWidth / 2) - 400, (window.innerHeight / 2) - 400);
       
        this.backgroundImage = AssetManager.getImage("Menu");
        this.alexWalterimage = AssetManager.getImage("walteralex");
        this.startButton = new Button(new b2Vec2(150 + this.position.x, 150 + this.position.y),"start");
        this.optionButton = new Button(new b2Vec2(150 + this.position.x, 250 + this.position.y),"options");
        this.aboutButton = new Button(new b2Vec2(150 + this.position.x, 350 + this.position.y),"about");
        
        this.selectedcount = 0;

        this.mayPlay = false
        this.ChooseSelected(0);
    }


    ChooseSelected(index: number) {
        this.mayPlay = true;
        this.selectedcount += index;
        if (this.selectedcount < 0) {
            this.mayPlay = false;
            this.selectedcount = 0;
         }

        if (this.selectedcount > 2) {
            this.selectedcount = 2;
            this.mayPlay = false;
        }

        if (this.mayPlay) {
        }
        switch (this.selectedcount) {

            case 0:
                this.startButton.selected = true;
                this.optionButton.selected = false;
                this.aboutButton.selected = false;
                break;
            case 1:
                this.startButton.selected = false;
                this.optionButton.selected = true;
                this.aboutButton.selected = false;
                break;

            case 2:
                this.startButton.selected = false;
                this.optionButton.selected = false;
                this.aboutButton.selected = true;
                break;
        }
    }

    Draw(ctx:CanvasRenderingContext2D) {

        ctx.fillStyle = "White";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(this.backgroundImage, this.position.x, this.position.y);
        
        this.startButton.Draw(ctx);
        this.optionButton.Draw(ctx);
        this.aboutButton.Draw(ctx);
        
        ctx.drawImage(this.alexWalterimage, 60+this.position.x, 30+this.position.y);
    }

}