# Montage Client
## Dockerで環境構築
1. `docker build -t montage-client:1.0 ./`
2. `bash drun.sh montage-client montage-client:1.0`
3. exitで環境から抜ける
4. 再度コンテナに入る場合はｓ `docker exec -it montage-client /bin/bash`

## モジュールのインストール
#### dockerでインストール(推奨)
実行場所：Dockerfileのある場所
`docker exec -it montage-client npm i`

#### src上で `npm i` コマンド

## Webpackでサーバ立ち上げ
1. `npm run start`
2. localhost:1234にアクセスすれば見られる

