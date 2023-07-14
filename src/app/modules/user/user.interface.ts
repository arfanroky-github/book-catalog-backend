import { Document, Model } from "mongoose";

type User = {
  email: string;
  password: string;
  picture?: string;
};

type StaticMethodType<T extends UserType> = {
  isPasswordMatched: (
    givenPassword: string,
    savedPassword: string
  ) => Promise<boolean>;

  isUserExist(email: string): Promise<T | null>;
} & Model<T>;

type UserType = User & Document

export { UserType, StaticMethodType };
