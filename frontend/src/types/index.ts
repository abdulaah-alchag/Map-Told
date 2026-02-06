import { z } from 'zod';

/* ───────── Session-Context ───────── */

export type SessionContextType = {
  locationform: LocationFormType;
  dispatchLocationForm: React.Dispatch<LocationFormActionType>;
};

/* ───────── Location-Form ─────────── */

export const AddressSchema = z.object({
  street: z.string().nullable(),
  house: z.string().nullable(),
  city: z.string().nullable(),
  postalcode: z.string().nullable(),
});

export const CoordinatesSchema = z.object({
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
});

export const MaskSchema = z.enum(['address', 'coordinates']);

export const LocationFormSchema = z.object({
  pending: z.boolean(),
  data: z.object({
    address: AddressSchema,
    coordinates: CoordinatesSchema,
  }),
  mask: MaskSchema,
});

export const LocationFormActionSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('SET_PENDING'),
    payload: z.boolean(),
  }),
  z.object({
    type: z.literal('SET_MASK'),
    payload: MaskSchema,
  }),
  z.object({
    type: z.literal('SET_ADDRESS'),
    payload: AddressSchema,
  }),
  z.object({
    type: z.literal('SET_COORDINATES'),
    payload: CoordinatesSchema,
  }),
]);

export type AddressType = z.infer<typeof AddressSchema>;
export type CoordinatesType = z.infer<typeof CoordinatesSchema>;
export type MaskType = z.infer<typeof MaskSchema>;
export type LocationFormType = z.infer<typeof LocationFormSchema>;
export type LocationFormActionType = z.infer<typeof LocationFormActionSchema>;
