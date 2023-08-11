import { createUser, fetchUser, removeUser, updateUser } from '@/api';
import { auditColumn, idColumn } from '@/hooks';
import { User } from '@/types/api';
import { convertSorter, messageSuccess } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ModalForm, ProFormText, ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, Space } from 'antd';
import { useRef, useState } from 'react';

export function TableList() {
  const [userOpen, setUserOpen] = useState(false); // 编辑
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<User>();

  const columns: ProColumns<User>[] = [
    idColumn,
    {
      title: '账号',
      dataIndex: 'username',
      ellipsis: true,
      copyable: true,
    },
    auditColumn,
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 120,
      render: (_, entity) => (
        <Space>
          <Button
            size="small"
            onClick={() => {
              setUserOpen(true);
              setCurrentRow(entity);
            }}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定删除吗？"
            onConfirm={async () => {
              entity.id && (await removeUser(entity.id));
              actionRef.current?.reload();
              messageSuccess();
            }}
          >
            <Button type="primary" danger size="small">
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const isEdit = !!currentRow;

  return (
    <>
      <ProTable<User>
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCurrentRow(undefined);
              setUserOpen(true);
            }}
          >
            <PlusOutlined /> 添加用户
          </Button>,
        ]}
        request={async (params, sorter) => {
          return fetchUser({ ...params, sorter: convertSorter(sorter) });
        }}
        columns={columns}
      />

      <ModalForm
        title={!isEdit ? '添加用户' : '编辑用户'}
        width="400px"
        open={userOpen}
        onOpenChange={setUserOpen}
        onFinish={async (value) => {
          if (!isEdit) {
            await createUser(value);
          } else {
            await updateUser(value);
          }

          setUserOpen(false);
          actionRef?.current?.reload();
          messageSuccess();
        }}
        modalProps={{ destroyOnClose: true }}
        initialValues={currentRow}
      >
        <ProFormText disabled={isEdit} rules={[{ required: true }]} width="md" name="username" label="帐号" />
        <ProFormText.Password rules={[{ required: true }]} width="md" name="password" label="密码" />
        <ProFormText width="md" name="id" label="id" hidden />
      </ModalForm>
    </>
  );
}
