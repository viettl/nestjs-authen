import * as bcrypt from 'bcrypt';

const SALT = bcrypt.genSaltSync(10);
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
