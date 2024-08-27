let canvas,graphic;
let line = [];
onload = function(){
    canvas = document.getElementById("Slitherlink");
    graphic = canvas.getContext("2d");
    //初期化
    init();
    //入力処理
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
}

//線を描画
function draw_line(x1,y1,x2,y2,color){
    graphic.beginPath();
    graphic.lineWidth = 5;
    graphic.strokeStyle = color;
    graphic.moveTo(x1,y1);
    graphic.lineTo(x2,y2);
    graphic.stroke();  
}

//格子を描画
function draw_grid(){
    for(let y=0;y<line.length-1;y++){
        for(let x=0;x<line[y].length-1;x++){
            let color;
            const len = 40;
            if(line[y][x]==0){
                color = "black";
            }
            else{
                color = "blue";
            }
            if (y%2==0&&(x+y)%2==1) {
                if(line[y][x]==1){
                        draw_line((x-1)*len,y*len,(x+1)*len,y*len,color);
                }else draw_line((x-1)*len,y*len,(x+1)*len,y*len,color);
            }
            if (y%2==1&&(x+y)%2==1) {
                if(line[y][x]==1){
                    draw_line(x*len,(y-1)*len,x*len,(y+1)*len,color);
                }else draw_line(x*len,(y-1)*len,x*len,(y+1)*len,color);
            }
            // console.log(line[1][0])=0
        }
    }
}

function update(){

}

function gameloop(){
    update();
    draw_grid();
}