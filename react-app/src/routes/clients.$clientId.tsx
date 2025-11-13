import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Card, Descriptions, Table, Empty, Breadcrumb, Spin, Button, Input, Avatar, Space, App, Statistic, Row, Col } from 'antd';
import { HomeOutlined, EditOutlined, SaveOutlined, CloseOutlined, UserOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Link, useNavigate } from '@tanstack/react-router';
import api from '../api';
import type { Client, Purchase, UpdateClientDto } from '../clients/ClientModel';

export const Route = createFileRoute('/clients/$clientId')({
  component: ClientDetailsPage,
});

function ClientDetailsPage() {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { clientId } = Route.useParams();
  const [client, setClient] = useState<Client | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Edit state
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const loadClient = async () => {
    if (!clientId) return;
    
    setLoading(true);
    try {
      const clientRes = await api.get<Client>(`/clients/${clientId}`);
      const clientData = clientRes.data;
      
      setClient(clientData);
      setFirstName(clientData.firstName);
      setLastName(clientData.lastName);
      setEmail(clientData.email || '');
      setPhotoUrl(clientData.photoUrl || '');

      try {
        const purchasesRes = await api.get<Purchase[]>(`/clients/${clientId}/purchases`);
        setPurchases(purchasesRes.data || []);
      } catch (err) {
        console.warn('Could not load purchases:', err);
        setPurchases([]);
      }
    } catch (err) {
      console.error('Failed to load client:', err);
      message.error('Failed to load client details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClient();
  }, [clientId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    if (client) {
      setFirstName(client.firstName);
      setLastName(client.lastName);
      setEmail(client.email || '');
      setPhotoUrl(client.photoUrl || '');
    }
    setIsEditing(false);
  };

  const handleSaveEdit = async () => {
    try {
      const updates: UpdateClientDto = {
        firstName,
        lastName,
        email: email || undefined,
        photoUrl: photoUrl || undefined,
      };
      await api.put(`/clients/${clientId}`, updates);
      message.success('Client updated successfully!');
      setIsEditing(false);
      loadClient();
    } catch (error) {
      console.error('Failed to update client:', error);
      message.error('Failed to update client');
    }
  };

  const handleBookClick = (bookId: string) => {
    navigate({ to: `/books/${bookId}` });
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundImage: 'url(https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        padding: '24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
          <Spin size="large" />
        </Card>
      </div>
    );
  }

  if (!client) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundImage: 'url(https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        padding: '24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
          <Empty description="Client not found" />
        </Card>
      </div>
    );
  }

  const columns = [
  {
    title: 'Book Title',
    key: 'title',
    render: (_: unknown, record: Purchase) => (
      <a
        onClick={(e) => {
          e.preventDefault();
          handleBookClick(record.book.id);
        }}
        style={{ color: '#1890ff', cursor: 'pointer' }}
      >
        {record.book.title}
      </a>
    ),
  },
  {
    title: 'Author',
    key: 'author',
    render: (_: unknown, record: Purchase) => {
      const author = record.book.author;
      if (!author) return '—';
      return author.firstName && author.lastName 
        ? `${author.firstName} ${author.lastName}`
        : '—';
    },
  },
  {
    title: 'Purchase Date',
    dataIndex: 'date' as const,
    key: 'date',
    render: (date: string) => new Date(date).toLocaleDateString(),
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
                <Link to="/clients" style={{ color: '#ffffff' }}>Clients</Link>
              ),
            },
            {
              title: <span style={{ color: '#ffffff' }}>{`${client.firstName} ${client.lastName}`}</span>,
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
            {client.firstName} {client.lastName}
          </h1>
        </div>

        <Row gutter={16} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={12}>
            <Card style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '12px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
            }}>
              <Statistic 
                title="Books Purchased" 
                value={purchases.length || 0}
                prefix={<ShoppingOutlined />}
              />
            </Card>
          </Col>
        </Row>

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
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>
                Client Information
              </h3>
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
                  <Button type="primary" icon={<EditOutlined />} onClick={handleEdit}>
                    Edit Client
                  </Button>
                )}
              </Space>
            </div>

            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
              <div style={{ textAlign: 'center' }}>
                {isEditing ? (
                  <div>
                    <Avatar 
                      size={120} 
                      src={photoUrl} 
                      icon={<UserOutlined />}
                      style={{ marginBottom: '8px' }}
                    >
                      {!photoUrl && firstName?.[0]}
                    </Avatar>
                    <Input
                      placeholder="Photo URL"
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      style={{ marginTop: '8px', width: '120px' }}
                    />
                  </div>
                ) : (
                  <Avatar 
                    size={120} 
                    src={client.photoUrl} 
                    icon={<UserOutlined />}
                  >
                    {!client.photoUrl && client.firstName?.[0]}
                  </Avatar>
                )}
              </div>

              <div style={{ flex: 1 }}>
                <Descriptions bordered column={1}>
                  <Descriptions.Item label="First Name">
                    {isEditing ? (
                      <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    ) : (
                      <strong style={{ fontSize: '16px' }}>{client.firstName}</strong>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Last Name">
                    {isEditing ? (
                      <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    ) : (
                      <strong style={{ fontSize: '16px' }}>{client.lastName}</strong>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">
                    {isEditing ? (
                      <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                    ) : (
                      client.email || '—'
                    )}
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </div>
          </Space>
        </Card>

        <Card 
          title="Purchase History"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          }}
        >
          {purchases.length > 0 ? (
            <Table
              dataSource={purchases}
              columns={columns}
              rowKey="id"
              pagination={false}
            />
          ) : (
            <Empty description="No purchases yet" />
          )}
        </Card>
      </div>
    </div>
  );
}