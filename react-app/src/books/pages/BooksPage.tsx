import { Outlet } from '@tanstack/react-router';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from '@tanstack/react-router';
import { BookList } from '../components/BookList';

export function BooksPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: 'url(https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        padding: '24px',
      }}
    >
      <style>{`
        .ant-pagination .ant-pagination-item-link,
        .ant-pagination .ant-pagination-item {
          background-color: rgba(255, 255, 255, 0.9) !important;
          border-color: rgba(255, 255, 255, 0.9) !important;
        }
        .ant-pagination .ant-pagination-item-link:hover,
        .ant-pagination .ant-pagination-item:hover {
          background-color: rgba(255, 255, 255, 1) !important;
          border-color: #1890ff !important;
        }
        .ant-pagination .ant-pagination-item-active {
          background-color: #1890ff !important;
          border-color: #1890ff !important;
        }
        .ant-pagination .ant-pagination-item-active a {
          color: #fff !important;
        }
      `}</style>

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
              <Link to="/" style={{ color: '#ffffff' }}>
                <HomeOutlined style={{ color: '#ffffff' }}/>
              </Link>
            ),
          },
          {
            title: <span style={{ color: '#ffffff' }}>Books</span>,
          },
        ]}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <h1
          style={{
            color: '#fff',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            margin: 0,
          }}
        >
          Books
        </h1>
      </div>

      <div>
        <BookList />
      </div>
      
      <Outlet />
    </div>
  );
}