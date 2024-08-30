let canvas,graphic;
let gridSize,len;
let grid = [];
let lineObjects = [];

//ラインクラス
class Line{
    constructor(x1,y1,x2,y2,len,lineWidth,gridX,gridY){
        this.x1 = x1*len+lineWidth;
        this.y1 = y1*len+lineWidth;
        this.x2 = x2*len+lineWidth;
        this.y2 = y2*len+lineWidth;
        this.len = len;
        this.gridX = gridX; //grid配列内でのインデックス
        this.gridY = gridY;
        this.lineWidth = lineWidth;
        this.color_0 = "black";
        this.color_1 = "blue";
    }

    //描画
    draw(){
        graphic.beginPath();
        graphic.lineWidth = this.lineWidth;
        let color;
        if(grid[this.gridY][this.gridX]==0){
            color = this.color_0;
        }
        else{
            color = this.color_1;
        }
        graphic.strokeStyle = color;
        graphic.moveTo(this.x1,this.y1);
        graphic.lineTo(this.x2,this.y2);
        graphic.stroke();
    }

    //クリック判定
    hit(pointer){   
        let center = {
            x: (this.x1+this.x2)/2,
            y: (this.y1+this.y2)/2
        }
        let d = Math.pow(center.x - pointer.x, 2) + Math.pow(center.y - pointer.y, 2)
        if(d<=Math.pow(this.len/2, 2)){
            this.color_0 = "silver";
            this.color_1 = "SkyBlue";
            return true;
        }
        this.color_0 = "black";
        this.color_1 = "blue";
        return false;
    }
}

onload = function(){
    canvas = document.getElementById("Slitherlink");
    graphic = canvas.getContext("2d");
    //初期化
    init();
    //入力処理
    document.onclick = click;
    document.onmousemove = mousemove;
    setInterval("gameloop()",16);
}

function init(){
    grid = [[0,1,0,1,0,1,0,1,0,1,0],
            [1,0,1,0,1,0,1,0,1,0,1],
            [0,1,0,1,0,1,0,1,0,1,0],
            [1,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            ];
    gridSize = 5;
    len = 40;
    generate_grid();
}

//格子を配置
function generate_grid(){
    for(let y=0;y<grid.length;y++){
        for(let x=0;x<grid[y].length;x++){
            if(y%2==0&&(x+y)%2==1){
                if(grid[y][x]==1){
                    let line = new Line((x-1),y,(x+1),y,len,5,x,y);
                    lineObjects.push(line);
                }
                else{
                    let line = new Line((x-1),y,(x+1),y,len,5,x,y);
                    lineObjects.push(line);
                }
            }
            if(y%2==1&&(x+y)%2==1){
                if(grid[y][x]==1){
                    let line = new Line(x,(y-1),x,(y+1),len,5,x,y);
                    lineObjects.push(line);
                }
                else{
                    let line = new Line(x,(y-1),x,(y+1),len,5,x,y);
                    lineObjects.push(line);
                }
            }
        }
    }
}

//格子を描画
function draw_grid(){
    for(let line of lineObjects){
        line.draw();
    }
}

function draw_point(){
    for(let line of lineObjects){
        graphic.strokeStyle = "black";
        graphic.fillStyle = "white"
        graphic.lineWidth = 5;
        let r = 3;

        graphic.beginPath();
        graphic.arc(line.x1, line.y1, r, 0, 2 * Math.PI);
        graphic.arc(line.x2, line.y2, r, 0, 2 * Math.PI);
        graphic.closePath();
        graphic.fill();
    }
}

function update(){

}

//クリック処理
function click(e){
    const rect = canvas.getBoundingClientRect();
    const pointer = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
    for(let line of lineObjects){
        if(line.hit(pointer)){
            if(grid[line.gridY][line.gridX]==1){
                grid[line.gridY][line.gridX] = 0;
            }
            else{
                grid[line.gridY][line.gridX] = 1;
            } 
        }
    }
}

//マウスの座標を取得
function mousemove(e){
    const rect = canvas.getBoundingClientRect();
    const pointer = {
        x: e.offsetX,
        y: e.offsetY
    };
    for(let line of lineObjects){
        if(line.hit(pointer)){
            console.log(pointer.x)
        }
    }
}

function gameloop(){
    update();
    draw_grid();
    draw_point();
}