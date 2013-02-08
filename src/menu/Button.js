var Button = (function () {
    function Button(position, text) {
        this.selected = false;
        this.image2 = AssetManager.getImage("button");
        this.image = AssetManager.getImage("highlightedbutton");
        this.position = position;
        this.text = text;
        this.offset = 0;
    }
    Button.prototype.Draw = function (ctx) {
        if(this.selected) {
            this.offset = -50;
            ctx.drawImage(this.image, this.position.x + this.offset, this.position.y);
        } else {
            this.offset = 0;
            ctx.drawImage(this.image2, this.position.x + this.offset, this.position.y);
        }
        ctx.fillStyle = "black";
        ctx.font = "Italic Bold 34pt Arial, sans-serif";
        ctx.fillText(this.text, this.position.x + this.image.width * 0.5 - 150 + this.offset, this.position.y + this.image.height * 0.5 + 15);
    };
    return Button;
})();
