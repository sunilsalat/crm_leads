import { Request, Response } from "express";
import { DAProperty } from "../data_access";

export const createProperty = async (req: Request, res: Response) => {
  const data = req.body;
  const leadObj = await DAProperty.create(data);
  return res.status(200).json({ data: "", msg: "Property added" });
};

export const listProperty = async (req: Request, res: Response) => {
  const leadObj = await DAProperty.readAll(req.body);
  return res.status(200).json({ data: leadObj, msg: "" });
};

export const detailProperty = async (req: Request, res: Response) => {
  const leadObj = await DAProperty.read({ _id: req.body.id });
  return res.status(200).json({ data: leadObj, msg: "" });
};
