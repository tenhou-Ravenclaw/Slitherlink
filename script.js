import { Generate } from "./generate.js";
import { Check_Ans } from "./check.js";

let canvas,graphic;
let gridSize,len;
let grid = [];
let lineObjects = [];
let errorNum = [];

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
            return true;
        }
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
    this.setInterval(()=>{
        update();
        draw();
    }, 100);
    //setInterval(gameloop(),16)//１６は何の数字;
}

function init(){
    gridSize = 4;
    console.log(canvas.width);
    len = 50;
    const puzzle = Generate(gridSize);
    console.log(puzzle);
    for(let i=0; i<gridSize*2+1; i++){
        grid[i] = [];
        for(let j=0; j<gridSize*2+1; j++){
            grid[i][j] = 0;
            if(i%2==1 && j%2==1)grid[i][j] = puzzle[(i-1)/2][(j-1)/2];
        }
    }
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

function draw_number(){
    for(let y=0;y<grid.length;y++){
        for(let x=0;x<grid[y].length;x++){
            if(x%2==1&&y%2==1&&grid[y][x]>-1){
                let color = "silver"
                for(let k=0; k<errorNum.length; k++){
                    if(x == errorNum[k][1] && y == errorNum[k][0])
                        color = "black";
                }
                graphic.fillStyle = color;
                graphic.font = "48px serif";
                graphic.fillText(grid[y][x], x*len-8, (y+1/2)*len+5);
            }
        }
    }  
}

function update(){
    if( (errorNum = Check_Ans(grid)) == true){
        /*パズルが完成した時の処理 */
        console.log("クリアー");
    }
}

function draw(){
    draw_grid();
    draw_point();
    draw_number();
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
            line.color_0 = "silver";
            line.color_1 = "SkyBlue";
        }
        else{
            line.color_0 = "black";
            line.color_1 = "blue";
        }
    }
}