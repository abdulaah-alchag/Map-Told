import { Router } from 'express';
import { 
  createQuestion,
  getAllQuestions, 
  getQuestionById,
  deleteQuestion
  } from '#controllers';

  import { validateZod } from '#middlewares';
  import { questionInputSchema } from '#schemas';

const questionRoutes = Router();

questionRoutes.route('/')
.get(getAllQuestions)
.post(validateZod(questionInputSchema), createQuestion);
//validateZod(Schema)
questionRoutes.route('/:id')
.get(getQuestionById)
.delete(deleteQuestion);

export default questionRoutes;