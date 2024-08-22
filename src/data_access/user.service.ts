import { User } from "../models/User";

export const create = async (data: any) => {
  const userObj = await User.create(data);
  return userObj;
};

export const read = async (filter: any) => {
  const userObj = await User.findOne(filter);
  return userObj;
};

export const readAll = async (filter: any) => {
  const userObjs = await User.find(filter);
  return userObjs;
};

export const update = async (filter: any, data: any) => {
  const userObj = await User.findOneAndUpdate(filter, data, { new: true });
  return userObj;
};
