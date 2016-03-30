## jp.co.japacom.myapp

## 概要
Node.JS + Express + AngularJS + MongoDB のサンプルサイト

## 前提条件
- Node.JS インストール済
- Express インストール済
- MongoDB インストール済
- npm インストール済（コマンドラインから実行できる状態）
- bower インストール済 （コマンドラインから実行できる状態）

## 実行手順

１．GitHubよりソースを取得しローカルに展開する。

　※ver.0.0.1 タグのソースを対象としています。
　

２．``npm install`` コマンドを実行する。

　※コマンドはソースを展開したルートフォルダで実行してください。


３．``bower install`` コマンドを実行する。

　※コマンドはソースを展開したルートフォルダで実行してください。


４．MongoDB のサービスを起動し初期ユーザを登録する。

```
mongo
> use mydb
```


５．``npm start`` コマンドを実行する。

　※コマンドはソースを展開したルートフォルダで実行してください。



６．[http://localhost:3000/](http://localhost:3000/) にアクセスする。

