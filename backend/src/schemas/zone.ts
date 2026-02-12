import { z } from 'zod/v4';

export const zoneInputSchema = z.strictObject({
  coordinates: z.object({
    lat: z.number({ error: 'Latitude must be a number' }).refine(val => val >= -90 && val <= 90, {
      message: 'Latitude must be between -90 and 90'
    }),
    lon: z.number({ error: 'Longitude must be a number' }).refine(val => val >= -180 && val <= 180, {
      message: 'Longitude must be between -180 and 180'
    })
  })
});
