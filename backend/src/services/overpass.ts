import { OVERPASS_API_URL } from '#config';
import type { BBox, OsmElements } from '#types';
import { cache } from '#cache';
import crypto from 'node:crypto';

const generateCacheKey = (query: string): string => {
  const normalizedQuery = query.replace(/\s+/g, ' ').trim();
  return crypto.createHash('sha256').update(normalizedQuery).digest('hex');
};

/* Fetch OSM data from Overpass API based on a custom query */
export async function fetchOsmData(query: string): Promise<OsmElements> {
  console.log('OVERPASS QUERY:', query);

  // Check cache first
  const cacheKey = `overpass:${generateCacheKey(query)}`;

  // console.log('Generated cache key:', cacheKey);
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    // console.log('Cache hit for query');
    return cachedData as OsmElements;
  }

  // console.log('Cache miss for query, fetching from Overpass API');

  console.log('OVERPASS URL:', OVERPASS_API_URL);
  const response = await fetch(OVERPASS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      Accept: 'application/json',
      'User-Agent': 'MapTold/1.0 contact@example.com'
    },
    body: new URLSearchParams({
      data: query
    })
  });

  if (!response.ok) {
    const text = await response.text();
    console.error('OVERPASS ERROR:', response.status, text);
    throw new Error(`Failed to fetch OSM data`, { cause: { status: response.status } });
  }
  const data = (await response.json()) as OsmElements;
  cache.set(cacheKey, data);

  return data;
}

/* Build Overpass query for base layers (buildings, roads, green spaces, water) based on a bounding box */
export function buildBaseLayersQuery(bbox: BBox): string {
  const bboxStr = bbox.join(',');
  return `
          [out:json][timeout:25];
            (
              way["building"]["building"!~"^(garage|shed|annex)$"](${bboxStr});
              relation["building"]["building"!~"^(garage|shed|annex)$"](${bboxStr});
              way["highway"]["highway"!~"^(path|footway|cycleway|track|steps)$"](${bboxStr});
              way["leisure"~"park|garden|playground"](${bboxStr});
              relation["leisure"~"park|garden|playground"](${bboxStr});
              way["landuse"~"forest|grass|meadow"](${bboxStr});
              relation["landuse"~"forest|grass|meadow"](${bboxStr});
              way["natural"~"wood|scrub|heath"](${bboxStr});
              relation["natural"~"wood|scrub|heath"](${bboxStr});
              way["waterway"="river"](${bboxStr});
              way["natural"="water"](${bboxStr});
              relation["natural"="water"](${bboxStr});
            );
            
          out geom;`;
}

/* Build Overpass query for specified POIs based on a bounding box and list of POI types */
export function buildPoisQuery(bbox: BBox, pois: string[]): string {
  const querys: string[] = [];

  for (const poi of pois) {
    const key = poi === 'museum' ? 'tourism' : poi === 'bus_stop' ? 'highway' : 'amenity';
    querys.push(`nwr["${key}"="${poi}"](${bbox.join(',')});`);
  }

  return `
        [out:json][timeout:25];
          (
            ${querys.join('\n')}
          );  
          out geom;`;
}
