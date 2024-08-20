import { Lead } from "../models/Leads";
import { CommonClass } from "../services/common";
import { getPaginatedResultAggregation } from "../services/getPaginatedResultAggregation 1";

export const create = async (data: any) => {
  const userObj = await Lead.create(data);
  return userObj;
};

export const read = async (filter: any) => {
  const userObj = await Lead.findOne(filter);
  return userObj;
};

export const readAll = async (filter: any) => {
  const {
    page,
    pageSize,
    sort,
    name,
    email,
    phone,
    intrestedIn,
    requirements,
    status,
    source,
    budget_from,
    budget_till,
    createdAt_from,
    createdAt_till,
  } = filter;

  let search: any = {};
  if (name) {
    search.name = new RegExp(name, "i");
  }
  if (email) {
    search.email = email;
  }
  if (phone) {
    search.phone = phone;
  }
  if (intrestedIn) {
    search.intrestedIn = new RegExp(intrestedIn, "i");
  }
  if (requirements) {
    search.requirements = new RegExp(requirements, "i");
  }
  if (source) {
    search.source = source;
  }
  if (status) {
    search.status = status;
  }

  const cmn = new CommonClass();
  search = cmn.fromTillHelper(search, {
    budget_from,
    budget_till,
    createdAt_from,
    createdAt_till,
  });

  let pipeline = [
    { $match: search },
    { $sort: sort && Object.keys(sort).length > 0 ? sort : { createdAt: -1 } },
  ];

  const objs = await getPaginatedResultAggregation({
    Model: Lead,
    page,
    pageSize,
    pipeline,
  });

  return objs;
};

export const update = async (filter: any, data: any) => {
  const userObj = await Lead.findOneAndUpdate(filter, data, { new: true });
  return userObj;
};
