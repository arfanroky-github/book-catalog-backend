import jwt, { JwtPayload, Secret } from "jsonwebtoken";

type CreateTokenProps = {
  options: {
    id: string;
    email: string;
  };
  secret: Secret;
  expiresIn: string;
};

const createToken = ({
  options,
  secret,
  expiresIn,
}: CreateTokenProps) => {
  return jwt.sign(options, secret, { expiresIn });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const JwtHelper = {
  createToken,
  verifyToken,
};
