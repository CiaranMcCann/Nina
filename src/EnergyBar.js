var EnergyBar = (function () {
    function EnergyBar(alex, walter) {
        this.alexReference = alex;
        this.walterReference = walter;
    }
    EnergyBar.prototype.draw = function (ctx) {
        var AlexEnergy = this.alexReference.getEnergy();
        var WalterEnergy = this.walterReference.getEnergy();
        var tubeWidth = ctx.canvas.width * 0.15;
        var tubeHeight = ctx.canvas.height * 0.05;
        var WalterTubeY = ctx.canvas.height - (ctx.canvas.height * 0.1);
        var WalterTubeX = ctx.canvas.width * 0.05;
        var prsntEnergyWalter = WalterEnergy / 100 * tubeWidth;
        var prsntEnergyAlex = AlexEnergy / 100 * tubeWidth;
        var WalterTubeY = ctx.canvas.height - (ctx.canvas.height * 0.1);
        var WalterTubeX = ctx.canvas.width * 0.05;
        var grd = ctx.createLinearGradient(0, WalterTubeY + tubeHeight, 0, WalterTubeY);
        grd.addColorStop(0.5, '#00f');
        grd.addColorStop(0.7, "#306EFF");
        grd.addColorStop(0.9, '#00f');
        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        ctx.fillRect(WalterTubeX, WalterTubeY, tubeWidth, tubeHeight);
        ctx.fillStyle = grd;
        ctx.fillRect(WalterTubeX, WalterTubeY, prsntEnergyWalter, tubeHeight);
        ctx.drawImage(AssetManager.getImage("FirstWalterBar"), WalterTubeX - (ctx.canvas.width * 0.036), WalterTubeY - (ctx.canvas.height * 0.049), tubeWidth * 1.27, tubeHeight * 2.6);
        var AlexTubeY = ctx.canvas.height - (ctx.canvas.height * 0.2);
        var AlexTubeX = ctx.canvas.width * 0.05;
        var grd2 = ctx.createLinearGradient(0, AlexTubeY + tubeHeight, 0, AlexTubeY);
        grd2.addColorStop(0.5, '#FDD017');
        grd2.addColorStop(0.7, "#FFFF49");
        grd2.addColorStop(0.9, '#FDD017');
        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        ctx.fillRect(AlexTubeX, AlexTubeY, tubeWidth, tubeHeight);
        ctx.fillStyle = grd2;
        ctx.fillRect(AlexTubeX, AlexTubeY, prsntEnergyAlex, tubeHeight);
        ctx.drawImage(AssetManager.getImage("FirstAlexBar"), AlexTubeX - (ctx.canvas.width * 0.036), AlexTubeY - (ctx.canvas.height * 0.05), tubeWidth * 1.3, tubeHeight * 2.87);
    };
    return EnergyBar;
})();
