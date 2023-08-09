export type RequestError = {
  error: string;
  message: string;
  statusCode: number;
};

/**
 * 列表返回数据
 */
export type ListResponse<T> = {
  data: T[];
  total: number;
};

export type SortOrder = 'descend' | 'ascend' | null;

/**
 * 列表请求参数
 */
export type ListQuery<T> = T & {
  current?: number;
  pageSize?: number;
  /**
   * 排序字段，格式为：`field:order`，例如：`createdAt:descend`
   */
  sorter?: string;
};
