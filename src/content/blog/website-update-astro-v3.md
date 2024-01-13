---
title: "当サイトをAstro3.0にアップデートしました🎉"
description: "当サイトをAstro3.0にアップデートしました🎉"
tags: "Astro"
pubDate: "2023-09-01 01:57:35 +0900"
heroImage: ""
draft: false
createdDate: "2023-09-01 01:57:35 +0900"
updatedDate: "2023-09-01 01:57:35 +0900"
---

## はじめに

[Astro 3.0 | Astro](https://astro.build/blog/astro-3/)を見ました。
View Transitions APIがMPAでも使えるという話が出てきていて、そろそろ試そうかと思っていた頃だったので、
Astro View Transitionsという表記に惹かれました。
また、リリースブログでこのようにメタフレームワークがサポートするというのが僕が見る限り初めてだったこともあり、
試してみることにしました。

## Astro2.3からのアップデート
まず、このサイトはAstroでSSGをしているのですが、Astroのバージョンがastro@1.9.2→2.3.0に4月に上げてから触れていなかったのでアップデートしました。
astro@2.0.0からで[Content Collections](https://docs.astro.build/en/guides/content-collections/)という機能が入り、
この移行は少し変更が多かったですが、今回は比較的少なく移行ができました。
astroはドキュメントが充実しているので、
[Upgrade to Astro v3](https://docs.astro.build/en/guides/upgrade-to/v3/)に沿って影響ある箇所を数行変更するだけで、移行ができました。

## Astro View Transitions
いよいよ本題です。
[Astro View Transitions](https://docs.astro.build/en/guides/view-transitions/)を見ながらAstro上でView Transitionsを使いました。

はじめに、headタグの中でAstroが用意してくれているViewTransitionsのComponentを記述します。
また、transitionを明示的に指定した箇所のみ適応するためにhtmlタグに`transition:animate="none"`属性を記述します。
```astro
--
import { ViewTransitions } from 'astro:transitions';
--

<html lang="ja" transition:animate="none">
  <head>
    <ViewTransitions />
  </head>
```
Animationをカスタムしない場合は、ビルトインで`fade`と`slide`があるのでどちらかを使用します。
```astro
--
import { fade } from "astro:transitions";
--
  <main transition:animate={fade({ duration: '0.5s' })}>
```
もうこれだけで、ページ遷移時に指定したViewTransitionのアニメーションが動いてくれます。
ただ、ViewTransitionAPIの凄い所の1つは指定した要素をリッチに遷移させることができることです。
次のように、`transition:name`属性を遷移前と遷移後のページで指定します。(遷移前と遷移後のページ双方で一意でないと上手く要素が特定できないため、動きません)
```astro
<time datetime={post.pubDate} transition:name={"blog-pub-date-" + post.slug}>
```
すると、このWebサイトのようなアニメーションが実現できます。
ちなみに、iOSのSafariがViewTransitionに対応していないため、[fallbackオプション](https://docs.astro.build/ja/guides/view-transitions/#%E3%83%95%E3%82%A9%E3%83%BC%E3%83%AB%E3%83%90%E3%83%83%E3%82%AF%E3%81%AE%E5%88%B6%E5%BE%A1)で遷移アニメーションを無効にするなどの対応ができます。
```astro
<ViewTransitions fallback="swap">
```

## おわりに
このページの遷移を確認したいために、新しく記事を書こうと思って凄く雑に書いてみました。
コードは[komura-c/komura-c.github.io](https://github.com/komura-c/komura-c.github.io)にあります。

紹介しなかった機能としては、ViewTransitionsのAnimationはカスタムで作ることができて拡張性があることや、Astroでは`transition:persist`属性をタグに付与することで、ページ間でそのHTML要素の状態を維持できるなどの機能があるなどがあります。
ViewTransitionsAPIは、まだExperimentalではありますが、MPAでもSPAのような遷移ができかなり便利なAPIなので、
ブラウザ対応が進めば一般的に使われ、SPAのみを選択するケースはより少なくなっていくのかなと感じました。
ここまで読んでいただきありがとうございました。
