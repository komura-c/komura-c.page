---
title: "Github-Flowと自分がよく使うGithubコマンド"
description: "Github-Flowと自分がよく使うGithubコマンド"
tags: "GitHub"
pubDate: "2020-07-02 23:39:35 +0900"
heroImage: ""
draft: false
createdDate: "2020-07-02 23:39:36 +0900"
updatedDate: "2020-07-05 01:01:44 +0900"
---

## Github-Flow

1. 作業内容を書いてissue立てる
2. ローカルのリモートブランチorigin/masterからローカルのfeature/xxx(issue番号)ブランチを作成
3. 作成したブランチに切り替えて作業
4. 作業をステージング（VScodeの場合は左上の+押すだけ）
5. コミットメッセージをfeature(変更箇所): 内容またはfix(変更箇所): 内容などとしてコミット
6. ローカルのfeature/xxxブランチからリモートのorigin feature/xxxブランチにプッシュする（コマンド: git push origin feature/xxx）
7. プルリクのDetailに作業内容, Imageにスクショを貼って、ご確認お願いしますと記述、プルリクを出す
8. プルリクがmargeされたら、issueをクローズ。（プルリク時にfix #(issue番号)と記述すると自動でクローズしてくれる）
9. フェッチ（コマンド: git fetch —prune）をする（リモートで削除されているローカルのリモートブランチを削除してくれる）
10. 1〜9を繰り返す

## よく使うGitコマンド

#### 直前のコミットのみを取り消す(作業内容は残す)
git reset --soft HEAD^

#### コミット履歴をみる
git reflog

#### git reset --soft HEAD^で取り消した変更を戻す
git reset --soft HEAD@{1}

#### ブランチ名を変える
git branch -m <新しいブランチ名>
※ローカルのmasterをブランチ名変えただけだとVScode上でpushしようとした時にorigin/masterにpushしようとしてできないのでgit push origin feature/xxxコマンドでリモートブランチにpushする
