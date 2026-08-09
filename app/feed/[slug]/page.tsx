import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { FeedPostPage } from "@/components/feed/FeedPostPage";
import { FEED_POSTS, getFeedPost } from "@/components/feed/data";

export function generateStaticParams() {
  return FEED_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getFeedPost(slug);

  if (!post) {
    return {};
  }

  const canonical = `${SITE_URL}/feed/${post.slug}/`;

  return {
    title: post.title,
    description: post.dek,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.dek,
      url: canonical,
      siteName: "WIG-log",
      type: "article",
      publishedTime: post.date,
      images: [{ url: `${SITE_URL}${post.cover.src}` }],
    },
  };
}

export default async function FeedPostRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <FeedPostPage slug={slug} />;
}
