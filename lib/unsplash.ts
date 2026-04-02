export async function fetchCoverImage(query: string): Promise<string | null> {
  try {
    const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&content_filter=high`;
    const res = await fetch(url, {
      headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.urls?.regular ?? null;
  } catch {
    return null;
  }
}
