export interface IpaginatedResult {
  Model: any;
  page: number;
  pageSize: number;
  pipeline: any[];
}

const getPaginatedResultAggregation = async ({
  Model,
  page,
  pageSize,
  pipeline,
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

  let res = await Model.aggregate([
    ...pipeline,
    {
      $facet: {
        data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
        count: [{ $count: "count" }],
      },
    },
    { $project: { data: 1, count: 1 } },
  ]);

  const { data, count } = res[0];
  result.data = data;
  result.total = count[0]?.count || 0;
  result.currentPage = +page;
  result.lastPage = Math.ceil(result.total / pageSize);
  result.hasMorePages = result.lastPage > result.currentPage ? true : false;
  result.nextPage =
    result.lastPage > result.currentPage ? result.currentPage + 1 : 0;
  result.previousPage = result.currentPage > 1 ? result.currentPage - 1 : 0;
  return result;
};

export { getPaginatedResultAggregation };
