import { z } from 'zod';

export const CreateEventSchema = z.object({
    name: z.string(),
    description: z.string(),
    startTime: z.date(),
    location: z.string(),
    imageURL: z.string(),
})

export const CreateLocationSchema = z.object({
    name: z.string(),
    description: z.string(),
    imageURL: z.number(),
})