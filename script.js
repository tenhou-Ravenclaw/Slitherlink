let canvas,graphic;
let gridSize,len;

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
    }

    draw(color){
        graphic.beginPath();
        graphic.lineWidth = this.lineWidth;
        graphic.strokeStyle = color;
        graphic.moveTo(this.x1,this.y1);
        graphic.lineTo(this.x2,this.y2);
        graphic.stroke();
    }

    hit(pointer){   
        let center = {
            x: (this.x1+this.x2)/2,
            y: (this.y1+this.y2)/2
        }
        let d = Math.pow(center.x - pointer.x, 2) + Math.pow(center.y - pointer.y, 2)
        if(d<=Math.pow(this.len/2, 2)){
            console.log(this.gridX,this.gridY)
            return true;
        }
        return false;
    }
}

let grid = [];
let lineObjects = [];
onload = function(){
    canvas = document.getElementById("Slitherlink");
    graphic = canvas.getContext("2d");
    //初期化
    init();
    //入力処理
    // document.onkeydown = keydown;
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
        if(grid[line.gridY][line.gridX]==0){
            color = "black";
        }
        else{
            color = "blue";
        }
        line.draw(color);
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
    console.log(pointer)
    for(let line of lineObjects){
        if(line.hit(pointer)){
            if(grid[line.gridY][line.gridX]==1){
                grid[line.gridY][line.gridX] = 0;
                console.log("!")
            }
            else{
                grid[line.gridY][line.gridX] = 1;
            } 
        }
    }
}

//マウスの座標を取得
function mousemove(e){
}

function gameloop(){
    update();
    draw_grid();
}