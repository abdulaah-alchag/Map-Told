import { z } from 'zod';

/* ───────── Session-Context ───────── */

export type SessionContextType = {
  locationform: LocationFormType;
  dispatchLocationForm: React.Dispatch<LocationFormActionType>;
};

/* ───────── Location-Form ─────────── */

export const LocationFormMaskSchema = z.enum(['address', 'coordinates']);

export const LocationFormInputsSchema = z.object({
  street: z.string().nullable(),
  house: z.string().nullable(),
  city: z.string().nullable(),
  postcode: z.string().nullable(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
});

export const LocationFormSchema = z.object({
  mask: LocationFormMaskSchema,
  inputs: LocationFormInputsSchema,
  pending: z.boolean(),
});

export const LocationFormActionSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('SET_MASK'),
    payload: LocationFormMaskSchema,
  }),
  z.object({
    type: z.literal('UPDATE_DATA'),
    payload: LocationFormInputsSchema,
  }),
]);

export type LocationFormInputsType = z.infer<typeof LocationFormInputsSchema>;
export type LocationFormMaskType = z.infer<typeof LocationFormMaskSchema>;
export type LocationFormType = z.infer<typeof LocationFormSchema>;
export type LocationFormActionType = z.infer<typeof LocationFormActionSchema>;
