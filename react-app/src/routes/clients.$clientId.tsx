import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Card, Descriptions, Table, Empty, Breadcrumb, Spin } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import api from '../api';
import type { Client, Purchase } from '../clients/ClientModel';

export const Route = createFileRoute('/clients/$clientId')({
  component: ClientDetailsPage,
});

function ClientDetailsPage() {
  const { clientId } = Route.useParams();
  const [client, setClient] = useState<Client | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadClient() {
      if (!clientId) return;
      
      setLoading(true);
      try {
        const clientRes = await api.get<Client>(`/clients/${clientId}`);
        setClient(clientRes.data);

        try {
          const purchasesRes = await api.get<Purchase[]>(`/clients/${clientId}/purchases`);
          setPurchases(purchasesRes.data || []);
        } catch (err) {
          console.warn('Could not load purchases:', err);
          setPurchases([]);
        }
      } catch (err) {
        console.error('Failed to load client:', err);
      } finally {
        setLoading(false);
      }
    }

    loadClient();
  }, [clientId]);

  if (loading) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!client) {
    return (
      <div style={{ padding: '24px' }}>
        <Empty description="Client not found" />
      </div>
    );
  }

  const columns = [
    {
      title: 'Book Title',
      dataIndex: ['book', 'title'],
      key: 'title',
      render: (_: unknown, record: Purchase) => {
        const bookPath = `/books/${record.book.id}`;
        return (
          <a 
            href={bookPath} 
            onClick={(e) => {
              e.preventDefault();
              window.location.href = bookPath;
            }}
            style={{ color: '#1890ff', cursor: 'pointer' }}
          >
            {record.book.title}
          </a>
        );
      },
    },
    {
      title: 'Author',
      key: 'author',
      render: (_: unknown, record: Purchase) => {
        const author = record.book.author;
        if (!author) return '—';
        return author.firstName && author.lastName 
          ? `${author.firstName} ${author.lastName}`
          : author.name || '—';
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
              <a href="/" onClick={(e) => { e.preventDefault(); window.location.href = '/'; }}>
                <HomeOutlined />
              </a>
            ),
          },
          {
            title: (
              <a href="/clients" onClick={(e) => { e.preventDefault(); window.location.href = '/clients'; }}>
                Clients
              </a>
            ),
          },
          {
            title: client ? `${client.firstName} ${client.lastName}` : 'Loading...',
          },
        ]}
      />

      <h1>
        {client.firstName} {client.lastName}
      </h1>

      <Card title="Client Information" style={{ marginBottom: '16px' }}>
        <Descriptions column={1}>
          <Descriptions.Item label="Name">
            {client.firstName} {client.lastName}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{client.email || '—'}</Descriptions.Item>
          <Descriptions.Item label="Books Bought">{client.booksCount || 0}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Purchase History">
        {purchases.length > 0 ? (
          <Table dataSource={purchases} columns={columns} rowKey="id" />
        ) : (
          <Empty description="No purchases yet" />
        )}
      </Card>
    </div>
  );
}