import { Schema, model } from "mongoose";
import { StaticMethodType, UserType } from "./user.interface";
import bcrypt from "bcrypt";
import config from "@/config";

const userSchema = new Schema<UserType, StaticMethodType<UserType>>(
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

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt));
  next();
});

userSchema.static(
  "isPasswordMatched",
  async function (
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(givenPassword, savedPassword);
  }
);

userSchema.static(
  "isUserExist",
  async function (email: number): Promise<UserType & {id: string} | null> {
    return await User.findOne({ email }, { id: 1, email: 1, password: 1 });
  }
);

const User = model<UserType, StaticMethodType<UserType>>("User", userSchema);

export default User;
