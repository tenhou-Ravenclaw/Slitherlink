let canvas,graphic;
let line = [];

let x0 = 0;
let y0 = 0;
const len = 40;
let key = 0;

onload = function(){
    canvas = document.getElementById("Slitherlink");
    graphic = canvas.getContext("2d");
    //初期化
    init();
    //入力処理
    setInterval("gameloop()",16);
}

// 乱数発生機
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
  

function init(){
    line = [[0,0,0,0,0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0]
            ];
            

    circle_1st();
    for (let index = 0; index < 2; index++) {        
        circle(key);
    }
    
}


// 最初の一本描画
function circle_1st(){
    do{
        x0 = getRandomInt(line.length-1);
        y0 = getRandomInt(line.length-1);
        // console.log(x0);
        // console.log(y0);
    }while ((x0 + y0) % 2 != 1)
    line[x0][y0] = 1;
}

// 2本目以降描画
function circle(key) {
    key = getRandomInt(6)+1; // ある線に繋がっていられる2本目の数は６
    // console.log(x0);
    // console.log(y0);
    if (y0%2==1) { // もし横棒が1本目で描画されたら
        switch (key) {
            case 1: // 左斜め上
                if (x0-2<0) {// はみ出ていたらcase 2へ
                    key+=1;
                }else{
                    line[x0-1][y0-1]=1;
                    break;
                }
            case 2: // 右横直線
                if (line.length-2<y0+2) {// はみ出ていたらcase 3へ
                    key+=1;
                }else{
                    line[x0][y0+2]=1;
                    break;
                }
            case 3: // 右斜め下
                if (x0-2<0) {// はみ出ていたらcase 4へ
                    key+=1;
                }else{
                    line[x0+1][y0+1]=1;
                    break;
                }
            case 4: // 左横直線
                if (y0-2<0) {// はみ出ていたらcase 5へ
                    key+=1;
                }else{
                    line[x0][y0-2]=1;
                    break;
                }
            case 5: // 右斜め上
                if (x0-2<0) {// はみ出ていたらcase 6へ
                    key+=1
                }else{
                    line[x0-1][y0+1]=1;
                    break;
                }
                case 6: // 左斜め下
                    if (x0+2<0) {// はみ出ていたらcase 1へ
                        key = 1;
                    }else{
                        line[x0+1][y0-1]=1;
                    break;
                }
        }
    }else{ // 縦棒に対しての2本目
        switch (key) {
            case 1: // 左斜め上
                if (x0-2<0) {// はみ出ていたらcase 2へ
                    key+=1;
                }else{
                    line[x0-1][y0-1]=1;
                    break;
                }
            case 2: // 下直線
                if (line.length-2<x0+2) {// はみ出ていたらcase 3へ
                    key+=1;
                }else{
                    line[x0+2][y0]=1;
                    break;
                }
            case 3: // 右斜め下
                if (line.length-2<y0+2) {// はみ出ていたらcase 4へ
                    key+=1;
                }else{
                    line[x0+1][y0+1]=1;
                    break;
                }
            case 4: // 上直線
                if (y0-2<0) {// はみ出ていたらcase 5へ
                    key+=1;
                }else{
                    line[x0-2][y0] = 1;
                    break;
                }
            case 5: // 右斜め上
                if (line.length-2<y0+2) {// はみ出ていたらcase 6へ
                    key+=1
                }else{
                    line[x0-1][y0+1]=1;
                    break;
                }
                case 6: // 左斜め下
                    if (y0-2<0) {// はみ出ていたらcase 1へ
                        key = 1;
                    }else{
                        line[x0+1][y0-1]=1;
                    break;
                }
            
        }
    }
}

// 一本線か判定
function judgement(){

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
            if(line[y][x]==0){
                color = "black";
            }
            else{
                color = "red";
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
