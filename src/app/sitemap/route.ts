import { db } from "@/utils/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { FormatSlug } from "@/base/helper/FormatSlug";

const BASE_URL = process.env.NEXT_PUBLIC_URL as string;

async function getBlogSlugs() {
  try {
    const blogRef = collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_BLOG as string
    );
    const querySnapshot = await getDocs(blogRef);
    return querySnapshot.docs.map((doc) => doc.data().slug);
  } catch (error) {
    console.error("Error fetching blog slugs:", error);
    return [];
  }
}

async function getProductTypeCategories() {
  try {
    const productRef = collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCT as string
    );
    const querySnapshot = await getDocs(productRef);
    const typeCategories = new Set<string>();

    querySnapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (data.typeCategory) {
        typeCategories.add(data.typeCategory);
      }
    });

    return Array.from(typeCategories);
  } catch (error) {
    console.error("Error fetching product type categories:", error);
    return [];
  }
}

async function generateSitemap() {
  const blogSlugs = await getBlogSlugs();
  const typeCategories = await getProductTypeCategories();

  const staticUrls = ["", "/about", "/blog", "/contact", "/product"];

  const dynamicUrls = [
    ...blogSlugs.map((slug) => `/blog/${slug}`),
    ...typeCategories.map((type) => `/product/${FormatSlug(type)}`),
  ];

  const urls = [...staticUrls, ...dynamicUrls];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((url) => {
    return `
  <url>
    <loc>${BASE_URL}${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  })
  .join("")}
</urlset>`;

  return sitemapXml;
}

// INI ROUTE HANDLER NEXT 13/14 YANG BENAR UNTUK GENERATE SITEMAP
export async function GET() {
  const body = await generateSitemap();

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
