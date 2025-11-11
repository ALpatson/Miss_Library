import { useEffect, useState } from 'react'
import type { BookModel, UpdateBookModel } from '../BookModel'
import { Button, Col, Row, Input, Select, Modal, App, Card, Badge } from 'antd'
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { useBookAuthorsProviders } from '../providers/useBookAuthorsProviders'

interface BookListItemProps {
  book: BookModel
  onDelete: (id: string) => void
  onUpdate: (id: string, input: UpdateBookModel) => void
}

export function BookListItem({ book, onDelete, onUpdate }: BookListItemProps) {
  const { message } = App.useApp();
  const [title, setTitle] = useState(book.title)
  const [yearPublished, setYearPublished] = useState(book.yearPublished)
  const [authorId, setAuthorId] = useState(book.author.id)
  const [isEditing, setIsEditing] = useState(false)
  const { authors, loadAuthors } = useBookAuthorsProviders()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  useEffect(() => {
    if (isEditing) {
      loadAuthors()
    }
  }, [isEditing, loadAuthors])

  const onCancelEdit = () => {
    setIsEditing(false)
    setTitle(book.title)
    setYearPublished(book.yearPublished)
    setAuthorId(book.author.id)
  }

  const onValidateEdit = () => {
    onUpdate(book.id, { title, yearPublished, authorId })
    setIsEditing(false)
  }

  const handleDelete = () => {
    setDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    try {
      await onDelete(book.id);
      message.success(`"${book.title}" deleted successfully!`);
      setDeleteModalOpen(false);
    } catch (error: any) {
      console.error('Delete failed:', error);
      
      const status = error.response?.status;
      
      if (status === 500 || status === 400) {
        message.error({
          content: `Cannot delete "${book.title}" - it has sales records. Delete the sales first.`,
          duration: 5,
        });
      } else {
        message.error(`Failed to delete "${book.title}"`);
      }
      setDeleteModalOpen(false);
    }
  }

  return (
    <>
      <Card
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '12px',
          marginBottom: '16px',
          border: 'none',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Row
          style={{
            width: '100%',
            minHeight: '50px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Col span={14} style={{ paddingLeft: '8px' }}>
            {isEditing ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div>
                  <label style={{ fontWeight: 'bold', marginBottom: '4px', display: 'block' }}>Title:</label>
                  <Input 
                    placeholder="Title"
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                  />
                </div>
                <div>
                  <label style={{ fontWeight: 'bold', marginBottom: '4px', display: 'block' }}>Author:</label>
                  <Select
                    style={{ width: '100%' }}
                    value={authorId}
                    options={authors.map(author => ({
                      label: `${author.firstName} ${author.lastName}`,
                      value: author.id,
                    }))}
                    onChange={value => setAuthorId(value)}
                  />
                </div>
                <div>
                  <label style={{ fontWeight: 'bold', marginBottom: '4px', display: 'block' }}>Year:</label>
                  <Input 
                    type="number"
                    placeholder="Year"
                    value={yearPublished} 
                    onChange={e => setYearPublished(Number(e.target.value))} 
                  />
                </div>
              </div>
            ) : (
              <Link
                to={`/books/$bookId`}
                params={{ bookId: book.id }}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block',
                }}
              >
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: '#1890ff' }}>
                    {book.title}
                  </div>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                    by <span style={{ fontWeight: '500' }}>{book.author.firstName} {book.author.lastName}</span>
                  </div>
                  {(book.salesCount !== undefined && book.salesCount > 0) && (
                    <div style={{ fontSize: '13px', color: '#52c41a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <UserOutlined />
                      <span>{book.salesCount} {book.salesCount === 1 ? 'client' : 'clients'} bought this book</span>
                    </div>
                  )}
                </div>
              </Link>
            )}
          </Col>
          <Col
            span={10}
            style={{
              display: 'flex',
              gap: '8px',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            {isEditing ? (
              <>
                <Button type="primary" onClick={onValidateEdit} icon={<CheckOutlined />}>
                  Save
                </Button>
                <Button onClick={onCancelEdit} icon={<CloseOutlined />}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button type="primary" onClick={() => setIsEditing(true)} icon={<EditOutlined />}>
                Edit
              </Button>
            )}
            <Button type="primary" danger onClick={handleDelete} icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Col>
        </Row>
      </Card>

      <Modal
        title="Delete Book"
        open={deleteModalOpen}
        onOk={handleConfirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        <p>
          Are you sure you want to delete <strong>{book.title}</strong>?
        </p>
      </Modal>
    </>
  )
}