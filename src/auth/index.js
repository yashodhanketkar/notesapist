import { compare, genSalt, hash } from "bcrypt";
import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();
const TOKEN = process.env.TOKEN;
if (!TOKEN) throw new Error("Token not found");

export const hashPass = async (password) => {
  return hash(password, await genSalt(10));
};

export const verifyPass = async (password, dbPassword) => {
  return compare(password, dbPassword);
};

export const getToken = async (user) => {
  if (!user._id) throw new Error("User not found");
  return [
    jwt.sign(
      { _id: user._id, username: user.username, role: user.role },
      TOKEN,
      {
        expiresIn: "7d",
      }
    ),
  ];
};
