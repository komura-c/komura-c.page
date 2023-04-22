import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "../config";
import { getCollection } from "astro:content";

export async function get() {
  const blogEntries = await getCollection("blog", ({ data }) => {
    return data.draft !== true;
  });
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: import.meta.env.SITE,
    items: blogEntries.map((entry) => ({
      title: entry.data.title,
      pubDate: entry.data.pubDate,
      description: entry.data.description,
      link: `/blog/${entry.slug}/`,
    })),
    customData: `<language>ja</language>`,
  });
}
