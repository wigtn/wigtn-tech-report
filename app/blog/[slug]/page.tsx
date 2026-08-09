import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { BlogPostPage } from "@/components/blog/BlogPostPage";
import { BLOG_POSTS, getBlogPost } from "@/components/blog/data";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {};
  }

  const canonical = `${SITE_URL}/blog/${post.slug}/`;

  return {
    title: `${post.title} | WIGTN Tech`,
    description: post.dek,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.dek,
      url: canonical,
      siteName: "WIGTN Tech",
      type: "article",
      publishedTime: post.date,
      images: [{ url: `${SITE_URL}${post.cover.src}` }],
    },
  };
}

export default async function BlogPostRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BlogPostPage slug={slug} />;
}
