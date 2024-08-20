export interface IpaginatedResult {
  modelname: any;
  filter: any;
  populate: [];
  page: number;
  pageSize: number;
  select?: string;
  isLean?: boolean;
  sort?: any;
}

export const getPaginatedResult = async ({
  modelname,
  filter,
  populate,
  select,
  sort,
  isLean,
  page,
  pageSize,
}: IpaginatedResult) => {
  const result = {
    data: [],
    total: 0,
    currentPage: page,
    perPage: pageSize,
    lastPage: 0,
    hasMorePages: false,
    nextPage: 0,
    previousPage: 0,
  };

  page = page ? page : 1;
  pageSize = pageSize ? pageSize : 10;
  sort = sort ? sort : { createdAt: -1 };

  let data: any;
  if (isLean) {
    data = await modelname
      .find({ ...filter })
      .sort(sort)
      .populate([...populate])
      .select(select)
      .lean()
      .skip((page - 1) * pageSize)
      .limit(pageSize);
  } else {
    data = await modelname
      .find({ ...filter })
      .sort(sort)
      .populate([...populate])
      .select(select)
      .skip((page - 1) * pageSize)
      .limit(pageSize);
  }

  const total = await modelname.find(filter).countDocuments();

  result.data = data;
  result.total = total;
  result.currentPage = page;
  result.lastPage = Math.ceil(total / pageSize);
  result.hasMorePages = result.lastPage > result.currentPage ? true : false;
  result.nextPage =
    result.lastPage > result.currentPage ? result.currentPage + 1 : 0;
  result.previousPage = result.currentPage > 1 ? result.currentPage - 1 : 0;

  return result;
};
