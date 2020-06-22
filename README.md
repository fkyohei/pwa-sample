# PWAサンプルアプリケーション

https環境下での動作確認をしたい、かつ、スマホ実機でも確認をしたいため、Github pagesを使用。

[https://fkyohei.github.io/pwa-sample/](https://fkyohei.github.io/pwa-sample/)

## v1.3時点
- Service Workerが正常に認識されている状態
- Androidスマホで「ホーム画面に追加」が表示され、実際に追加でき（manifest.jsonで指定のアイコンが正しくデバイス上で表示される）、開くことができる状態  
「ホーム画面に追加」は自動で出る仕様(ブラウザのバージョンによって異なる条件が異なるっぽい)
- iPhone未対応

## v2.4時点
- オフライン対応（仮）
- iPhone対応

## note
### manifest.json
- name: スプラッシュ画面に表示されるアプリケーション名
- short_name: ホームに表示されるアプリケーション略名
- theme_color: アプリケーション上部ナビゲーションバーの色(スプラッシュ画面表示時だけしか反映されないっぽい挙動)
- background_color: スプラッシュ画面の背景色(スプラッシュ画面表示時だけしか反映されないっぽい挙動)
- display: browser, minimal-ui, standalone, fullscreenの4種類があり、standaloneが一番ネイティブアプリに近いUI
- アイコン自動生成: [https://app-manifest.firebaseapp.com/](https://app-manifest.firebaseapp.com/)
- 一度ホーム画面に追加すると、manifest.jsonを変更しても自動で更新されない（例えば色変更しても反映されなかった。変更方法があるのかもしれない）  
→ 反映されるまでに少し時間がかかったが更新はされた