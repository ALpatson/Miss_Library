// react-app/src/routes/clients.$clientId.tsx

import { useEffect, useState } from 'react';
import { Card, Descriptions, Table, Empty, Breadcrumb, Spin } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link, useParams } from '@tanstack/react-router';
import api from '../api';
import type { Client, Purchase } from '../clients/ClientModel';

export default function ClientDetailsPage() {
  const params = useParams({ strict: false }) as { clientId: string };
  const clientId = params.clientId;
  
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

        const purchasesRes = await api.get<Purchase[]>(`/clients/${clientId}/purchases`);
        setPurchases(purchasesRes.data || []);
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
    },
    {
      title: 'Author',
      dataIndex: ['book', 'author', 'name'],
      key: 'author',
    },
    {
      title: 'Purchase Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Breadcrumb style={{ marginBottom: '16px' }}>
        <Breadcrumb.Item>
          <Link to="/">
            <HomeOutlined />
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {/* @ts-ignore */}
          <Link to="/clients">Clients</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {client.firstName} {client.lastName}
        </Breadcrumb.Item>
      </Breadcrumb>

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