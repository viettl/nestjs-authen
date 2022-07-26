import * as bcrypt from 'bcrypt';

const SALT = 'Vietk123213';
export const hashPassword = async (
  password: string,
  salt: string = SALT,
): Promise<string> => {
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
