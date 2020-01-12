var Riktning;
(function (Riktning) {
    Riktning[Riktning["upp"] = 0] = "upp";
    Riktning[Riktning["h\u00F6ger"] = 1] = "h\u00F6ger";
    Riktning[Riktning["ner\u00E5t"] = 2] = "ner\u00E5t";
    Riktning[Riktning["v\u00E4nster"] = 3] = "v\u00E4nster";
})(Riktning || (Riktning = {}));
var drawInfo = {
    cellW: 15,
    cellH: 15,
    cellStartX: 0,
    cellStartY: 0
};
var Mask = /** @class */ (function () {
    function Mask(startpos, riktning) {
        this.ps = [startpos];
        this.ps.push({ x: startpos.x - 1, y: startpos.y });
        this.ps.push({ x: startpos.x - 2, y: startpos.y });
        this.ps.push({ x: startpos.x - 3, y: startpos.y });
        this.ps.push({ x: startpos.x - 3, y: startpos.y + 1 });
        this.ps.push({ x: startpos.x - 4, y: startpos.y + 1 });
        this.rik = riktning;
    }
    Mask.prototype.Draw = function (context) {
        for (var i = 0; i < this.ps.length; i++) {
            var p = this.ps[i];
            context.beginPath();
            var x = drawInfo.cellStartX + p.x * drawInfo.cellW;
            var y = drawInfo.cellStartY + p.y * drawInfo.cellH;
            context.rect(x, y, drawInfo.cellW, drawInfo.cellH);
            if (i === 0) {
                context.fillStyle = 'green';
            }
            else {
                context.fillStyle = 'blue';
            }
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = 'red';
            context.stroke();
        }
    };
    return Mask;
}());
var Frukt = /** @class */ (function () {
    function Frukt(startpos) {
        this.pos = startpos;
    }
    Frukt.prototype.Draw = function (context) {
    };
    return Frukt;
}());
var World = /** @class */ (function () {
    function World(players, width, height) {
        this.width = width;
        this.height = height;
        if (players === 1) {
            this.maskar = [
                new Mask({ x: Math.trunc(width * 0.25), y: Math.trunc(height / 2) }, Riktning.höger)
            ];
        }
        else if (players === 2) {
            this.maskar = [
                new Mask({ x: Math.trunc(width * 0.25), y: Math.trunc(height / 2) }, Riktning.höger),
                new Mask({ x: Math.trunc(width * 0.75), y: Math.trunc(height / 2) }, Riktning.vänster)
            ];
        }
    }
    World.prototype.Draw = function (context) {
        // Töm spelplanen
        context.beginPath();
        context.rect(0, 0, 900, 300);
        context.fillStyle = 'black';
        context.fill();
        // Rita maskarna
        for (var _i = 0, _a = this.maskar; _i < _a.length; _i++) {
            var m = _a[_i];
            m.Draw(context);
        }
    };
    return World;
}());
var W = new World(1, 60, 20);
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
W.Draw(context);
