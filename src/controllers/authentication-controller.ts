import { Request, Response } from 'express';
import httpStatus from 'http-status';
import authenticationService, { SignInParams } from '@/services/authentication-service';

export async function singInPost(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;

  try {
    const result = await authenticationService.signIn({ email, password });

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}

export async function signInOAuth(req: Request, res: Response) {
  const { code } = req.body;
  try {
    const result = await authenticationService.signInGithub(code);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    console.log(error);
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}
