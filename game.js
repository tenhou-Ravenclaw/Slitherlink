import { Generate } from "./module/generate.js";
import { Check_Ans } from "./module/check.js";

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

function init(){
    console.log(canvas.width)
    len = (canvas.width/2-5) / gridSize;
    const puzzle = Generate(gridSize);
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
    let line_width = 5;
    //if(gridSize > 6)line_width = 2;
    for(let y=0;y<grid.length;y++){
        for(let x=0;x<grid[y].length;x++){
            if(y%2==0&&(x+y)%2==1){
                if(grid[y][x]==1){
                    let line = new Line((x-1),y,(x+1),y,len,line_width,x,y);
                    lineObjects.push(line);
                }
                else{
                    let line = new Line((x-1),y,(x+1),y,len,line_width,x,y);
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
    let font_size = 48;
    if(gridSize > 6)font_size = 28;
    for(let y=0;y<grid.length;y++){
        for(let x=0;x<grid[y].length;x++){
            if(x%2==1&&y%2==1&&grid[y][x]>-1){
                let color = "silver"
                for(let k=0; k<errorNum.length; k++){
                    if(x == errorNum[k][1] && y == errorNum[k][0])
                        color = "black";
                }
                graphic.fillStyle = color;
                graphic.font = `${font_size}px serif`;
                graphic.fillText(grid[y][x], x*len-7, (y+1/2)*len+5);
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
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
    console.log(e.offsetX);
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

document.addEventListener('DOMContentLoaded', function() {
    const min = document.getElementById("min");
    const sec = document.getElementById("sec");
    let timeRemaining = 5 * 60; // 5分を秒に変換
    var helpButton = document.getElementById('helpImage');
    var closeButton = document.querySelector('.close');
    var hAudio = document.getElementById('help_audio');
    var tAudio = document.getElementById('timeOut_audio');
    var sAudio = document.getElementById('submit');
    var timeUpPopup = document.getElementById("timeUpPopup");
    var overlay = document.getElementById("overlay");
    var timeUpBackHomePopupButton = document.getElementById("timeUpBackHomePopup");
    var timeUpTryAgainPopupButton = document.getElementById("timeUpTryAgainPopup");
    var submitButton = document.getElementById("submitImage");
    var correctPopup = document.getElementById("correctPopup");
    var incorrectPopup = document.getElementById("incorrectPopup");
    var correctBackHomePopupButton = document.getElementById("correctBackHomePopup");
    var correctTryAgainPopupButton = document.getElementById("correctTryAgainPopup");
    var incorrectBackHomePopupButton = document.getElementById("incorrectBackHomePopup");
    var incorrectTryAgainPopupButton = document.getElementById("incorrectTryAgainPopup");

    function countdown() {
        let minutes = Math.floor(timeRemaining / 60);
        let seconds = timeRemaining % 60;

        min.innerHTML = minutes < 10 ? '0' + minutes : minutes;
        sec.innerHTML = seconds < 10 ? '0' + seconds : seconds;

        timeRemaining--;

        if (timeRemaining < 0) {
            clearInterval(timer); // タイマーを停止
            showTimeUpPopup(); //時間切れのポップアップを表示
        }
    }

    // ヘルプボタンをクリックしたときにポップアップとオーバーレイを表示
    helpButton.addEventListener('click', function() {
        popup.style.display = 'block';
        overlay.style.display = 'block';
        hAudio.currentTime = 0; // 連続クリックに対応
        hAudio.play(); // クリックしたら音を再生
    });
    // 閉じるボタンをクリックしたときにポップアップとオーバーレイを閉じる
    closeButton.addEventListener('click', function() {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    });

    // オーバーレイをクリックしたときにポップアップとオーバーレイを閉じる
    overlay.addEventListener('click', function() {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    });

    function showTimeUpPopup() {
        overlay.style.display = 'block';
        timeUpPopup.style.display = 'block';
    }

    function showCorrectPopup() {
        overlay.style.display = 'block';
        correctPopup.style.display = 'block';
    }

    function showIncorrectPopup() {
        overlay.style.display = 'block';
        incorrectPopup.style.display = 'block';
    }

    timeUpBackHomePopupButton.addEventListener('click', function() {
        tAudio.currentTime = 0; // 連続クリックに対応
        tAudio.play(); // クリックしたら音を再生

        setTimeout(function() {
            overlay.style.display = 'none';
            timeUpPopup.style.display = 'none';
            window.location.href = "index.html";
        }, 500);// 再生の後に遷移させる
    });

    timeUpTryAgainPopupButton.addEventListener('click', function() {
        tAudio.currentTime = 0; // 連続クリックに対応
        tAudio.play(); // クリックしたら音を再生

        setTimeout(function() {
            overlay.style.display = 'none';
            timeUpPopup.style.display = 'none';
            window.location.href = "game.html";
        }, 500);// 再生の後に遷移させる
    });

    correctBackHomePopupButton.addEventListener('click', function() {
        tAudio.currentTime = 0; // 連続クリックに対応
        tAudio.play(); // クリックしたら音を再生

        setTimeout(function() {
            overlay.style.display = 'none';
            timeUpPopup.style.display = 'none';
            window.location.href = "index.html";
        }, 500);// 再生の後に遷移させる
    });

    correctTryAgainPopupButton.addEventListener('click', function() {
        tAudio.currentTime = 0; // 連続クリックに対応
        tAudio.play(); // クリックしたら音を再生

        setTimeout(function() {
            overlay.style.display = 'none';
            timeUpPopup.style.display = 'none';
            window.location.href = "game.html";
        }, 500);// 再生の後に遷移させる
    });

    incorrectBackHomePopupButton.addEventListener('click', function() {
        tAudio.currentTime = 0; // 連続クリックに対応
        tAudio.play(); // クリックしたら音を再生

        setTimeout(function() {
            overlay.style.display = 'none';
            timeUpPopup.style.display = 'none';
            window.location.href = "index.html";
        }, 500);// 再生の後に遷移させる
    });

    incorrectTryAgainPopupButton.addEventListener('click', function() {
        tAudio.currentTime = 0; // 連続クリックに対応
        tAudio.play(); // クリックしたら音を再生

        setTimeout(function() {
            overlay.style.display = 'none';
            timeUpPopup.style.display = 'none';
            window.location.href = "game.html";
        }, 500);// 再生の後に遷移させる
    });

    submitButton.addEventListener('click', function() {
        sAudio.currentTime = 0; // 連続クリックに対応
        sAudio.play(); // クリックしたら音を再生
        if(Check_Ans(grid) == true)showCorrectPopup();
        else showIncorrectPopup();
        /*
        ここにsubmitボタンを押した後の処理を書きます
        正誤判定が出た後ポップアップを表示して、ホームに戻るボタンともう一回チャレンジするボタンを作ろうと思います
        タイムアウト時に表示されるポップアップと同じかんじで実装します
        */

        //とりあえずsubmitボタンを押すとそれぞれcorrect, incorrectのポップアップを表示させています
        // showCorrectPopup();
        //showIncorrectPopup();

    });

    const timer = setInterval(countdown, 1000);
    countdown(); // 初回の表示更新

    canvas = document.getElementById("Slitherlink");
    graphic = canvas.getContext("2d");

    //ここで入力するサイズを受け取る --------------
    gridSize = 4;

    //初期化
    init();
    //入力処理
    document.onclick = click;
    document.onmousemove = mousemove;
    setInterval(()=>{
        update();
        draw();
    }, 100);
    //setInterval(gameloop(),16)//１６は何の数字;
    //16は16msに一度実行，つまり一秒間に約60回実行する（60fps）
});
