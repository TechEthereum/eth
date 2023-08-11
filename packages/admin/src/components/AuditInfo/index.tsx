import { convertDateToLocalTime } from '@/utils';
import { AuditInfo } from '@eth/types';
import { Tag } from 'antd';
import styles from './style.module.less';

export function TableAuditInfo(props: AuditInfo) {
  const { createdAt, createdBy, updatedAt, updatedBy } = props;

  return (
    <div className={styles.audit}>
      <div className={styles.auditItem}>
        <div className={styles.auditTime}>创建时间：{convertDateToLocalTime(createdAt)}</div>
        <Tag className={styles.auditUser} color="green">
          {createdBy}
        </Tag>
      </div>
      <div className={styles.auditItem}>
        <div className={styles.auditTime}>更新时间：{convertDateToLocalTime(updatedAt)}</div>
        <Tag className={styles.auditUser} color="blue">
          {updatedBy}
        </Tag>
      </div>
    </div>
  );
}
