import gf from 'good-friends-colors'
// 既存のカラーパレットからのデータ利用ができていない
import * as template from './template';

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

const queryColor: rgbColor = {r:26,g:140,b:90}
const rgbColors: rgbColor[] = [
  {r:10,g:10,b:10},{r:20,g:20,b:20},{r:30,g:30,b:30},{r:40,g:40,b:40}
]

// 以下、カラーパレット増えた場合の将来実装：
// 当該関数を全てのカラーパレット/メインカラーについて行うと重くなってしまうので、事前にカラーパレット/メインカラーを何種類かの色グループに分け、
// queryColorがどれらの色グループに所属するのかという判定を行い、当該色グループに含まれるカラーパレットをtargetColorsとする処理が必要になる
function colorSimilarityCalcAndSort(queryColor: rgbColor, targetColors: rgbColor[] ):colorProperties[]{
  const descendingSimilarColorList: colorProperties[] = []
  // for (var targetColor of targetColors){
  for (var i=1;i<= targetColors.length;i++){
    var colorProperties: colorProperties = {
      color: targetColors[i-1],
      similarity: gf(queryColor).diff(targetColors[i-1]),
      id: i.toString()
    }
    descendingSimilarColorList.push(colorProperties)
  }
  
  descendingSimilarColorList.sort((a:colorProperties, b:colorProperties) => a["similarity"] - b["similarity"]);
  return descendingSimilarColorList
}