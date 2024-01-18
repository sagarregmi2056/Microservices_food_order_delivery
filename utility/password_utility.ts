import bcrypt from "bcrypt";

// this function is responsible to generate a salt
export const GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

// this function is responsible to generateencrypted password
export const GnerateEncryptedPassword = async (
  password: string,
  salt: string
) => {
  return await bcrypt.hash(password, salt);
};

export const Validatepassword = async (
  enteredPassword: string,
  savedPassword: string,
  salt: string
) => {
  return (
    (await GnerateEncryptedPassword(enteredPassword, salt)) === savedPassword
  );
};
