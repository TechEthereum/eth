import { TableAuditInfo } from '@/components';
import type { ProColumns } from '@ant-design/pro-components';
import { AuditInfo } from '@eth/types';

export const idColumn: ProColumns = {
  title: 'ID',
  dataIndex: 'id',
  ellipsis: true,
  copyable: true,
  width: 180,
};

export const auditColumn: ProColumns = {
  title: '操作信息',
  hideInSearch: true,
  width: 350,
  dataIndex: 'createdAt',
  valueType: 'dateTime',
  render(_: unknown, record: AuditInfo) {
    return <TableAuditInfo {...record} />;
  },
};

/**
 * 获取审计列
 */
export function useAuditColumns() {
  return [auditColumn];
}
