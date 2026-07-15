export function getSafeImageUrl(url?: string): string {
  const fallback = "https://images.unsplash.com/photo-1493238792000-8113da705763?w=800";
  if (!url) return fallback;
  try {
    const parsed = new URL(url);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return url;
    }
    return fallback;
  } catch {
    return fallback;
  }
}