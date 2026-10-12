import type { MetadataRoute } from "next";

const siteUrl = "https://www.homeatoutfaire30.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: "2026-10-12",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/plomberie`,
      lastModified: "2026-10-11",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/electricite`,
      lastModified: "2026-10-11",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/peinture`,
      lastModified: "2026-10-11",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/menuiserie`,
      lastModified: "2026-10-11",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/entretien-piscine`,
      lastModified: "2026-10-11",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/depannage`,
      lastModified: "2026-10-11",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/residences-secondaires-gites`,
      lastModified: "2026-10-12",
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}