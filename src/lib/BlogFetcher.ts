import jsdom from "jsdom";
import type { Article } from "../types/Article";

const excludeHatenaGuidList = [
  "4207112889932952200",
  "4207112889933743643",
  "4207112889935683885",
  "4207112889940526141",
  "4207112889940907890",
];

export async function blogFetcher(url: string): Promise<Article[]> {
  const fetchURL = new URL(url);
  const response = await fetch(fetchURL);
  const resText = await response.text();
  const parsedDom = new jsdom.JSDOM(resText, {
    contentType: "text/xml",
  });

  if (fetchURL.hostname === "qiita.com") {
    const entries = parsedDom.window.document.querySelectorAll("entry");
    return Array.from(entries).map((entry) => {
      return {
        title: entry.querySelector("title")?.textContent ?? "タイトル不明",
        url: entry.querySelector("url")?.textContent ?? "URL不明",
        pubDate: entry.querySelector("published")?.textContent ?? "公開日不明",
        isMySite: false,
      };
    });
  }

  const items = parsedDom.window.document.querySelectorAll("item");
  let itemArray = Array.from(items);
  if (fetchURL.hostname === "tech-blog.voicy.jp") {
    itemArray = itemArray.filter((item) => {
      const guidLink = item.querySelector("guid")?.textContent ?? null;
      if (!guidLink) return false;
      const matchArray = guidLink.match(/hatenablog:\/\/entry\/(\d+$)/);
      if (!matchArray) return false;
      const guid = matchArray[1] ?? null;
      if (!guid) return false;
      return !excludeHatenaGuidList.find(
        (excludeHatenaGuid) => excludeHatenaGuid === guid
      );
    });
  }

  return itemArray.map((item) => {
    return {
      title: item.querySelector("title")?.textContent ?? "タイトル不明",
      url: item.querySelector("link")?.textContent ?? "URL不明",
      pubDate: item.querySelector("pubDate")?.textContent ?? "公開日不明",
      isMySite: false,
    };
  });
}
