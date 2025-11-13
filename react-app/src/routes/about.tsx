import { createFileRoute } from '@tanstack/react-router';
import { Card, Typography, Space } from 'antd';
import { BookOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export const Route = createFileRoute('/about')({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: 'url(https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        padding: '48px 24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Main Title Card */}
          <div
            style={{
              textAlign: 'center',
              position: 'relative',
              color: '#ffffff', // white text by default
            }}
          >
            <Title
              level={1}
              style={{
                fontSize: '100px',       // larger title
                color: '#ebd2b3ff',       // soft white colour
                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)', // makes text visible over images
                marginBottom: '0.2em',
              }}
            >
              Miss_Library
            </Title>

            <Paragraph
              style={{
                fontSize: '22px',
                color: '#e0dcdc',
                textShadow: '1px 1px 6px rgba(0, 0, 0, 0.5)',
                marginTop: '0',
              }}
            >
              Your Digital Library Management System
            </Paragraph>
          </div>


          {/* About Section */}
          <Card
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Title level={3}>
              <BookOutlined /> About This Project
            </Title>
            <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
              Miss Library is a comprehensive library management system built
              with modern web technologies. It allows you to manage books,
              authors, clients, and sales all in one place.
            </Paragraph>
            <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
              This application was developed as part of the M1 Web Application
              Development course at JUNIA, demonstrating full-stack development
              skills with React, NestJS, TypeORM, and TypeScript.
            </Paragraph>
          </Card>

          {/* Features Section */}
          <Card
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Title level={3}>
              <UserOutlined /> Features
            </Title>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <Paragraph style={{ fontSize: '16px', marginBottom: '4px' }}>
                📚 Complete book catalog management
              </Paragraph>
              <Paragraph style={{ fontSize: '16px', marginBottom: '4px' }}>
                ✍️ Author profiles with statistics
              </Paragraph>
              <Paragraph style={{ fontSize: '16px', marginBottom: '4px' }}>
                👥 Client database with purchase history
              </Paragraph>
              <Paragraph style={{ fontSize: '16px', marginBottom: '4px' }}>
                💰 Sales tracking and recording
              </Paragraph>
              <Paragraph style={{ fontSize: '16px', marginBottom: '4px' }}>
                📊 Comprehensive analytics and insights
              </Paragraph>
              <Paragraph style={{ fontSize: '16px', marginBottom: '0' }}>
                🖼️ Photo support for books, authors, and clients
              </Paragraph>
            </Space>
          </Card>

          {/* The Team */}
          <Card
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Title level={3}>
              <TeamOutlined /> The Team
            </Title>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <Paragraph style={{ fontSize: '16px', marginBottom: '4px' }}>
                👨‍💻 Alpatson Cobbina Siaw
              </Paragraph>
              <Paragraph style={{ fontSize: '16px', marginBottom: '4px' }}>
                👨‍💻 Kwabena Anokye
              </Paragraph>
              <Paragraph style={{ fontSize: '16px', marginBottom: '0' }}>
                👩‍💻 Josephine Ama Gyanewah Gyasi
              </Paragraph>
            </Space>
          </Card>

          {/* Tech Stack Section */}
          <Card
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Title level={3}>
              <TeamOutlined /> Technology Stack
            </Title>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <Paragraph style={{ fontSize: '16px', marginBottom: '8px' }}>
                <strong>Frontend:</strong> React, TypeScript, Vite, Ant Design,
                TanStack Router
              </Paragraph>
              <Paragraph style={{ fontSize: '16px', marginBottom: '8px' }}>
                <strong>Backend:</strong> NestJS, TypeScript, TypeORM
              </Paragraph>
              <Paragraph style={{ fontSize: '16px', marginBottom: '8px' }}>
                <strong>Database:</strong> SQLite
              </Paragraph>
              <Paragraph style={{ fontSize: '16px', marginBottom: '0' }}>
                <strong>Architecture:</strong> REST API, Layered Architecture,
                Domain-Driven Design
              </Paragraph>
            </Space>
          </Card>

          {/* Footer Card */}
          <Card
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
            }}
          >
            <Paragraph style={{ fontSize: '14px', color: '#666', marginBottom: 0 }}>
              © 2025 Miss Library | M1 Web Development Project
            </Paragraph>
          </Card>
        </Space>
      </div>
    </div>
  );
}