import { Schema, model } from "mongoose";
import { UserType } from "./user.interface";
import bcrypt from "bcrypt";

const userSchema = new Schema<UserType>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);


const User = model<UserType>("User", userSchema);

export default User;
