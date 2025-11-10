import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Card, Descriptions, Table, Empty, Breadcrumb, Spin, Statistic, Row, Col } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import api from '../api';
import type { Author, Book } from '../authors/AuthorModel';

export const Route = createFileRoute('/authors/$authorId')({
  component: AuthorDetailsPage,
});

function AuthorDetailsPage() {
  const { authorId } = Route.useParams();
  const [author, setAuthor] = useState<Author | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAuthor() {
      if (!authorId) return;
      
      setLoading(true);
      try {
        const statsRes = await api.get<Author>(`/authors/${authorId}/stats`);
        setAuthor(statsRes.data);

      
        // Get books by this author from the author data
        try {
          const authorRes = await api.get<any>(`/authors/${authorId}`);
          if (authorRes.data && authorRes.data.books) {
            setBooks(authorRes.data.books);
          } else {
            setBooks([]);
          }
        } catch (err) {
          console.warn('Could not load books:', err);
          setBooks([]);
        }
      } catch (err) {
        console.error('Failed to load author:', err);
      } finally {
        setLoading(false);
      }
    }

    loadAuthor();
  }, [authorId]);

  if (loading) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!author) {
    return (
      <div style={{ padding: '24px' }}>
        <Empty description="Author not found" />
      </div>
    );
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (_: unknown, record: Book) => {
        const bookPath = `/books/${record.id}`;
        return (
          <a 
            href={bookPath} 
            onClick={(e) => {
              e.preventDefault();
              window.location.href = bookPath;
            }}
            style={{ color: '#1890ff', cursor: 'pointer' }}
          >
            {record.title}
          </a>
        );
      },
    },
    {
      title: 'Year Published',
      dataIndex: 'yearPublished',
      key: 'yearPublished',
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
              <a href="/authors" onClick={(e) => { e.preventDefault(); window.location.href = '/authors'; }}>
                Authors
              </a>
            ),
          },
          {
            title: author ? `${author.firstName} ${author.lastName}` : 'Loading...',
          },
        ]}
      />

      <h1>
        {author.firstName} {author.lastName}
      </h1>

      <Row gutter={16} style={{ marginBottom: '16px' }}>
        <Col span={12}>
          <Card>
            <Statistic title="Books Written" value={author.booksCount || 0} />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic 
              title="Average Sales per Book" 
              value={author.averageSales || 0} 
              precision={2}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Author Information" style={{ marginBottom: '16px' }}>
        <Descriptions column={1}>
          <Descriptions.Item label="Name">
            {author.firstName} {author.lastName}
          </Descriptions.Item>
          <Descriptions.Item label="Books Written">{author.booksCount || 0}</Descriptions.Item>
          <Descriptions.Item label="Average Sales">{author.averageSales?.toFixed(2) || '0.00'}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Books by This Author">
        {books.length > 0 ? (
          <Table dataSource={books} columns={columns} rowKey="id" />
        ) : (
          <Empty description="No books found for this author" />
        )}
      </Card>
    </div>
  );
}