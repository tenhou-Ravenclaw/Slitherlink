function Generate_Grid(Input){
    const DEDGUB = true;
    const N = Input[0].length;
    const SIZE = N*2+1+4;
    //二次元配列の宣言
    let Calc=[], Ans=[];
    for(let i=0; i<SIZE; i++){
        Calc[i] = [];
        Ans[i] = [];
        for(let j=0; j<SIZE; j++){
            Calc[i][j] = 1;
            Ans[i][j] = 0;
        }
    }
    {   //Ans配列の初期化
        for(let k=0; k<SIZE; k++){//上下左右余白は×
            Ans[0][k] = -1;
            Ans[1][k] = -1;
            Ans[SIZE-1][k] = -1;
            Ans[SIZE-2][k] = -1;
            Ans[k][0] = -1;
            Ans[k][1] = -1;
            Ans[k][SIZE-1] = -1;
            Ans[k][SIZE-2] = -1;
        }
        //余白4スミは0
        Ans[1][1] = 0;
        Ans[SIZE-2][1] = 0;
        Ans[1][SIZE-2] = 0;
        Ans[SIZE-2][SIZE-2] = 0;
    }
    {   //Calc配列の初期化
        for(let i=0; i<SIZE; i++){
            for(let j=0; j<SIZE; j++){
                Calc[i][j] = Ans[i][j]
            }
        }
    }
    const Calc_Input = function(){
        for(let i=0; i<N; i++){
            for(let j=0; j<N; j++){
                Calc[i*2+3][j*2+3] = Input[i][j];
            }
        }
    }
    //CalcにInputをセットする関数
    const Calc_Reset = function(){
        for(let i=2; i<SIZE-2; i++){
            for(let j=(i+1)%2+2; j<SIZE-2; j+=2){
                Calc[i][j] = 0;
            }
        }
    }
    //デバッグ用関数
    let debug_text = "";
    const print = function(){//デバッグ用 //id="test"を使用
        if(!DEDGUB)return;
        const print_cell = function(color, str){
            return `<pre style='background-color:${color};display:inline'>${str.toString().padStart(2, ' ')}</pre>`
        }
        for(let i=0; i<SIZE; i++){
            for(let j=0; j<SIZE; j++){
                if(i<2 || SIZE-3<i || j<2 || SIZE-3<j){             //余白部分
                    debug_text += print_cell("blue", Calc[i][j]);
                }else if(i%2==1 && j%2==1){                         //マス目
                    debug_text += print_cell("green", Calc[i][j]);
                }else if((i%2==0 && j%2==1)||(i%2==1 && j%2==0)){   //線なら
                    if(Calc[i][j] == 1){            //○
                        debug_text += print_cell("black", Calc[i][j]);
                    }else if(Calc[i][j] == -1){     //×
                        debug_text += print_cell("red", Calc[i][j]);
                    }else{                          //-
                        debug_text += "  ";
                    }
                }else{                                              //空白なら
                    //周囲に線が存在するなら黒
                    if(Calc[i-1][j] == 1){debug_text += print_cell("black", Calc[i][j]);}
                    else if(Calc[i][j-1] == 1){debug_text += print_cell("black", Calc[i][j]);}
                    else if(Calc[i+1][j] == 1){debug_text += print_cell("black", Calc[i][j]);}
                    else if(Calc[i][j+1] == 1){debug_text += print_cell("black", Calc[i][j]);}
                    else{debug_text+="  ";}
                }
            }
            debug_text += "  ";
            for(let j=0; j<SIZE; j++){
                if(i<2 || SIZE-3<i || j<2 || SIZE-3<j){             //余白部分
                    debug_text += print_cell("blue", Ans[i][j]);
                }else if(i%2==1 && j%2==1){                         //マス目
                    debug_text += print_cell("green", Ans[i][j]);
                }else if((i%2==0 && j%2==1)||(i%2==1 && j%2==0)){   //線なら
                    if(Ans[i][j] == 1){            //○
                        debug_text += print_cell("black", Ans[i][j]);
                    }else if(Ans[i][j] == -1){     //×
                        debug_text += print_cell("red", Ans[i][j]);
                    }else{                          //-
                        debug_text += "  ";
                    }
                }else{                                              //空白なら
                    //周囲に線が存在するなら黒
                    if(Ans[i-1][j] == 1){debug_text += print_cell("black", Ans[i][j]);}
                    else if(Ans[i][j-1] == 1){debug_text += print_cell("black", Ans[i][j]);}
                    else if(Ans[i+1][j] == 1){debug_text += print_cell("black", Ans[i][j]);}
                    else if(Ans[i][j+1] == 1){debug_text += print_cell("black", Ans[i][j]);}
                    else{debug_text+="  ";}
                }
            }
            debug_text+="<br>"
        }
        debug_text+="<br>"
        const test = document.getElementById("test");
        test.innerHTML = debug_text;
    };
    //計算用関数
    const Calc_3 = function(){  //連続した３から計算
        for(let i=1; i<SIZE-3; i+=2){
            for(let j=1; j<SIZE-3; j+=2){
                if(Calc[i][j] == 3){
                    if(Calc[i][j+2] == 3){//横に連続
                        Calc[i][j-1]=1;
                        Calc[i][j+1]=1;
                        Calc[i][j+3]=1;
                        Calc[i-2][j+1]=-1;
                        Calc[i+2][j+1]=-1;
                    }
                    if(Calc[i+2][j] == 3){//縦に連続
                        Calc[i-1][j]=1;
                        Calc[i+1][j]=1;
                        Calc[i+3][j]=1;
                        Calc[i+1][j-2]=-1;
                        Calc[i+1][j+2]=-1;
                    }
                    if(Calc[i+2][j+2] == 3){//右下に連続
                        Calc[i-1][j]=1;
                        Calc[i][j-1]=1;
                        Calc[i+3][j+2]=1;
                        Calc[i+2][j+3]=1;
                    }
                    if(Calc[i+2][j-2] == 3){//左下に連続
                        Calc[i-1][j]=1;
                        Calc[i][j+1]=1;
                        Calc[i+3][j-2]=1;
                        Calc[i+2][j-3]=1;
                    }
                }
            }
        }
    }
    const Calc_Grid_Line = function(){  //線とマスの情報から判断
        for(let i=3; i<SIZE-3; i+=2){
            for(let j=3; j<SIZE-3; j+=2){
                if(Calc[i][j] == 1){
                    if(Calc[i-1][j-2]==-1 && Calc[i-2][j-1]==-1){
                        Calc[i][j-1]=-1;
                        Calc[i-1][j]=-1;
                    }
                    if(Calc[i+1][j-2]==-1 && Calc[i+2][j-1]==-1){
                        Calc[i][j-1]=-1;
                        Calc[i+1][j]=-1;
                    }
                    if(Calc[i+2][j+1]==-1 && Calc[i+1][j+2]==-1){
                        Calc[i+1][j]=-1;
                        Calc[i][j+1]=-1;
                    }
                    if(Calc[i-2][j+1]==-1 && Calc[i-1][j+2]==-1){
                        Calc[i-1][j]=-1;
                        Calc[i][j+1]=-1;
                    }
                    if((Calc[i-1][j-2]==1 && Calc[i-2][j-1]==-1)||(Calc[i-1][j-2]==-1 && Calc[i-2][j-1]==1)){
                        Calc[i+1][j]=-1;
                        Calc[i][j+1]=-1;
                    }
                    if((Calc[i+1][j-2]==1 && Calc[i+2][j-1]==-1)||(Calc[i+1][j-2]==-1 && Calc[i+2][j-1]==1)){
                        Calc[i-1][j]=-1;
                        Calc[i][j+1]=-1;
                    }
                    if((Calc[i+2][j+1]==1 && Calc[i+1][j+2]==-1)||(Calc[i+2][j+1]==-1 && Calc[i+1][j+2]==1)){
                        Calc[i][j-1]=-1;
                        Calc[i-1][j]=-1;
                    }
                    if((Calc[i-2][j+1]==1 && Calc[i-1][j+2]==-1)||(Calc[i-2][j+1]==-1 && Calc[i-1][j+2]==1)){
                        Calc[i][j-1]=-1;
                        Calc[i+1][j]=-1;
                    }
                }
                if(Calc[i][j] == 2){
                    if(Calc[i-1][j-2]==-1 && Calc[i-2][j-1]==-1){
                        if(Calc[i+1][j-2]==-1)Calc[i+2][j-1]=1;
                        if(Calc[i+2][j-1]==-1)Calc[i+1][j-2]=1;
                        if(Calc[i-2][j+1]==-1)Calc[i-1][j+2]=1;
                        if(Calc[i-1][j+2]==-1)Calc[i-2][j+1]=1;
                    }
                    if(Calc[i+1][j-2]==-1 && Calc[i+2][j-1]==-1){
                        if(Calc[i+2][j+1]==-1)Calc[i+1][j+2]=1;
                        if(Calc[i+1][j+2]==-1)Calc[i+2][j+1]=1;
                        if(Calc[i-1][j-2]==-1)Calc[i-2][j-1]=1;
                        if(Calc[i-2][j-1]==-1)Calc[i-1][j-2]=1;
                    }
                    if(Calc[i+2][j+1]==-1 && Calc[i+1][j+2]==-1){
                        if(Calc[i-2][j+1]==-1)Calc[i-1][j+2]=1;
                        if(Calc[i-1][j+2]==-1)Calc[i-2][j+1]=1;
                        if(Calc[i+1][j-2]==-1)Calc[i+2][j-1]=1;
                        if(Calc[i+2][j-1]==-1)Calc[i+1][j-2]=1;
                    }
                    if(Calc[i-2][j+1]==-1 && Calc[i-1][j+2]==-1){
                        if(Calc[i-1][j-2]==-1)Calc[i-2][j-1]=1;
                        if(Calc[i-2][j-1]==-1)Calc[i-1][j-2]=1;
                        if(Calc[i+2][j+1]==-1)Calc[i+1][j+2]=1;
                        if(Calc[i+1][j+2]==-1)Calc[i+2][j+1]=1;
                    }
                }
                if(Calc[i][j] == 3){
                    if(Calc[i-1][j-2]==-1 && Calc[i-2][j-1]==-1){
                        Calc[i][j-1]=1;
                        Calc[i-1][j]=1;
                    }
                    if(Calc[i+1][j-2]==-1 && Calc[i+2][j-1]==-1){
                        Calc[i][j-1]=1;
                        Calc[i+1][j]=1;
                    }
                    if(Calc[i+2][j+1]==-1 && Calc[i+1][j+2]==-1){
                        Calc[i+1][j]=1;
                        Calc[i][j+1]=1;
                    }
                    if(Calc[i-2][j+1]==-1 && Calc[i-1][j+2]==-1){
                        Calc[i-1][j]=1;
                        Calc[i][j+1]=1;
                    }
                    if((Calc[i-1][j-2]==1 && Calc[i-2][j-1]==-1)||(Calc[i-1][j-2]==-1 && Calc[i-2][j-1]==1)){
                        Calc[i+1][j]=1;
                        Calc[i][j+1]=1;
                    }
                    if((Calc[i+1][j-2]==1 && Calc[i+2][j-1]==-1)||(Calc[i+1][j-2]==-1 && Calc[i+2][j-1]==1)){
                        Calc[i-1][j]=1;
                        Calc[i][j+1]=1;
                    }
                    if((Calc[i+2][j+1]==1 && Calc[i+1][j+2]==-1)||(Calc[i+2][j+1]==-1 && Calc[i+1][j+2]==1)){
                        Calc[i][j-1]=1;
                        Calc[i-1][j]=1;
                    }
                    if((Calc[i-2][j+1]==1 && Calc[i-1][j+2]==-1)||(Calc[i-2][j+1]==-1 && Calc[i-1][j+2]==1)){
                        Calc[i][j-1]=1;
                        Calc[i+1][j]=1;
                    }
                }
            }
        }
    }
    const Calc_Grid = function(){   //マス情報の判断
        let action=false;
        for(let i=1; i<SIZE-1; i+=2){
            for(let j=1; j<SIZE-1; j+=2){
                if(Calc[i][j] == 0){    //０の周囲は×
                    if(Calc[i-1][j]==0)Calc[i-1][j]=-1;
                    if(Calc[i][j-1]==0)Calc[i][j-1]=-1;
                    if(Calc[i+1][j]==0)Calc[i+1][j]=-1;
                    if(Calc[i][j+1]==0)Calc[i][j+1]=-1;
                    action=true;
                }
                let cnt_maru=0,cnt_batu=0;
                {   //周囲の線の○を取得
                    if(Calc[i-1][j] == 1)cnt_maru++;
                    if(Calc[i][j-1] == 1)cnt_maru++;
                    if(Calc[i+1][j] == 1)cnt_maru++;
                    if(Calc[i][j+1] == 1)cnt_maru++;
                }
                {   //周囲の線の×を取得
                    if(Calc[i-1][j] == -1)cnt_batu++;
                    if(Calc[i][j-1] == -1)cnt_batu++;
                    if(Calc[i+1][j] == -1)cnt_batu++;
                    if(Calc[i][j+1] == -1)cnt_batu++;
                }
                if(Calc[i][j] == cnt_maru && 4-Calc[i][j] != cnt_batu){//○の数が一致なら残りは×
                    if(Calc[i-1][j]==0)Calc[i-1][j]=-1;
                    if(Calc[i][j-1]==0)Calc[i][j-1]=-1;
                    if(Calc[i+1][j]==0)Calc[i+1][j]=-1;
                    if(Calc[i][j+1]==0)Calc[i][j+1]=-1;
                    action=true;
                }
                if(Calc[i][j] != cnt_maru && 4-Calc[i][j] == cnt_batu){//×の数が一致なら残りは○
                    if(Calc[i-1][j]==0)Calc[i-1][j]=1;
                    if(Calc[i][j-1]==0)Calc[i][j-1]=1;
                    if(Calc[i+1][j]==0)Calc[i+1][j]=1;
                    if(Calc[i][j+1]==0)Calc[i][j+1]=1;
                    action=true;
                }
            }
        }
    }
    const Calc_Line = function(){   //線情報の判断
        let cnt=0;
        let action=false;
        do{
            cnt=0;
            for(let i=2; i<SIZE-2; i+=2){
                for(let j=2; j<SIZE-2; j+=2){
                    cnt++;//とりあえず処理したことにする
                    let cnt_maru=0,cnt_batu=0;
                    {   //周囲の線の○を取得
                        if(Calc[i-1][j] == 1)cnt_maru++;
                        if(Calc[i][j-1] == 1)cnt_maru++;
                        if(Calc[i+1][j] == 1)cnt_maru++;
                        if(Calc[i][j+1] == 1)cnt_maru++;
                    }
                    {   //周囲の線の×を取得
                        if(Calc[i-1][j] == -1)cnt_batu++;
                        if(Calc[i][j-1] == -1)cnt_batu++;
                        if(Calc[i+1][j] == -1)cnt_batu++;
                        if(Calc[i][j+1] == -1)cnt_batu++;
                    }
                    if(cnt_maru==0 && cnt_batu==3){
                        if(Calc[i-1][j]==0)Calc[i-1][j]=-1;
                        if(Calc[i][j-1]==0)Calc[i][j-1]=-1;
                        if(Calc[i+1][j]==0)Calc[i+1][j]=-1;
                        if(Calc[i][j+1]==0)Calc[i][j+1]=-1;
                    }else if(cnt_maru==1 && cnt_batu==2){
                        if(Calc[i-1][j]==0)Calc[i-1][j]=1;
                        if(Calc[i][j-1]==0)Calc[i][j-1]=1;
                        if(Calc[i+1][j]==0)Calc[i+1][j]=1;
                        if(Calc[i][j+1]==0)Calc[i][j+1]=1;
                    }else if(cnt_maru == 2 && cnt_batu != 2){
                        if(Calc[i-1][j]==0)Calc[i-1][j]=-1;
                        if(Calc[i][j-1]==0)Calc[i][j-1]=-1;
                        if(Calc[i+1][j]==0)Calc[i+1][j]=-1;
                        if(Calc[i][j+1]==0)Calc[i][j+1]=-1;
                    }else{cnt--;}//処理を行わなかった場合
                }
            }
            if(cnt != 0)action=true;
        }while(cnt != 0);
        return action;
    }
    //線を生成
    const Generate_Line = function(){
        let action=false;
        Calc_3();
        do{
            action=false;
            Calc_Grid_Line();
            action = (Calc_Grid() || Calc_Line())
        }while(action == true);
    }
    //線が解答と一致するかを判定 <-この関数を改善することでもう少しよくなるかも！
    const Check = function(){
        Calc_Reset();
        Generate_Line();
        for(let i=2; i<SIZE-2; i++){
            for(let j=(i+1)%2+2; j<SIZE-2; j+=2){
                if(Ans[i][j] == 1 && Calc[i][j] != 1)return false;
            }
        }
        print();
        return true;
    }
    {//問題の生成　＜－メインのプログラム
        Calc_Input();
        Calc_Reset();
        Generate_Line();
        for(let i=2; i<SIZE-2; i++){    //線情報をAnsに保存
            for(let j=(i+1)%2+2; j<SIZE-2; j+=2){
                Ans[i][j] = Calc[i][j];
            }
        }
        Calc_Reset();
        print();
        let A=[];
        for(k=0; k<N*N; k++)A[k]=k;
        for(let k=0; k<A.length; k++){  //配列Aをシャッフル
            const R = Math.floor(Math.random()*A.length);
            let tmp = A[k];
            A[k] = A[R];
            A[R] = tmp;
        }
        do{
            for(let i=3; i<SIZE-3; i+=2){
                for(let j=3; j<SIZE-3; j+=2){
                    Ans[i][j] = Calc[i][j];
                }
            }
            const i=Math.floor(A[0]/N)*2+3;
            const j=Math.floor(A[0]%N)*2+3;
            A.shift();
            const tmp = Calc[i][j];
            Calc[i][j] = -1;
            if(Check())continue;
            Calc[i][j] = tmp;
        }while(A.length > 0);
    }
    print();
    let cnt=0;
    let Output = [];
    for(let i=0; i<N; i++){
        Output[i] = [];
        for(let j=0; j<N; j++){
            Output[i][j] = Ans[i*2+3][j*2+3];
            if(Output[i][j] == -1)cnt++;
        }
    }
    console.log(cnt);
    return Output;
}

function Generate_Line(N){
    const SIZE = N*2+1+4;
    //二次元配列の宣言
    let Calc=[], Ans=[];
    for(let i=0; i<SIZE; i++){
        Calc[i] = [];
        Ans[i] = [];
        for(let j=0; j<SIZE; j++){
            Calc[i][j] = 1;
            Ans[i][j] = 0;
        }
    }
    {   //Ans配列の初期化
        for(let k=0; k<SIZE; k++){//上下左右余白は×
            Ans[0][k] = -1;
            Ans[1][k] = -1;
            Ans[SIZE-1][k] = -1;
            Ans[SIZE-2][k] = -1;
            Ans[k][0] = -1;
            Ans[k][1] = -1;
            Ans[k][SIZE-1] = -1;
            Ans[k][SIZE-2] = -1;
        }
    }
    {   //Calc配列の初期化
        for(let i=0; i<SIZE; i++){
            for(let j=0; j<SIZE; j++){
                Calc[i][j] = Ans[i][j]
            }
        }
    }
    //デバッグ用関数
    let debug_text = "";
    const print = function(){//デバッグ用 //id="test"を使用
        const print_cell = function(color, str){
            return `<pre style='background-color:${color};display:inline'>${str.toString().padStart(2, ' ')}</pre>`
        }
        for(let i=0; i<SIZE; i++){
            for(let j=0; j<SIZE; j++){//Calc配列の出力
                if(i<2 || SIZE-3<i || j<2 || SIZE-3<j){             //余白部分
                    debug_text += print_cell("blue", Calc[i][j]);
                }else if(i%2==1 && j%2==1){                         //マス目
                    debug_text += print_cell("yellow", Calc[i][j]);
                }else if((i%2==0 && j%2==1)||(i%2==1 && j%2==0)){   //線なら
                    if(Calc[i][j] >= 1){            //○
                        debug_text += print_cell("gray", Calc[i][j]);
                    }else if(Calc[i][j] == -1){     //×
                        debug_text += print_cell("red", Calc[i][j]);
                    }else{                          //-
                        debug_text += print_cell("green", Calc[i][j]);
                    }
                }else{                                              //空白なら
                    //周囲に線が存在するなら黒
                    if(Calc[i-1][j] == 1){debug_text += print_cell("gray", Calc[i][j]);}
                    else if(Calc[i][j-1] == 1){debug_text += print_cell("gray", Calc[i][j]);}
                    else if(Calc[i+1][j] == 1){debug_text += print_cell("gray", Calc[i][j]);}
                    else if(Calc[i][j+1] == 1){debug_text += print_cell("gray", Calc[i][j]);}
                    else{debug_text += print_cell("white", Calc[i][j]);}
                }
            }
            debug_text += "  ";
            for(let j=0; j<SIZE; j++){//Ans配列の出力
                if(i<2 || SIZE-3<i || j<2 || SIZE-3<j){             //余白部分
                    debug_text += print_cell("blue", Ans[i][j]);
                }else if(i%2==1 && j%2==1){                         //マス目
                    debug_text += print_cell("yellow", Ans[i][j]);
                }else if((i%2==0 && j%2==1)||(i%2==1 && j%2==0)){   //線なら
                    if(Ans[i][j] == 1){            //○
                        debug_text += print_cell("black", Ans[i][j]);
                    }else if(Ans[i][j] == -1){     //×
                        debug_text += print_cell("red", Ans[i][j]);
                    }else{                          //-
                        debug_text += "  ";
                    }
                }else{                                              //空白なら
                    //周囲に線が存在するなら黒
                    if(Ans[i-1][j] == 1){debug_text += print_cell("black", Ans[i][j]);}
                    else if(Ans[i][j-1] == 1){debug_text += print_cell("black", Ans[i][j]);}
                    else if(Ans[i+1][j] == 1){debug_text += print_cell("black", Ans[i][j]);}
                    else if(Ans[i][j+1] == 1){debug_text += print_cell("black", Ans[i][j]);}
                    else{debug_text+="  ";}
                }
            }
            debug_text+="<br>"
        }
        debug_text+="<br>"
        const test = document.getElementById("test");
        test.innerHTML = debug_text;
    };
    Calc[2][3]=1;
    print();
}
/*
    関数Generate_Line(Ｎ)

    引数：マス目の大きさ,ＮｘＮで生成
*/
Generate_Line(4);