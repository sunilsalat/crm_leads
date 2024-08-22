import { Property } from "../models/Properties";

export const create = async (data: any) => {
  const userObj = await Property.create(data);
  return userObj;
};

export const read = async (filter: any) => {
  const userObj = await Property.findOne(filter);
  return userObj;
};

export const readAll = async (filter: any) => {
  const userObjs = await Property.find(filter);
  return userObjs;
};

export const update = async (filter: any, data: any) => {
  const userObj = await Property.findOneAndUpdate(filter, data, { new: true });
  return userObj;
};
