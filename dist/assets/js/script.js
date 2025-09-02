// //関数定義
// const myFunc = function(src){
//     //Promiseオブジェクトを生成して返す
//     return new Promise(function(resolve, reject){
//         //Imageオブジェクトを生成
//         const image = new Image();
//         //読み込む画像を設定（関数の引数で取得した画像パスを代入）
//         image.src = src;
//         //onloadで画像読み込み完了後に処理
//         image.onload = function(){
//             //成功時にthenの処理へ
//             resolve(image);
//         }
//         //onerrorで画像読み込みエラー時に処理
//         image.onerror = function(error){
//             //失敗時にcatchの処理へ
//             reject(error);
//         }
//     });
// }

// //ページ内のimg要素を取得
// const imgs = document.getElementsByTagName('img');

// //img要素の数だけ繰り返し処理
// for (const img of imgs) {
//     //img要素のsrc属性の値を取得
//     const src = img.getAttribute('src');
    
//     //関数実行
//     myFunc(src)
//     //読み込みが完了した（画像が設定された）Imageオブジェクトを受け取って処理
//     .then(function(res){
        
//         //【追加】img要素にwidth属性が設定されていなければ処理
//         if(!img.hasAttribute('width')){
//             //img要素のwidth属性に値を設定
//             img.setAttribute('width', res.width);
//         }
        
//         //【追加】img要素にheight属性が設定されていなければ処理
//         if(!img.hasAttribute('height')){
//             //img要素のheight属性に値を設定
//             img.setAttribute('height', res.height);
//         }
//     })
//     //画像読み込みエラー時の処理
//     .catch(function(error){
//         console.log(error);
//     });
// }