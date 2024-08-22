import { Request, Response } from "express";
import { common } from "../services/common";
import { BadRequest } from "../errors";
import { DAToken, DAUser } from "../data_access";

export const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, phone, password, role } = req.body;
  let userObj: any;

  userObj = await DAUser.read({ email });
  if (userObj && userObj.email) {
    throw new BadRequest("Account exists");
  }

  userObj = await DAUser.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    role,
  });

  return res.status(201).json({ data: "", msg: "User Account created" });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userObj: any = await DAUser.read({ email });
  if (!userObj) {
    throw new BadRequest("Can not access account!");
  }

  if (!userObj || !userObj.isVerified) {
    throw new BadRequest("Not allowed, or You have not verified account");
  }

  const isPassValid = await userObj.comparePassword(password);
  if (!isPassValid) {
    throw new BadRequest("Invalid credentials");
  }

  const tokenObj = await DAToken.readOrCreate({
    user: userObj,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  });

  if (!tokenObj.isValid) {
    throw new BadRequest("Something went wrong!");
  }

  common.createJwtTokenAndAttachCookieToRes({
    res,
    payload: {
      role: userObj.role,
      id: userObj._id,
      email: userObj.email,
      name: `${userObj.firstName} ${userObj.lastName}`,
    },
    refreshTokenDb: tokenObj.refreshTokenDb,
  });

  return res.status(200).json({ data: "", msg: "Login successful" });
};
