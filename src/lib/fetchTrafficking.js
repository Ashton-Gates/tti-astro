import 'dotenv/config';

export async function fetchTraffickingPatterns() {
  const url = `${process.env.STRAPI_URL}/api/trafficking-patterns?populate=*`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_KEY_TRAFFICKING}`
      }
    });

    if (!res.ok) {
      console.error('Failed to fetch trafficking patterns:', res.statusText);
      return [];
    }

    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error('Strapi fetch failed:', err.message);
    return [];
  }
}