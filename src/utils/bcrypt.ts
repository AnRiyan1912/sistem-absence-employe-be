const bcript = require("bcrypt");

export const hashPassword = async (password: string): Promise<string> => {
  return await bcript.hash(password, 10);
};

export const comparePassword = async (
  passwordInput: string,
  hashPassword: string
): Promise<boolean> => {
  return await bcript.compare(passwordInput, hashPassword);
};
