import type { Article } from "../types/Article";
import { blogFetcher } from "./BlogFetcher";

const myHatenaArticles = blogFetcher("https://komura-c.hatenablog.com/rss");
const companyHatenaArticles = blogFetcher(
  "https://tech-blog.voicy.jp/rss/author/komura_c"
);
const myZennArticles = blogFetcher("https://zenn.dev/komura_c/feed");
const myQiitaArticles = blogFetcher("https://qiita.com/komura_c/feed");

let isLoading = false;
const fetchAwaits: ((value: Article[] | PromiseLike<Article[]>) => void)[] = [];
const allOuterPosts: Article[] = [];

export function getAllOuterPosts(): Promise<Article[]> {
  return new Promise((resolve, reject) => {
    if (allOuterPosts.length) {
      resolve(allOuterPosts);
    } else if (isLoading) {
      fetchAwaits.push(resolve);
    } else {
      isLoading = true;

      Promise.allSettled([
        myHatenaArticles,
        companyHatenaArticles,
        myZennArticles,
        myQiitaArticles,
      ]).then((allResult) => {
        allResult.forEach((result) => {
          if (result.status === "fulfilled") {
            allOuterPosts.push(...result.value);
          } else {
            reject(result.reason);
          }
        });

        resolve(allOuterPosts);

        fetchAwaits.forEach((resolveFunction) => {
          resolveFunction(allOuterPosts);
        });

        isLoading = false;
      });
    }
  });
}
