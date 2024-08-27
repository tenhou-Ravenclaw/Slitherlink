let canvas,graphic;
let pointerX,pointerY;
let mouseGridX,mouseGridY;
let gridSize,len;

let line = [];
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
    line = [[0,1,0,1,0,1,0,1,0,1,0,1],
            [1,0,1,0,1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0]
            ];
    gridSize = 5;
    len = 40;
}

//線を描画
function draw_line(x1,y1,x2,y2,len,color){
    graphic.beginPath();
    lineWidth = 5;
    graphic.lineWidth = lineWidth;
    graphic.strokeStyle = color;
    graphic.moveTo(x1*len+lineWidth,y1*len+lineWidth);
    graphic.lineTo(x2*len+lineWidth,y2*len+lineWidth);
    graphic.stroke();  
}

//格子を描画
function draw_grid(){
    for(let y=0;y<line.length-1;y++){
        for(let x=0;x<line[y].length-1;x++){
            let color;
            if(line[y][x]==0){
                color = "black";
            }
            else{
                color = "blue";
            }
            if (y%2==0&&(x+y)%2==1) {
                if(line[y][x]==1){
                        draw_line((x-1),y,(x+1),y,len,color);
                }else draw_line((x-1),y,(x+1),y,len,color);
            }
            if (y%2==1&&(x+y)%2==1) {
                if(line[y][x]==1){
                    draw_line(x,(y-1),x,(y+1),len,color);
                }else draw_line(x,(y-1),x,(y+1),len,color);
            }
        }
    }
}

function update(){

}

function click(e){
    const x = mouseGridX;
    const y = mouseGridY;
    if(line[y][x]==1&&(x+y)%2==1){
        line[y][x] = 0;
    }
    else if(line[y][x]==0&&(x+y)%2==1){
        line[y][x] = 1;
    }
}

function mousemove(e){
    pointerX = e.offsetX;
    pointerY = e.offsetY;

    mouseGridX = Math.floor(pointerX/(len/4));
    mouseGridY = Math.floor(pointerY/(len/4));
    // if(mouseGridX%2==0&&mouseGridX!=0){
    //     mouseGridX--;
    // }
    // if(mouseGridY%2==0&&mouseGridY!=0){
    //     mouseGridY--;
    // }
    console.log(mouseGridX,mouseGridY);
}

function gameloop(){
    update();
    draw_grid();
}