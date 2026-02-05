import { z } from 'zod/v4';
import { Types } from 'mongoose';

export * from './question.ts';
export * from './zone.ts';

export const geoFeatureSchema = z.object({
  type: 'Feature',
  geometry: {
    type: z.enum(['Polygon', 'LineString']),
    coordinates: z.array(z.tuple([z.number(), z.number()]))
  },
  properties: z.record(z.string(), z.any())
});

export const geoFeatureCollectionsSchema = z.object({
  features: z.array(geoFeatureSchema)
});

export const geoResponseSchema = z.object({
  zoneId: z.instanceof(Types.ObjectId),
  layers: {
    buildings: geoFeatureCollectionsSchema,
    roads: geoFeatureCollectionsSchema,
    greenAreas: geoFeatureCollectionsSchema
  },
  elevation: {
    avg: z.number()
  },
  weather: {
    temperature: z.number()
  },
  aiText: z.string()
});

export const osmElementSchema = z.object({
  type: z.enum(['way', 'node', 'relation']),
  id: z.number(),
  tags: z.record(z.string(), z.string()).optional(),
  geometry: z
    .array(
      z.object({
        lat: z.number(),
        lon: z.number()
      })
    )
    .optional()
});

export const osmElementsSchema = z.object({
  elements: z.array(osmElementSchema)
});

export const opentopodataSchema = z.object({
  results: z.array(
    z.object({
      elevation: z.number(),
      location: z.object({
        lat: z.number(),
        lng: z.number()
      })
    })
  )
});

export const openMeteoSchema = z.object({
  current: z.object({
    time: z.date(),
    temperature_2m: z.number(),
    relative_humidity_2m: z.number(),
    precipitation: z.number(),
    wind_speed_10m: z.number(),
    snowfall: z.number(),
    is_day: z.boolean()
  }),
  daily: z.object({
    time: z.array(z.date()),
    temperature_2m_max: z.array(z.number()),
    temperature_2m_min: z.array(z.number()),
    sunshine_duration: z.array(z.number())
  })
});
