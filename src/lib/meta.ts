import { useEffect } from "react";

type MetaOptions = {
  robots?: string;
};

export function useDocumentMeta(
  title: string,
  description?: string,
  options?: MetaOptions,
) {
  useEffect(() => {
    document.title = title;
    setMetaTag("property", "og:title", title);
    setMetaTag("name", "twitter:title", title);
  }, [title]);

  useEffect(() => {
    if (!description) return;
    setMetaTag("name", "description", description);
    setMetaTag("property", "og:description", description);
    setMetaTag("name", "twitter:description", description);
  }, [description]);

  useEffect(() => {
    if (!options?.robots) return;
    setMetaTag("name", "robots", options.robots);
  }, [options?.robots]);
}

function setMetaTag(attr: "name" | "property", key: string, content: string) {
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}
