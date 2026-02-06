import { OPENAI_API_KEY, OPENAI_MODEL } from '#config';
import { aiSummarySchema, promptBodySchema } from '#schemas';
import OpenAI from 'openai';
import { zodTextFormat } from 'openai/helpers/zod';
import z from 'zod';

const isDev = process.env.NODE_ENV === 'development';

const client = new OpenAI({
  apiKey: isDev ? process.env.LOCAL_LLM_KEY : OPENAI_API_KEY,
  baseURL: isDev ? process.env.LOCAL_LLM_URL : undefined
});

type PromptBody = z.infer<typeof promptBodySchema>;

/**
 * Generates a narrative description of an area using AI.
 */
export async function generateAiText(stats: PromptBody): Promise<string> {
  const input = promptBodySchema.parse(stats);

  // Compute numeric features for AI input
  const features = areaFeatures(input);

  const model = isDev ? (process.env.LOCAL_LLM_MODEL ?? 'llama3.2:3b') : OPENAI_MODEL;

  //Create AI response
  const response = await client.responses.create({
    model,
    input: [
      {
        role: 'system',
        content: `
          You interpret geographic data.

          TASK:
          Write a short, welcoming description of a zone based only on numeric features.

          INTERPRETATION:
          - High greenAreaToBuildingRatio → rural or nature-focused
          - High roadToBuildingRatio + high buildingCount → urban
          - Balanced ratios → suburban or mixed
          - Very low values → sparse or undeveloped

          RULES:
          - Use only the provided data
          - Do not invent details or landmarks
          - Treat zero or missing values as unknown
          - Prefer derived ratios over raw counts

          OUTPUT:
          - Valid JSON only
          - Must match SummarySchema exactly
          - Single short paragraph
        `
      },
      {
        role: 'user',
        content: JSON.stringify(features, null, 2)
      }
    ],
    text: { format: zodTextFormat(aiSummarySchema, 'SummarySchema') },
    temperature: 0.1,
    max_output_tokens: 150
  });

  const parsedData = JSON.parse(response.output_text);

  return parsedData.response;
}
/**
 * Computes numeric features of the area for AI input.
 * Includes raw counts and derived ratios.
 */
function areaFeatures(input: PromptBody) {
  const greenAreaToBuildingRatio = input.buildingCount > 0 ? input.greenCount / input.buildingCount : 0;
  const roadToBuildingRatio = input.buildingCount > 0 ? input.roadCount / input.buildingCount : 0;

  return {
    ...input,
    greenAreaToBuildingRatio,
    roadToBuildingRatio
  };
}
