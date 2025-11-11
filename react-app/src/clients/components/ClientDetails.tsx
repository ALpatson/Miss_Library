import { useEffect, useState } from 'react';
import { Card, Descriptions, Table, Empty, Skeleton, Space, App } from 'antd';
import api from '../../api';

interface Purchase {
  id: number;
  date: string;
  book: {
    id: string;
    title: string;
    yearPublished: number;
    author: {
      firstName: string;
      lastName: string;
    };
  };
}

interface Client {
  id: number;
  firstName: string;
  lastName: string;
  email: string | null;
  photoUrl: string | null;
  booksCount: number;
}

interface ClientDetailsProps {
  id: number;
}

export function ClientDetails({ id }: ClientDetailsProps) {
  const { message } = App.useApp();
  const [client, setClient] = useState<Client | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loadingClient, setLoadingClient] = useState<boolean>(true);
  const [loadingPurchases, setLoadingPurchases] = useState<boolean>(true);

  const loadClient = async (): Promise<void> => {
    setLoadingClient(true);
    try {
      const response = await api.get<Client>(`/clients/${id}`);
      setClient(response.data);
    } catch (error) {
      console.error('Failed to load client:', error);
      message.error('Failed to load client details');
    } finally {
      setLoadingClient(false);
    }
  };

  const loadPurchases = async (): Promise<void> => {
    setLoadingPurchases(true);
    try {
      const response = await api.get<Purchase[]>(`/clients/${id}/purchases`);
      setPurchases(response.data || []);
    } catch (error) {
      console.error('Failed to load purchases:', error);
      setPurchases([]);
    } finally {
      setLoadingPurchases(false);
    }
  };

  useEffect(() => {
    loadClient();
    loadPurchases();
  }, [id]);

  if (loadingClient) {
    return <Skeleton active />;
  }

  if (!client) {
    return <Empty description="Client not found" />;
  }

  const columns = [
    {
      title: 'Book',
      key: 'book',
      render: (_: unknown, record: Purchase) => {
        const bookPath = `/books/${record.book.id}`;
        return (
          <a
            href={bookPath}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = bookPath;
            }}
          >
            {record.book.title}
          </a>
        );
      },
    },
    {
      title: 'Author',
      key: 'author',
      render: (_: unknown, record: Purchase) =>
        `${record.book.author.firstName} ${record.book.author.lastName}`,
    },
    {
      title: 'Purchase Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <Card title="Client Information">
        <Descriptions column={1}>
          <Descriptions.Item label="Name">
            {client.firstName} {client.lastName}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {client.email || '—'}
          </Descriptions.Item>
          <Descriptions.Item label="Books Bought">
            {client.booksCount}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Purchase History">
        {purchases.length > 0 ? (
          <Table<Purchase>
            dataSource={purchases}
            columns={columns}
            rowKey="id"
            loading={loadingPurchases}
            pagination={false}
          />
        ) : (
          <Empty description="No purchases yet" />
        )}
      </Card>
    </Space>
  );
}