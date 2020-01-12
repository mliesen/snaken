interface Position {
    x: number;
    y: number;
}
enum Riktning { upp, höger, neråt, vänster }

let drawInfo = {
    cellW: 15,
    cellH: 15,
    cellStartX: 0,
    cellStartY: 0
}

class Mask {
    ps: Position[];   // index=0 huvud
    rik: Riktning;
    constructor(startpos: Position, riktning: Riktning) {
        this.ps = [startpos];
        this.ps.push({ x: startpos.x - 1, y: startpos.y });
        this.ps.push({ x: startpos.x - 2, y: startpos.y });
        this.ps.push({ x: startpos.x - 3, y: startpos.y });
        this.ps.push({ x: startpos.x - 3, y: startpos.y + 1 });
        this.ps.push({ x: startpos.x - 4, y: startpos.y + 1 });
        this.rik = riktning;
    }
    Draw(context: CanvasRenderingContext2D) {
        for (var i = 0; i < this.ps.length; i++) {
            let p = this.ps[i];
            context.beginPath();
            let x = drawInfo.cellStartX + p.x * drawInfo.cellW;
            let y = drawInfo.cellStartY + p.y * drawInfo.cellH;
            context.rect(x, y, drawInfo.cellW, drawInfo.cellH);
            if (i === 0) {
                context.fillStyle = 'green';
            } else {
                context.fillStyle = 'blue';
            }
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = 'red';
            context.stroke();
        }
    }
}
class Frukt {
    pos: Position;
    constructor(startpos: Position) {
        this.pos = startpos;
    }
    Draw(context: CanvasRenderingContext2D) {

    }
}

class World {
    width: number;
    height: number;
    masker: Mask[];
    frukter: Frukt[];
    constructor(players: number, width: number, height: numver) {
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
    Draw(context: CanvasRenderingContext2D) {
        // Töm spelplanen
        context.beginPath();
        context.rect(0, 0, 900, 300);
        context.fillStyle = 'black';
        context.fill();
        // Rita maskarna
        for (var m of this.maskar) {
            m.Draw(context);
        }

    }
}

var W = new World(1, 60, 20);
var canvas = document.getElementById('myCanvas');
var context: CanvasRenderingContext2D = canvas.getContext('2d');
W.Draw(context);
