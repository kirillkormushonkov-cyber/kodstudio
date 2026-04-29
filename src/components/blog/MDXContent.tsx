import * as React from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { Callout } from "@/components/blog/Callout";

export async function MDXContent({ source }: { source: string }) {
  const { content } = await compileMDX({
    source,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypePrettyCode,
            {
              theme: "github-dark-dimmed",
              keepBackground: false,
              defaultLang: "plaintext",
            },
          ],
        ],
      },
    },
    components: {
      Callout,
    },
  });

  return <div className="prose-blog">{content}</div>;
}
