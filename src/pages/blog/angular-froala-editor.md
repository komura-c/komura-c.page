---
layout: "../../layouts/BlogPost.astro"
title: "AngularでFroalaEditorを使う"
description: "AngularでFroalaEditorを使う"
tags: "Angular"
pubDate: "2020-08-28 00:00:00 +0900"
heroImage: ""
draft: false
createdDate: "2020-08-28 00:00:00 +0900"
updatedDate: "2020-08-28 00:00:00 +0900"
---

AngularでWYSIWYGEditorを使うには、個人的にはFroalaEditorがおすすめです。
（ただし、powered byやunlisensed表記を消すにはライセンスを購入する必要があります）

完全無料で運用したい場合は、
カスタマイズ性が高い[ngx-quill](https://www.npmjs.com/package/ngx-quill)[Quillによるリッチテキストエディター実装](https://to.camp/lesson?v=iUpgsBJ0ETQDlpRdXygv)

あるいは引用ボタンがなく、画像アップロードがREST APIでもよい場合は[angular-editor](https://www.npmjs.com/package/@kolkov/angular-editor)がおすすめです。

## Froala Editorの使い方
まず、[公式ドキュメント](https://github.com/froala/angular-froala-wysiwyg#use-with-angular-cli)に沿って導入します。
AngularFroalaEditorでは、optionsというプロパティを用意し、その中でいろんなことを定義します。optionにはeventというプロパティがあり、様々なイベントの前後で何かを行うことができます。指定されたthird-partyのpluginなども入れられます。
それっぽいものを
[Options - Froala](https://froala.com/wysiwyg-editor/docs/options)
[Events - Froala](https://froala.com/wysiwyg-editor/docs/events)
[Plugins - Froala](https://froala.com/wysiwyg-editor/docs/plugins/)
から見つけ出して、入れてみるとできます。

## 詰まりどころと画像のアップロード
自分自身が詰まったところを共有します。
イベントですが、[Events - Froala](https://froala.com/wysiwyg-editor/docs/events)の通りに定義するとAngularFroalaEditorでは、かなり難しいことになります。

例えば画像のアップロード前のイベントですが、 function (images)というドキュメントの通りだとthisの中身が勝手にFroalaEditor自体にされ、コンポーネントで使用するthisが使えなくなってしまいます。
そのため、アロー関数にする必要があります。
```ts
events: {
    'image.beforeUpload': (images) => {
      // Do something here.
      console.log(this);
       console.log(images);
    }
  }
```
しかし、問題があります。画像アップロードイベントでは、FroalaEditor自体にダウンロードURLを入れ込む必要があるためです。
なので、最初のinitializeのイベントのタイミングで変数にFroalaEditorを入れておきます。
```ts
    events: {
      initialized: (editor) => {
        this.froalaEditor = editor;
      },
```
あとは画像を受け取った 'image.beforeUpload'の中で[画像をアップロード](https://to.camp/lesson?v=F1jN8YkhGDyBQqdqYvbr)し、返ってきたURLをFroalaEditor自体に入れ込みます。以下の形式で読み込ませるとFroalaEditor内に画像がインサートされます。参考→[How to upload image to firebase storage and render image on editor?](https://github.com/froala/angular-froala-wysiwyg/issues/114)
```ts
this.froalaEditor._editor.image.insert(downloadURL, null, null, this.froalaEditor._editor.image.get());
```
