import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';

import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/index.ts';











export const createQuestionRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:roomID/questions',
    {
      schema: {
        params: z.object({
          roomID: z.string(),
        }),

        body: z.object({
          question: z.string().min(1),
        }),
      },
    },

    async (request, reply) => {
      const { roomID } = request.params;
      const { question } = request.body;

      const result = await db
        .insert(schema.questions)
        .values({ roomID, question })
        .returning();

      const insertedQuestion = result[0];

      if (!insertedQuestion) {
        throw new Error('Failed to create new question');
      }

      return reply.status(201).send({ questionID: insertedQuestion.id });
    }
  );
};
