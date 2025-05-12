// /src/pages/api/trafficking.js
import { fetchTraffickingPatterns } from '../../lib/fetchTrafficking.js';

export async function GET() {
  const data = await fetchTraffickingPatterns();
  return new Response(JSON.stringify({ data }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}