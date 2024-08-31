function Check_Ans(Input){
    const DEDGUB = false;
    const N = Input[0].length;
    const SIZE = N+4;
    let Calc = [];
    {
        for(let i=0; i<SIZE; i++){
            Calc[i] = [];
            for(let j=0; j<SIZE; j++){
                Calc[i][j] = 0;
            }
        }
        for(let i=0; i<N; i++){
            for(let j=0; j<N; j++){
                Calc[i+2][j+2] = Input[i][j];
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
            debug_text+="<br>"
        }
        debug_text+="<br>"
        const test = document.getElementById("test");
        test.innerHTML = debug_text;
    };
    print();
    {
        let not = [];
        for(let i=3; i<SIZE-3; i+=2){
            for(let j=3; j<SIZE-3; j+=2){
                let cnt=0;
                if(Calc[i-1][j] == 1)cnt++;
                if(Calc[i][j-1] == 1)cnt++;
                if(Calc[i+1][j] == 1)cnt++;
                if(Calc[i][j+1] == 1)cnt++;
                if(cnt != Calc[i][j] && Calc[i][j] != -1)
                    not.push([i-2, j-2]);
            }
        }
        if(DEDGUB)console.log(not);
        if(not.length != 0)return not;
    }
    let cnt=0;
    for(let i=2; i<SIZE-2; i++){
        for(let j=(i+1)%2+2; j<SIZE-2; j+=2){
            if(Calc[i][j]==1)cnt++;
        }
    }
    let s_i=2, s_j=0;
    for(s_j=2; s_j<SIZE-2; s_j+=1){
        if(Calc[s_i][s_j] == 1)break;
    }
    s_j-=1;               //空白マスに移動
    let Way = 2;  //右の選択肢
    let n_i=s_i, n_j=s_j+2;
    for(let k=0; k<cnt-1; k++){
        if(Calc[n_i-1][n_j]==1 && Way!=1){n_i-=2; Way=3;}
        else if(Calc[n_i][n_j-1]==1 && Way!=2){n_j-=2; Way=4;}
        else if(Calc[n_i+1][n_j]==1 && Way!=3){n_i+=2; Way=1;}
        else if(Calc[n_i][n_j+1]==1 && Way!=4){n_j+=2; Way=2;}
    }
    if(n_i==s_i && n_j==s_j)return true;
    else return false;
}
export {Check_Ans};