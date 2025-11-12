import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Card, Descriptions, Table, Empty, Breadcrumb, Spin, Statistic, Row, Col, Button, Input, Avatar, Space, App } from 'antd';
import { HomeOutlined, EditOutlined, SaveOutlined, CloseOutlined, UserOutlined, BookOutlined } from '@ant-design/icons';
import { Link, useNavigate } from '@tanstack/react-router';
import api from '../api';
import type { Author, Book, UpdateAuthorDto } from '../authors/AuthorModel';

export const Route = createFileRoute('/authors/$authorId')({
  component: AuthorDetailsPage,
});

interface BookWithSales extends Book {
  salesCount?: number;
}

function AuthorDetailsPage() {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { authorId } = Route.useParams();
  const [author, setAuthor] = useState<Author | null>(null);
  const [books, setBooks] = useState<BookWithSales[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Edit state
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const loadAuthor = async () => {
    if (!authorId) return;
    
    setLoading(true);
    try {
      // Try to get author with stats
      let authorData: Author;
      try {
        const statsRes = await api.get<Author>(`/authors/${authorId}/stats`);
        authorData = statsRes.data;
      } catch (err) {
        // Fallback to regular author endpoint
        const authorRes = await api.get<{ data: Author } | Author>(`/authors/${authorId}`);
        authorData = 'data' in authorRes.data ? authorRes.data.data : authorRes.data;
      }
      
      setAuthor(authorData);
      setFirstName(authorData.firstName);
      setLastName(authorData.lastName);
      setPhotoUrl(authorData.photoUrl || '');

      // Get books by this author
      try {
        const booksRes = await api.get<{ data: Book[] } | Book[]>(`/books`);
        const allBooks = 'data' in booksRes.data ? booksRes.data.data : booksRes.data;
        const authorBooks = allBooks.filter((book: Book) => 
          book.authorId === authorId || book.author?.id === authorId
        );
        
        const booksWithSales: BookWithSales[] = await Promise.all(
          authorBooks.map(async (book: Book): Promise<BookWithSales> => {
            try {
              const salesResponse = await api.get<unknown[]>(`/books/${book.id}/buyers`);
              const buyers = Array.isArray(salesResponse.data) ? salesResponse.data : [];
              return { ...book, salesCount: buyers.length };
            } catch (err) {
              return { ...book, salesCount: 0 };
            }
          })
        );
        
        setBooks(booksWithSales);
        
        // Calculate average sales if not provided by backend
        if (!authorData.averageSales && booksWithSales.length > 0) {
          const totalSales = booksWithSales.reduce((sum: number, book: BookWithSales) => sum + (book.salesCount || 0), 0);
          const avgSales = totalSales / booksWithSales.length;
          setAuthor(prev => prev ? { ...prev, averageSales: avgSales } : null);
        }
      } catch (err) {
        console.warn('Could not load books:', err);
        setBooks([]);
      }
    } catch (err) {
      console.error('Failed to load author:', err);
      message.error('Failed to load author details');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadAuthor();
  }, [authorId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    if (author) {
      setFirstName(author.firstName);
      setLastName(author.lastName);
      setPhotoUrl(author.photoUrl || '');
    }
    setIsEditing(false);
  };

  const handleSaveEdit = async () => {
    try {
      const updates: UpdateAuthorDto = {
        firstName,
        lastName,
        photoUrl: photoUrl || undefined,
      };
      await api.put(`/authors/${authorId}`, updates);
      message.success('Author updated successfully!');
      setIsEditing(false);
      loadAuthor();
    } catch (error) {
      console.error('Failed to update author:', error);
      message.error('Failed to update author');
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

  if (!author) {
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
          <Empty description="Author not found" />
        </Card>
      </div>
    );
  }


const columns = [
    {
      title: 'Title',
      dataIndex: 'title' as const,
      key: 'title',
      render: (title: string, record: BookWithSales) => (
        <a
          onClick={(e) => {
            e.preventDefault();
            handleBookClick(record.id);
          }}
          style={{ color: '#1890ff', cursor: 'pointer' }}
        >
          {title}
        </a>
      ),
    },
    {
      title: 'Year Published',
      dataIndex: 'yearPublished' as const,
      key: 'yearPublished',
    },
    {
      title: 'Sales',
      dataIndex: 'salesCount' as const,
      key: 'salesCount',
      render: (salesCount?: number) => salesCount || 0,
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
                <Link to="/authors" style={{ color: '#ffffff' }}>Authors</Link>
              ),
            },
            {
              title: <span style={{ color: '#ffffff' }}>{`${author.firstName} ${author.lastName}`}</span>,
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
            {author.firstName} {author.lastName}
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
                title="Books Written" 
                value={books.length || 0}
                prefix={<BookOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '12px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
            }}>
              <Statistic 
                title="Average Sales per Book" 
                value={author.averageSales || 0} 
                precision={1}
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
                Author Information
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
                    Edit Author
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
                    src={author.photoUrl} 
                    icon={<UserOutlined />}
                  >
                    {!author.photoUrl && author.firstName?.[0]}
                  </Avatar>
                )}
              </div>

              <div style={{ flex: 1 }}>
                <Descriptions bordered column={1}>
                  <Descriptions.Item label="First Name">
                    {isEditing ? (
                      <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    ) : (
                      <strong style={{ fontSize: '16px' }}>{author.firstName}</strong>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Last Name">
                    {isEditing ? (
                      <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    ) : (
                      <strong style={{ fontSize: '16px' }}>{author.lastName}</strong>
                    )}
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </div>
          </Space>
        </Card>

        <Card 
          title={`Books by ${author.firstName} ${author.lastName}`}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          }}
        >
          {books.length > 0 ? (
            <Table
              dataSource={books}
              columns={columns}
              rowKey="id"
              pagination={false}
            />
          ) : (
            <Empty description="No books found by this author" />
          )}
        </Card>
      </div>
    </div>
  );
}