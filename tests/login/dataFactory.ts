import { faker } from '@faker-js/faker';

export type Credentials = {
  username: string;
  password: string;
};

export const validCredentials = (username: string, password: string): Credentials => ({
  username,
  password,
});

export const invalidCredentials = (): Credentials => ({
  username: faker.internet.userName(),
  password: faker.internet.password(),
});

export const emptyCredentials = (): Credentials => ({
  username: '',
  password: '',
});

export const randomCredentials = (): Credentials => ({
  username: faker.string.alphanumeric(8),
  password: faker.string.alphanumeric(10),
});

export const lockedOutCredentials = (): Credentials => ({
  username: 'locked_out_user',
  password: 'secret_sauce',
});

export const problemUserCredentials = (): Credentials => ({
  username: 'problem_user',
  password: 'secret_sauce',
});
