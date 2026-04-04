import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // Ganti dengan URL Netlify Anda
  const baseUrl = "https://adrianalfauzan-dev.netlify.app";

  // Daftar semua halaman penting di website Anda
  const routes = ["", "/guestbook", "/crud"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Tambahkan halaman lain jika ada (contoh: proyek, tentang, dll)
  // const projectRoutes = projects.map((project) => ({
  //   url: `${baseUrl}/projects/${project.slug}`,
  //   lastModified: new Date(),
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.6,
  // }))

  return [...routes];
}
