import { SortOrder } from '@eth/types';
import dayjs from 'dayjs';

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

/**
 * 转换为本地时间
 */
export function convertDateToLocalTime(time: Date | undefined) {
  if (!time) {
    return '-';
  }

  return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
}
