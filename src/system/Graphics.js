var PreRenderer = (function () {
    function PreRenderer() { }
    PreRenderer.prototype.createPreRenderCanvas = function (width, height) {
        var bufferCanvas = document.createElement('canvas');
        bufferCanvas.width = width;
        bufferCanvas.height = height;
        return bufferCanvas.getContext("2d");
    };
    PreRenderer.prototype.render = function (drawFunc, width, height, canvas) {
        if (typeof canvas === "undefined") { canvas = null; }
        width += 2;
        height += 2;
        var ctx;
        if(canvas) {
            ctx = canvas.getContext('2d');
        } else {
            ctx = this.createPreRenderCanvas(width, height);
            ctx.translate(1, 1);
        }
        drawFunc(ctx);
        return ctx.canvas;
    };
    PreRenderer.prototype.renderAnimation = function (drawFuncsCollection, width, height) {
        var ctx = this.createPreRenderCanvas(width, height);
        for(var i in drawFuncsCollection) {
            drawFuncsCollection[i].call(ctx);
            ctx.translate(0, height);
        }
        return ctx.canvas;
    };
    return PreRenderer;
})();
var Graphics;
(function (Graphics) {
    Graphics.stats;
    Graphics.preRenderer = new PreRenderer();
    function init() {
 {
            Graphics.stats = new Stats();
            Graphics.stats.domElement.style.position = 'absolute';
            Graphics.stats.domElement.style.left = '0px';
            Graphics.stats.domElement.style.top = '0px';
            document.body.appendChild(Graphics.stats.domElement);
        }
        window.requestAnimationFrame = (function () {
            return window.requestAnimationFrame || (window).webkitRequestAnimationFrame || (window).mozRequestAnimationFrame || (window).oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback, element) {
                window.setTimeout(callback, 1000 / 60);
                return 1;
            };
        })();
    }
    Graphics.init = init;
    function roundRect(ctx, x, y, w, h, r) {
        if(w < 2 * r) {
            r = w / 2;
        }
        if(h < 2 * r) {
            r = h / 2;
        }
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
        return ctx;
    }
    Graphics.roundRect = roundRect;
    function createCanvas(name) {
        var canvas = document.createElement('canvas');
        canvas.id = name;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = "absolute";
        canvas.style.left = "0px";
        canvas.style.top = "0px";
        window.document.body.appendChild(canvas);
        $('body').on('contextmenu', "#" + name, function (e) {
            return false;
        });
        window.onresize = function () {
        };
        return canvas;
    }
    Graphics.createCanvas = createCanvas;
})(Graphics || (Graphics = {}));
