import { Skeleton, Space, Typography, Button, Card, Table, Empty, Breadcrumb } from 'antd';
import { useBookDetailsProvider } from '../providers/useBookDetailsProvider';
import { useEffect, useState } from 'react';
import { HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from '@tanstack/react-router';
import RecordSaleModal from './RecordSaleModal';
import api from '../../api';

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
  const { isLoading, book, loadBook } = useBookDetailsProvider(id);
  const [modalOpen, setModalOpen] = useState(false);
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [loadingBuyers, setLoadingBuyers] = useState(false);

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

  const handleSaleSuccess = () => {
    loadBuyers();
  };

  if (isLoading) {
    return <Skeleton active />;
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
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Breadcrumb
        style={{ marginBottom: '16px' }}
        items={[
          {
            title: (
              // @ts-ignore
              <Link to="/">
                <HomeOutlined />
              </Link>
            ),
          },
          {
            // @ts-ignore
            title: <Link to="/books">Books</Link>,
          },
          {
            title: book?.title || 'Loading...',
          },
        ]}
      />

      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Typography.Title level={1} style={{ marginBottom: 0 }}>
              {book?.title}
            </Typography.Title>
            <Typography.Text type="secondary">
              Published: {book?.yearPublished}
            </Typography.Text>
          </div>
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={() => setModalOpen(true)}
          >
            Record Sale
          </Button>
        </div>

        <Card title="Buyers" style={{ marginTop: '16px' }}>
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
      </Space>

      <RecordSaleModal
        open={modalOpen}
        bookId={id}
        onClose={() => setModalOpen(false)}
        onSuccess={handleSaleSuccess}
      />
    </div>
  );
};