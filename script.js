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
    //偶数列：横線，奇数列：縦線
    line = [[1,1,1,1,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [1,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [1,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [1,0,0,0,0,0,0,0,0,0,0]
            ];
}

function random_n(n){
    return Math.floor(Math.random()*n);
}

function generate_pazzle(){
    
}

//線を描画
function draw_line(x1,y1,x2,y2,len,color){
    graphic.beginPath();
    graphic.lineWidth = 5;
    graphic.strokeStyle = color;
    graphic.moveTo(x1*len,y1*len);
    graphic.lineTo(x2*len,y2*len);
    graphic.stroke();  
}

//格子を描画
function draw_grid(){
    for(let y=0;y<line.length;y++){
        for(let x=0;x<line[y].length;x++){
            let color="black";
            const len = 40;
            if(line[y][x]==1){
                color="blue"
            }

            if(y%2==0){
                draw_line(x,y-y/2,x+1,y-y/2,len,color);
            }
            else{
                draw_line(x,y-y,x,y,len,color);
            }
        }
    }
}

function update(){

}

function gameloop(){
    update();
    draw_grid();
}