# pool

CSV データを用途別の HTML ビューで表示する、Vanilla JavaScript のサイトです。

## 構成

- `data/`: 表示元となる CSV を配置します。
- `views/`: CSV ごとの表示ロジックを持つ HTML を配置します。
- `js/common.js`: CSV の取得・解析など、各ビューで共有する処理を提供します。

新しいデータを追加するときは、たとえば `data/history.csv` に対応する
`views/history.html` を作成し、トップページからリンクしてください。

## ローカルでの確認

`fetch()` を使用するため、ファイルを直接開かず HTTP サーバー経由で閲覧します。

```sh
python3 -m http.server 8000
```

その後、`http://localhost:8000/` を開いてください。
