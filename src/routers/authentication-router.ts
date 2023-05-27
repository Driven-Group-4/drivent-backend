import { Router } from 'express';
import { signInOAuth, singInPost } from '@/controllers';
import { validateBody } from '@/middlewares';
import { OAuthSchema, signInSchema } from '@/schemas';

const authenticationRouter = Router();

authenticationRouter
  .post('/sign-in', validateBody(signInSchema), singInPost)
  .post('/oauth', validateBody(OAuthSchema), signInOAuth);

export { authenticationRouter };
