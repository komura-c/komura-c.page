import rss from "@astrojs/rss";
import { BLOG_SITE_TITLE, BLOG_SITE_DESCRIPTION } from "../../config";
import { getCollection } from "astro:content";

export async function get() {
  const blogEntries = await getCollection("blog", ({ data }) => {
    return data.draft !== true;
  });
  return rss({
    title: BLOG_SITE_TITLE,
    description: BLOG_SITE_DESCRIPTION,
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
