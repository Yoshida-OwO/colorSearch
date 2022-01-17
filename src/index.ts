import gf from 'good-friends-colors'
import rgbToSinHSV from "./function"
// 既存のカラーパレットからのデータ利用ができていない
// import * as template from './template';

type rgbColor = {
  r: number;
  g: number;
  b: number;
}
type colorProperties = {
  color: rgbColor;
  similarity: number;
  id: string;
}

// テスト用データ
// const isSearchColorLight: boolean = false;
// const queryColor: rgbColor = {r:26,g:140,b:90}
// var testColors: rgbColor[] = [
//   {r:204,g:20,b:20},
//   {r:230,g:161,b:161},
//   {r:217,g:54,b:54},
//   {r:27,g:179,b:148},
//   {r:182,g:242,b:230},
//   {r:27,g:179,b:148},
//   {r:172,g:229,b:230},
// ]
// const rgbColors: rgbColor[] = [
//   {r:10,g:10,b:10},{r:20,g:20,b:20},{r:30,g:30,b:30},{r:40,g:40,b:40}
// ]


// 以下、カラーパレット増えた場合の将来実装：
// 当該関数を全てのカラーパレット/メインカラーについて行うと重くなってしまうので、事前にカラーパレット/メインカラーを何種類かの色グループに分け、
// queryColorがどれらの色グループに所属するのかという判定を行い、当該色グループに含まれるカラーパレットをtargetColorsとする処理が必要になる
function colorSimilarityCalcAndSort(queryColor: rgbColor, targetColors: rgbColor[], isSearchColorLight: boolean):colorProperties[]{
  const descendingSimilarColorList: colorProperties[] = []
    for (var i=1;i<= targetColors.length;i++){
      // 濃淡による場合分け
      if (isSearchColorLight && isColorLight(targetColors[i-1]) || !isSearchColorLight && !isColorLight(targetColors[i-1])){

        var colorProperties: colorProperties = {
          color: targetColors[i-1],
          similarity: gf(queryColor).diff(targetColors[i-1]),
          // idを中で振っているが、template.jsには既に存在するのでそちらを利用のこと（元ファイルにはidがちゃんと振られていないので、こちらのものを利用）
          id: i.toString()
        }
        descendingSimilarColorList.push(colorProperties)
      }
    }
  
  descendingSimilarColorList.sort((a:colorProperties, b:colorProperties) => a["similarity"] - b["similarity"]);
  return descendingSimilarColorList
}

// 別ファイルに分けて下せえ
function isColorLight(color: rgbColor):boolean {
  if (rgbToSinHSV(color["r"],color["g"],color["b"]) < 0.5){
    return true
  }
  else{
    return false
  }
}

// console.log(colorSimilarityCalcAndSort(queryColor, testColors, isSearchColorLight))
