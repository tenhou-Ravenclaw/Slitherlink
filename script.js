let canvas,graphic;
onload = function(){
    canvas = document.getElementById("UnionHack");
    graphic = canvas.getContext("2d");
    //初期化
    init();
    //入力処理
    setInterval("gameloop()",16);
}

function init(){

}

function update(){

}

function gameloop(){
    update();
}