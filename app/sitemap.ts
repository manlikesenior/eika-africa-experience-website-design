import type { MetadataRoute } from "next"

const BASE_URL = "https://www.eikafricaexperience.com"

const tours = [
  "3-days-masai-mara",
  "3-days-naivasha",
  "zanzibar-dar-es-salaam",
  "ultimate-kenya-safari",
  "adventure-safari",
  "nanyuki-adventure",
]

const pages = [
  { url: "", priority: 1, changeFrequency: "weekly" as const },
  { url: "/experiences", priority: 0.9, changeFrequency: "weekly" as const },
  { url: "/services", priority: 0.8, changeFrequency: "monthly" as const },
  { url: "/about", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/booking", priority: 0.9, changeFrequency: "daily" as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = pages.map((page) => ({
    url: `${BASE_URL}${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))

  const tourPages = tours.map((tour) => ({
    url: `${BASE_URL}/experiences/${tour}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }))

  return [...staticPages, ...tourPages]
}
