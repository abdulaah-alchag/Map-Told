import { Router } from 'express';
import { aiToolsCalling } from '#services';
import { validateZod } from '#middlewares';
import { aiToolsPromptBodySchema } from '#schemas';

const aiToolsRoutes = Router();
aiToolsRoutes.use(validateZod(aiToolsPromptBodySchema));
aiToolsRoutes.post('/:id', aiToolsCalling);

export default aiToolsRoutes;
