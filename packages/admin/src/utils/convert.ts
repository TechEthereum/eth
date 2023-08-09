import { SortOrder } from '@eth/types';

/**
 * 将 sorter (object 格式) 转换为 string
 */
export function convertSorter(sorter: Record<string, SortOrder> = {}) {
  const firstSorter = Object.entries(sorter)[0];

  if (!firstSorter) {
    return;
  }

  const [field, order] = firstSorter;
  return `${field}:${order}`;
}
