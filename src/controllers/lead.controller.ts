import { Request, Response } from "express";
import { DALead } from "../data_access";

export const createLead = async (req: Request, res: Response) => {
  const data = req.body;
  const leadObj = await DALead.create(data);
  return res.status(200).json({ data: "", msg: "Lead added" });
};

export const addLeadInquiry = async (req: Request, res: Response) => {
  const { leadId, comment, followUpDate } = req.body;
  const { userId, name } = req.userInfo;

  let filter = { _id: leadId };
  let data = {
    $push: { inquiries: { comment, inquiredBy: name, followUpDate } },
  };

  const leadObj = await DALead.update(filter, data);

  return res.status(200).json({ data: "", msg: "Comment added" });
};

export const getAllLeads = async (req: Request, res: Response) => {
  const leadObj = await DALead.readAll(req.body);
  return res.status(200).json({ data: leadObj, msg: "" });
};

export const getLeadDetail = async (req: Request, res: Response) => {
  const leadObj = await DALead.read({ _id: req.body.id });
  return res.status(200).json({ data: leadObj, msg: "" });
};
