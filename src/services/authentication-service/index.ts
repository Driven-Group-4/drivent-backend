import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import axios, { AxiosResponse } from 'axios';
import { invalidCredentialsError } from './errors';
import { exclude } from '@/utils/prisma-utils';
import userRepository from '@/repositories/user-repository';
import sessionRepository from '@/repositories/session-repository';
import 'dotenv/config';

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await getUserOrFail(email);

  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id);

  return {
    user: exclude(user, 'password'),
    token,
  };
}

async function signInGithub(code: string) {
  const accessTokenResponse = await axios.post('https://github.com/login/oauth/access_token', null, {
    params: {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    },
    headers: {
      Accept: 'application/json',
    },
  });
  const { access_token } = accessTokenResponse.data;

  const emailsResponse = await axios.get('https://api.github.com/user/emails', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const primaryEmail = emailsResponse?.data?.find((e: OAuthResponse) => {
    if (e.primary) return e;
  });

  const user = await getUserOrFail(primaryEmail.email);
  const token = await createSession(user.id);

  return {
    user: exclude(user, 'password'),
    token,
  };
}

async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByEmail(email, { id: true, email: true, password: true });
  if (!user) throw invalidCredentialsError();

  return user;
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await sessionRepository.create({
    token,
    userId,
  });

  return token;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

export type SignInParams = Pick<User, 'email' | 'password'>;

type SignInResult = {
  user: Pick<User, 'id' | 'email'>;
  token: string;
};

type GetUserOrFailResult = Pick<User, 'id' | 'email' | 'password'>;

type OAuthResponse = {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string;
};

const authenticationService = {
  signIn,
  signInGithub,
};

export default authenticationService;
export * from './errors';
