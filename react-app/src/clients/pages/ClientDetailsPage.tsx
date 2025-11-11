import { useParams } from '@tanstack/react-router';
import { ClientDetails } from '../components/ClientDetails';
import { Typography, Breadcrumb } from 'antd';
import { Link } from '@tanstack/react-router';
import { HomeOutlined } from '@ant-design/icons';

export function ClientDetailsPage() {
  const { clientId } = useParams({ from: '/clients/$clientId' });
  const id = parseInt(clientId, 10);

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
            title: <Link to="/clients">Clients</Link>,
          },
          {
            title: 'Client Details',
          },
        ]}
      />

      <Typography.Title level={2}>Client Details</Typography.Title>

      <ClientDetails id={id} />
    </div>
  );
}