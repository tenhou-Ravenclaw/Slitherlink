import { Generate } from "./generate.js";

/*
    関数Generate(Ｎ)

    引数：マス目の大きさ,ＮｘＮで生成
    戻り値：ＮｘＮのパズルを返す
            空白マスは-1で表現
*/
let Quiz = Generate(4);
console.log(Quiz);