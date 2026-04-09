import { useEffect } from "react";
import {
  DEFAULT_KEYWORDS,
  DEFAULT_SEO_DESCRIPTION,
  DEFAULT_SEO_IMAGE,
  SITE_LEGAL_NAME,
  SITE_NAME,
  buildPageUrl,
} from "@/lib/seo";

interface SeoProps {
  title: string;
  description?: string;
  path: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
  noindex?: boolean;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const upsertMeta = (attribute: "name" | "property", key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

const upsertLink = (rel: string, href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
};

const upsertJsonLd = (id: string, data: Record<string, unknown> | Array<Record<string, unknown>>) => {
  let element = document.head.querySelector<HTMLScriptElement>(`script[data-seo-id="${id}"]`);

  if (!element) {
    element = document.createElement("script");
    element.type = "application/ld+json";
    element.dataset.seoId = id;
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
};

const Seo = ({
  title,
  description = DEFAULT_SEO_DESCRIPTION,
  path,
  image = DEFAULT_SEO_IMAGE,
  keywords = DEFAULT_KEYWORDS,
  type = "website",
  noindex = false,
  schema,
}: SeoProps) => {
  useEffect(() => {
    const canonicalUrl = buildPageUrl(path);
    const fullTitle = `${title} | ${SITE_NAME}`;
    const robots = noindex
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

    document.title = fullTitle;
    document.documentElement.lang = "es";

    upsertMeta("name", "description", description);
    upsertMeta("name", "keywords", keywords.join(", "));
    upsertMeta("name", "author", SITE_LEGAL_NAME);
    upsertMeta("name", "robots", robots);
    upsertMeta("name", "googlebot", robots);
    upsertMeta("name", "theme-color", "#081225");

    upsertMeta("property", "og:locale", "es_EC");
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:image:alt", `${SITE_NAME} - ${title}`);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);

    upsertLink("canonical", canonicalUrl);

    if (schema) {
      upsertJsonLd("page-schema", schema);
    }
  }, [description, image, keywords, noindex, path, schema, title, type]);

  return null;
};

export default Seo;
