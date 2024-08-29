let canvas,graphic;
let line = [];

let x0 = 0;
let y0 = 0;
let startX0 = 0;
let startY0 = 0;
const len = 40;
let key = 0;
let judgementSearch = false;

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
    line = [[0,0,0,0,0,0,0,0,0,0,0,0],
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
            


    do {
        preCompleteCircle();
        console.log("ahahahaha")
    } while (!judgement());
}


// 最初の一本描画
function circle_1st(){
    do{
        x0 = getRandomInt(line.length-1);
        startX0 = x0;
        y0 = getRandomInt(line.length-1);
        startY0 = y0;
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
                    x0 -= 1;
                    y0 -= 1;
                    break;
                }
            case 2: // 右横直線
                if (line.length-2<y0+2) {// はみ出ていたらcase 3へ
                    key+=1;
                }else{
                    line[x0][y0+2]=1;
                    y0 += 2;
                    break;
                }
            case 3: // 右斜め下
                if (x0-2<0) {// はみ出ていたらcase 4へ
                    key += 1;
                }else{
                    line[x0+1][y0+1]=1;
                    x0 += 1;
                    y0 += 1;
                    break;
                }
            case 4: // 左横直線
                if (y0-2<0) {// はみ出ていたらcase 5へ
                    key += 1;
                }else{
                    line[x0][y0-2]=1;
                    y0 -= 2;
                    break;
                }
            case 5: // 右斜め上
                if (x0-2<0) {// はみ出ていたらcase 6へ
                    key+=1
                }else{
                    line[x0-1][y0+1]=1;
                    x0 -= 1;
                    y0 += 1;
                    break;
                }
                case 6: // 左斜め下
                    if (x0+2<0) {// はみ出ていたらcase 1へ
                        key = 1;
                    }else{
                        line[x0+1][y0-1]=1;
                        x0 += 1;
                        y0 -= 1;
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
                    x0 -= 1;
                    y0 -= 1;
                    break;
                }
            case 2: // 下直線
                if (line.length-2<x0+2) {// はみ出ていたらcase 3へ
                    key+=1;
                }else{
                    line[x0+2][y0]=1;
                    x0 += 2;
                    break;
                }
            case 3: // 右斜め下
                if (line.length-2<y0+2||line.length-2<x0+2) {// はみ出ていたらcase 4へ
                    key+=1;
                }else{
                    line[x0+1][y0+1]=1;
                    x0 += 1;
                    y0 += 1;
                    break;
                }
            case 4: // 上直線
                if (x0-2<0) {// はみ出ていたらcase 5へ
                    key+=1;
                }else{
                    line[x0-2][y0] = 1;
                    x0 -= 2;
                    break;
                }
            case 5: // 右斜め上
                if (x0-2<0||line.length-2<y0+2) {// はみ出ていたらcase 6へ
                    key+=1
                }else{
                    line[x0-1][y0+1]=1;
                    x0 -= 1;
                    y0 += 1;
                    break;
                }
            case 6: // 左斜め下
                if (y0-2<0||line.length-2<x0+2) {// はみ出ていたらcase 1へ
                    key = 1;
                }else{
                    line[x0+1][y0-1]=1;
                    x0 += 1;
                    y0 -= 1;
                break;
            }
            
        }
    }
}

// 一応完成？な円描画
function preCompleteCircle(params) {
    reset();
    circle_1st();
    do {
        circle(key);
    } while ((x0 != startX0)&&(y0 != startY0));
}

// 一本線か判定
function judgement(judgementSearch){
    judgementLabel:if (true) {
        for(let y=0;y<line.length-1;y++){
            for(let x=0;x<line[y].length-1;x++){
                if ((x+y)%2==0) {
                    let count = 0;
                    if(x < line.length){
                        if (line[x+1][y]==1) {
                            count +=1
                        }
                    }
                    if(x>0){
                        if (line[x-1][y]==1) {
                            count +=1
                        }
                    }
                    if(y < line.length){
                        if (line[x][y+1]==1) {
                            count +=1
                        }
                    }
                    if (y>=0) {    
                        if (line[x][y-1]==1) {
                            count +=1
                        }
                    }
                    if(count == 0 || count == 2){ // そのマスの前後左右に線が０または2つあったとき
                    }else break judgementLabel;
                }
            }
        }
        judgementSearch = true;
    }
    return judgementSearch;
}

// リセット
function reset() {
    for(let y=0;y<line.length-1;y++){
        for(let x=0;x<line[y].length-1;x++){
            if ((x+y)%2==1) {                
                line[x][y] = 0;
            }
        }
    }
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
