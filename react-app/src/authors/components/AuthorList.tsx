import { Table, Space, Button, Avatar, Modal, App } from 'antd';
import { DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import type { Author } from '../AuthorModel';

interface AuthorListProps {
  data: Author[] | null;
  loading: boolean;
  onDelete: (id: string) => Promise<void>;
}

export default function AuthorList({ data, loading, onDelete }: AuthorListProps) {
  const { message } = App.useApp();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [authorToDelete, setAuthorToDelete] = useState<Author | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteClick = (author: Author): void => {
    console.log('Delete clicked for:', author.firstName, author.lastName);
    setAuthorToDelete(author);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async (): Promise<void> => {
    if (!authorToDelete) return;
    
    console.log('Confirming delete for:', authorToDelete.id);
    setDeleting(true);
    
    try {
      await onDelete(authorToDelete.id);
      message.success(`${authorToDelete.firstName} ${authorToDelete.lastName} deleted successfully!`);
      setDeleteModalOpen(false);
      setAuthorToDelete(null);
    } catch (error: any) {
      console.error('Delete failed:', error);
      
      const status = error.response?.status;
      const bookCount = authorToDelete.booksCount || 0;
      
      if (status === 500 || status === 400) {
        if (bookCount > 0) {
          message.error({
            content: `Cannot delete ${authorToDelete.firstName} ${authorToDelete.lastName} - they have ${bookCount} book${bookCount !== 1 ? 's' : ''}. Delete their books first.`,
            duration: 5,
          });
        } else {
          message.error({
            content: `Cannot delete ${authorToDelete.firstName} ${authorToDelete.lastName} - database constraint error.`,
            duration: 5,
          });
        }
      } else {
        message.error(`Failed to delete ${authorToDelete.firstName} ${authorToDelete.lastName}`);
      }
    } finally {
      setDeleting(false);
    }
  };

  const handleCancelDelete = (): void => {
    setDeleteModalOpen(false);
    setAuthorToDelete(null);
  };

  const columns: ColumnsType<Author> = [
    {
      title: 'Name',
      key: 'name',
      render: (_: unknown, record: Author) => {
        const authorPath = `/authors/${record.id}`;
        return (
          <Space>
            <Avatar src={record.photoUrl} icon={<UserOutlined />}>
              {!record.photoUrl && record.firstName?.[0]}
            </Avatar>
            <a 
              href={authorPath} 
              onClick={(e) => {
                e.preventDefault();
                window.location.href = authorPath;
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
      title: 'Books Written',
      dataIndex: 'booksCount',
      key: 'booksCount',
      render: (count: number | undefined) => count || 0,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: Author) => (
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
      <Table<Author>
        rowKey="id"
        dataSource={data ?? []}
        columns={columns}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
      
      <Modal
        title="Delete Author"
        open={deleteModalOpen}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        okText="Delete"
        okButtonProps={{ danger: true }}
        confirmLoading={deleting}
      >
        {authorToDelete && (
          <p>
            Are you sure you want to delete <strong>{authorToDelete.firstName} {authorToDelete.lastName}</strong>?
          </p>
        )}
      </Modal>
    </>
  );
}