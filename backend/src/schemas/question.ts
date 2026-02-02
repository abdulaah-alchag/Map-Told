import { z } from 'zod/v4';
import { isValidObjectId, Types } from 'mongoose';
 
export const questionInputSchema = z
  .object({
    question: z.string({ error: 'Question must be a string' }).min(1, {
      message: 'Question is required'
    }),
    answer: z.string({ error: 'Answer must be a string' }).min(1, {
      message: 'Answer is required'
    }),
    zoneId: z.string().refine(val => isValidObjectId(val), { error: 'Not a valid ObjectId' })
    .transform(val => new Types.ObjectId(val)),
  })
  .strict();
 
export const questionSchema = z
  .object({
    _id: z.instanceof(Types.ObjectId),
    ...questionInputSchema.shape,
    createdAt: z.date()
  })
  .strict();