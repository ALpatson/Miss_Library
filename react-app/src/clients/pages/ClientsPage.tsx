

import { useState } from 'react';
import { Button, Card, Empty, Breadcrumb } from 'antd';
import { PlusOutlined, HomeOutlined } from '@ant-design/icons';
import { Link } from '@tanstack/react-router';
import CreateClientModal from '../components/CreateClientModal';
import ClientList from '../components/ClientList';
import { useClientProvider } from '../providers/useClientProvider';

export default function ClientsPage() {
  const { clients, loading, createClient, deleteClient } = useClientProvider();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div style={{ padding: '24px' }}>
      <Breadcrumb style={{ marginBottom: '16px' }}>
        <Breadcrumb.Item>
          <Link to="/">
            <HomeOutlined />
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Clients</Breadcrumb.Item>
      </Breadcrumb>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <h1>Clients</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModalOpen(true)}
        >
          Add Client
        </Button>
      </div>

      <Card>
        {clients && clients.length > 0 ? (
          <ClientList data={clients} loading={loading} onDelete={deleteClient} />
        ) : loading ? null : (
          <Empty description="No clients found. Add your first client!" />
        )}
      </Card>

      <CreateClientModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={createClient}
      />
    </div>
  );
}