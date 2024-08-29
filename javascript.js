function Generate_Grid(Input){
    const N = Input[0].length;
    const SIZE = N*2+1+4;
    let Calc = [];
    let Ans = [];
    for(let i=0; i<SIZE; i++){//二次元配列の宣言
        Calc[i] = [];
        Ans[i] = [];
        for(let j=0; j<SIZE; j++){
            Calc[i][j] = 1;
            Ans[i][j] = 0;
        }
    }
    {   //Calc配列の初期化

    }
    let debug = "";
    const print = function(){//デバッグ用 //id="test"を使用
        const print_cell = function(color, str){
            return `<pre style='background-color:${color};display:inline'>${str.toString().padStart(2, ' ')}</pre>`
        }
        for(let i=0; i<SIZE; i++){
            for(let j=0; j<SIZE; j++){
                if(i<2 || SIZE-3<i || j<2 || SIZE-3<j){             //余白部分
                    debug += print_cell("blue", Calc[i][j]);
                }else if(i%2==1 && j%2==1){                         //マス目
                    debug += print_cell("green", Calc[i][j]);
                }else if((i%2==0 && j%2==1)||(i%2==1 && j%2==0)){   //線なら
                    if(Calc[i][j] == 1){            //○
                        debug += print_cell("black", Calc[i][j]);
                    }else if(Calc[i][j] == -1){     //×
                        debug += print_cell("red", Calc[i][j]);
                    }else{                          //-
                        debug += "  ";
                    }
                }else{                                              //空白なら
                    //周囲に線が存在するなら黒
                    if(Calc[i-1][j] == 1){debug += print_cell("black", Calc[i][j]);}
                    else if(Calc[i][j-1] == 1){debug += print_cell("black", Calc[i][j]);}
                    else if(Calc[i+1][j] == 1){debug += print_cell("black", Calc[i][j]);}
                    else if(Calc[i][j+1] == 1){debug += print_cell("black", Calc[i][j]);}
                    else{debug+="  ";}
                }
            }
            debug += "  ";
            for(let j=0; j<SIZE; j++){
                if(i<2 || SIZE-3<i || j<2 || SIZE-3<j){             //余白部分
                    debug += print_cell("blue", Ans[i][j]);
                }else if(i%2==1 && j%2==1){                         //マス目
                    debug += print_cell("green", Ans[i][j]);
                }else if((i%2==0 && j%2==1)||(i%2==1 && j%2==0)){   //線なら
                    if(Ans[i][j] == 1){            //○
                        debug += print_cell("black", Ans[i][j]);
                    }else if(Ans[i][j] == -1){     //×
                        debug += print_cell("red", Ans[i][j]);
                    }else{                          //-
                        debug += "  ";
                    }
                }else{                                              //空白なら
                    //周囲に線が存在するなら黒
                    if(Ans[i-1][j] == 1){debug += print_cell("black", Ans[i][j]);}
                    else if(Ans[i][j-1] == 1){debug += print_cell("black", Ans[i][j]);}
                    else if(Ans[i+1][j] == 1){debug += print_cell("black", Ans[i][j]);}
                    else if(Ans[i][j+1] == 1){debug += print_cell("black", Ans[i][j]);}
                    else{debug+="  ";}
                }
            }
            debug+="<br>"
        }
        debug+="<br>"
        const test = document.getElementById("test");
        test.innerHTML = debug;
    };
    console.log(Calc);
    print();
    print();
}

const INPUT_GRID = [
    [3,2,3,1],
    [2,2,2,1],
    [2,3,2,1],
    [2,2,2,1],
];
/*
    関数Generate_Grid
完全な状態のマス目から不要部を削除しパズルを出力する

    引数：完全な状態のマス目

*/
Generate_Grid(INPUT_GRID);

// const test = document.getElementById("test");
// test.innerHTML = "<pre style='color:red;display:inline'>AAA</pre>BB<br>CC";