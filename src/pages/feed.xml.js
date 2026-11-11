import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('posts', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
  return rss({
    title: 'ESHRAQ',
    description: 'Devlog and random thoughts',
    site: context.site,
    items: posts.slice(0, 20).map((p) => ({
      title: p.data.title,
      description: p.data.description ?? p.data.subtitle ?? '',
      pubDate: p.data.date,
      author: p.data.author,
      link: `/${p.id}/`,
    })),
  });
}
