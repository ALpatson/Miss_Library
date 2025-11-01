// react-app/src/clients/components/ClientList.tsx

import { Table, Space, Button, Avatar, Modal } from 'antd';
import { DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from '@tanstack/react-router';
import type { ColumnsType } from 'antd/es/table';
import type { Client } from '../ClientModel';

interface ClientListProps {
  data: Client[] | null;
  loading: boolean;
  onDelete: (id: number) => void;
}

export default function ClientList({ data, loading, onDelete }: ClientListProps) {
  const handleDelete = (client: Client): void => {
    Modal.confirm({
      title: 'Delete Client',
      content: `Are you sure you want to delete ${client.firstName} ${client.lastName}?`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => onDelete(client.id),
    });
  };

  const columns: ColumnsType<Client> = [
    {
      title: 'Name',
      key: 'name',
      render: (_: unknown, record: Client) => (
        <Space>
          <Avatar src={record.photoUrl} icon={<UserOutlined />}>
            {!record.photoUrl && record.firstName?.[0]}
          </Avatar>
          {/* @ts-ignore - route will be created next */}
          <Link to={`/clients/${record.id}`}>
            {record.firstName} {record.lastName}
          </Link>
        </Space>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email: string | null) => email || '—',
    },
    {
      title: 'Books Bought',
      dataIndex: 'booksCount',
      key: 'booksCount',
      render: (count: number | undefined) => count || 0,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: Client) => (
        <Space>
          <Button
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table<Client>
      rowKey="id"
      dataSource={data ?? []}
      columns={columns}
      loading={loading}
      pagination={{ pageSize: 10 }}
    />
  );
}