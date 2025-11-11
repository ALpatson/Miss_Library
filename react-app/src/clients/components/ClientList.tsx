import { Table, Space, Button, Avatar, Modal, App } from 'antd';
import { DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import type { Client } from '../ClientModel';

interface ClientListProps {
  data: Client[] | null;
  loading: boolean;
  onDelete: (id: number) => Promise<void>;
}

export default function ClientList({ data, loading, onDelete }: ClientListProps) {
  const { message } = App.useApp();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteClick = (client: Client): void => {
    console.log('Delete clicked for:', client.firstName, client.lastName);
    setClientToDelete(client);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async (): Promise<void> => {
    if (!clientToDelete) return;
    
    console.log('Confirming delete for:', clientToDelete.id);
    setDeleting(true);
    
    try {
      await onDelete(clientToDelete.id);
      message.success(`${clientToDelete.firstName} ${clientToDelete.lastName} deleted successfully!`);
      setDeleteModalOpen(false);
      setClientToDelete(null);
    } catch (error: any) {
      console.error('Delete failed:', error);
      
      const status = error.response?.status;
      const bookCount = clientToDelete.booksCount || 0;
      
      if (status === 500 || status === 400) {
        if (bookCount > 0) {
          message.error({
            content: `Cannot delete ${clientToDelete.firstName} ${clientToDelete.lastName} - they have ${bookCount} purchase${bookCount !== 1 ? 's' : ''}. Delete their purchases first.`,
            duration: 5,
          });
        } else {
          message.error({
            content: `Cannot delete ${clientToDelete.firstName} ${clientToDelete.lastName} - database constraint error.`,
            duration: 5,
          });
        }
      } else {
        message.error('Failed to delete client');
      }
    } finally {
      setDeleting(false);
    }
  };

  const handleCancelDelete = (): void => {
    setDeleteModalOpen(false);
    setClientToDelete(null);
  };

  const columns: ColumnsType<Client> = [
    {
      title: 'Name',
      key: 'name',
      render: (_: unknown, record: Client) => {
        const clientPath = `/clients/${record.id}`;
        return (
          <Space>
            <Avatar src={record.photoUrl} icon={<UserOutlined />}>
              {!record.photoUrl && record.firstName?.[0]}
            </Avatar>
            <a 
              href={clientPath} 
              onClick={(e) => {
                e.preventDefault();
                window.location.href = clientPath;
              }}
              style={{ color: '#1890ff', cursor: 'pointer' }}
            >
              {record.firstName} {record.lastName}
            </a>
          </Space>
        );
      },
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
            onClick={() => handleDeleteClick(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table<Client>
        rowKey="id"
        dataSource={data ?? []}
        columns={columns}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
      
      <Modal
        title="Delete Client"
        open={deleteModalOpen}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        okText="Delete"
        okButtonProps={{ danger: true }}
        confirmLoading={deleting}
      >
        {clientToDelete && (
          <p>
            Are you sure you want to delete <strong>{clientToDelete.firstName} {clientToDelete.lastName}</strong>?
          </p>
        )}
      </Modal>
    </>
  );
}