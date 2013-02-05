class EnergyBar
{
    alexReference: Alex;
    walterReference: Walter;

    constructor(alex, walter)
    {
        this.alexReference = alex;
        this.walterReference = walter;
    }

    draw(ctx : CanvasRenderingContext2D)
    {
        var AlexEnergy = this.alexReference.getEnergy();
        var WalterEnergy = this.walterReference.getEnergy();
        
        //Tube size
        var tubeWidth = ctx.canvas.width * 0.15;
        var tubeHeight = ctx.canvas.height * 0.05;

        //Tube positions
        var WalterTubeY = ctx.canvas.height - (ctx.canvas.height * 0.1);
        var WalterTubeX = ctx.canvas.width*0.05;

        var prsntEnergyWalter = WalterEnergy / 100 * tubeWidth;
        var prsntEnergyAlex = AlexEnergy / 100 * tubeWidth;
        

        // THIS IS FOR WALTER ------------------------------------------------------------------
        
        //Tube positions
        var WalterTubeY = ctx.canvas.height - (ctx.canvas.height * 0.1);
        var WalterTubeX = ctx.canvas.width * 0.05;

        //color gradient filling
        var grd = ctx.createLinearGradient(0, WalterTubeY+tubeHeight, 0, WalterTubeY);
        grd.addColorStop(0.5, '#00f');
        grd.addColorStop(0.7, "#306EFF");
        grd.addColorStop(0.90, '#00f');

        //This is the base tube
        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        ctx.fillRect(WalterTubeX, WalterTubeY, tubeWidth, tubeHeight);

        //This is the filling
        ctx.fillStyle = grd;
        ctx.fillRect(WalterTubeX, WalterTubeY, prsntEnergyWalter, tubeHeight);

        //Alex bar image
        ctx.drawImage(AssetManager.getImage("FirstWalterBar"), WalterTubeX - (ctx.canvas.width * 0.036), WalterTubeY - (ctx.canvas.height * 0.049), tubeWidth * 1.27, tubeHeight * 2.6);

        // THIS IS FOR ALEX ------------------------------------------------------------------

        
        //Tube positions
        var AlexTubeY = ctx.canvas.height - (ctx.canvas.height * 0.2);
        var AlexTubeX = ctx.canvas.width * 0.05;

        

        //color gradient filling
        var grd2 = ctx.createLinearGradient(0, AlexTubeY+tubeHeight, 0, AlexTubeY);
        grd2.addColorStop(0.5, '#FDD017');
        grd2.addColorStop(0.7, "#FFFF49");
        grd2.addColorStop(0.90, '#FDD017');

        //This is the base tube
        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        ctx.fillRect(AlexTubeX, AlexTubeY, tubeWidth, tubeHeight);

        //This is the filling
        ctx.fillStyle = grd2;
        ctx.fillRect(AlexTubeX, AlexTubeY, prsntEnergyAlex, tubeHeight);

        //Alex bar image
        ctx.drawImage(AssetManager.getImage("FirstAlexBar"), AlexTubeX - (ctx.canvas.width * 0.036), AlexTubeY - (ctx.canvas.height * 0.05), tubeWidth*1.3, tubeHeight * 2.8);

    }

}