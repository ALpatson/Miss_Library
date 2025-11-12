import { Skeleton, Space, Typography, Button, Card, Table, Empty, Breadcrumb, Modal, App, Descriptions, Input, Select } from 'antd';
import { useBookDetailsProvider } from '../providers/useBookDetailsProvider';
import { useEffect, useState } from 'react';
import { HomeOutlined, ShoppingCartOutlined, DeleteOutlined, EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { Link } from '@tanstack/react-router';
import RecordSaleModal from './RecordSaleModal';
import { useBookAuthorsProviders } from '../providers/useBookAuthorsProviders';
import api from '../../api';
import type { UpdateBookModel } from '../BookModel';

interface BookDetailsProps {
  id: string;
}

interface Buyer {
  id: number;
  date: string;
  client: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

export const BookDetails = ({ id }: BookDetailsProps) => {
  const { message } = App.useApp();
  const { isLoading, book, loadBook } = useBookDetailsProvider(id);
  const { authors, loadAuthors } = useBookAuthorsProviders();
  
  const [modalOpen, setModalOpen] = useState(false);
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [loadingBuyers, setLoadingBuyers] = useState(false);
  
  // Edit state
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [yearPublished, setYearPublished] = useState(0);
  const [authorId, setAuthorId] = useState('');
  
  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [saleToDelete, setSaleToDelete] = useState<{ id: number; clientName: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadBuyers = async () => {
    setLoadingBuyers(true);
    try {
      const res = await api.get<Buyer[]>(`/books/${id}/buyers`);
      setBuyers(res.data || []);
    } catch (err) {
      console.warn('Could not load buyers:', err);
      setBuyers([]);
    } finally {
      setLoadingBuyers(false);
    }
  };

  useEffect(() => {
    loadBook();
    loadBuyers();
  }, [id]);

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setYearPublished(book.yearPublished);
      setAuthorId(book.author?.id || '');
    }
  }, [book]);

  useEffect(() => {
    if (isEditing) {
      loadAuthors();
    }
  }, [isEditing]);

  const handleSaleSuccess = () => {
    loadBuyers();
    loadBook(); // Reload book to update any counts
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    if (book) {
      setTitle(book.title);
      setYearPublished(book.yearPublished);
      setAuthorId(book.author?.id || '');
    }
    setIsEditing(false);
  };

  const handleSaveEdit = async () => {
    try {
      const updates: UpdateBookModel = {
        title,
        yearPublished,
        authorId,
      };
      await api.patch(`/books/${id}`, updates);
      message.success('Book updated successfully!');
      setIsEditing(false);
      loadBook(); // Reload to show updated data
    } catch (error) {
      console.error('Failed to update book:', error);
      message.error('Failed to update book');
    }
  };

  const handleDeleteClick = (saleId: number, clientName: string) => {
    setSaleToDelete({ id: saleId, clientName });
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!saleToDelete) return;
    
    setDeleting(true);
    try {
      await api.delete(`/sales/${saleToDelete.id}`);
      message.success('Sale deleted successfully!');
      setDeleteModalOpen(false);
      setSaleToDelete(null);
      loadBuyers();
      loadBook(); // Reload to update counts
    } catch (error: any) {
      console.error('Failed to delete sale:', error);
      message.error('Failed to delete sale');
    } finally {
      setDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setSaleToDelete(null);
  };

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundImage: 'url(https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        padding: '24px',
      }}>
        <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', maxWidth: '1200px', margin: '0 auto' }}>
          <Skeleton active />
        </Card>
      </div>
    );
  }

  const columns = [
    {
      title: 'Client',
      key: 'client',
      render: (_: unknown, record: Buyer) => {
        const clientPath = `/clients/${record.client.id}`;
        return (
          <a href={clientPath} onClick={(e) => {
            e.preventDefault();
            window.location.href = clientPath;
          }}>
            {record.client.firstName} {record.client.lastName}
          </a>
        );
      },
    },
    {
      title: 'Purchase Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: Buyer) => (
        <Button
          danger
          size="small"
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteClick(
            record.id,
            `${record.client.firstName} ${record.client.lastName}`
          )}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
  <div style={{
    minHeight: '100vh',
    backgroundImage: 'url(https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1920)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    padding: '24px',
  }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <Breadcrumb
        style={{
          marginBottom: '16px',
          backgroundColor: 'transparent',
          borderRadius: '8px',
          color: '#ffffff',
        }}
        separator={<span style={{ color: '#ffffff' }}>/</span>}
        items={[
          {
            title: (
              // @ts-ignore
              <Link to="/" style={{ color: '#ffffff' }}>
                <HomeOutlined style={{ color: '#ffffff' }}/>
              </Link>
            ),
          },
          {
            title: (
              // @ts-ignore
              <Link to="/books" style={{ color: '#ffffff' }}>Books</Link>
            ),
          },
          {
            title: <span style={{ color: '#ffffff' }}>{book?.title || 'Loading...'}</span>,
          },
        ]}
      />

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
      }}>
        <h1 style={{
          color: '#fff',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          margin: 0,
        }}>
          {book?.title}
        </h1>
      </div>

      <Card 
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          marginBottom: '24px',
        }}
      >
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography.Title level={3} style={{ margin: 0 }}>
              Book Information
            </Typography.Title>
            <Space>
              {isEditing ? (
                <>
                  <Button type="primary" icon={<SaveOutlined />} onClick={handleSaveEdit}>
                    Save
                  </Button>
                  <Button icon={<CloseOutlined />} onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button type="primary" icon={<EditOutlined />} onClick={handleEdit}>
                    Edit Book
                  </Button>
                  <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => setModalOpen(true)}
                    style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
                  >
                    Record Sale
                  </Button>
                </>
              )}
            </Space>
          </div>

            <Descriptions bordered column={1}>
              <Descriptions.Item label="Title">
                {isEditing ? (
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                ) : (
                  <strong style={{ fontSize: '16px' }}>{book?.title}</strong>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Author">
                {isEditing ? (
                  <Select
                    style={{ width: '100%' }}
                    value={authorId}
                    options={authors.map(author => ({
                      label: `${author.firstName} ${author.lastName}`,
                      value: author.id,
                    }))}
                    onChange={value => setAuthorId(value)}
                  />
                ) : (
                  book?.author ? `${book.author.firstName} ${book.author.lastName}` : 'Unknown Author'
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Year Published">
                {isEditing ? (
                  <Input
                    type="number"
                    value={yearPublished}
                    onChange={(e) => setYearPublished(Number(e.target.value))}
                  />
                ) : (
                  book?.yearPublished
                )}
              </Descriptions.Item>
            </Descriptions>
          </Space>
        </Card>

        <Card 
          title="Clients Who Bought This Book"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          }}
        >
          {buyers.length > 0 ? (
            <Table
              dataSource={buyers}
              columns={columns}
              rowKey="id"
              loading={loadingBuyers}
              pagination={false}
            />
          ) : (
            <Empty description="No sales recorded yet" />
          )}
        </Card>
      </div>

      <RecordSaleModal
        open={modalOpen}
        bookId={id}
        onClose={() => setModalOpen(false)}
        onSuccess={handleSaleSuccess}
      />

      <Modal
        title="Delete Sale"
        open={deleteModalOpen}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        okText="Delete"
        okButtonProps={{ danger: true }}
        confirmLoading={deleting}
      >
        {saleToDelete && (
          <p>
            Are you sure you want to delete the sale to <strong>{saleToDelete.clientName}</strong>?
          </p>
        )}
      </Modal>
    </div>
  );
};