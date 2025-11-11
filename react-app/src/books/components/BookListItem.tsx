import { useEffect, useState } from 'react'
import type { BookModel, UpdateBookModel } from '../BookModel'
import { Button, Col, Row, Input, Select, Modal, App } from 'antd'
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
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
  }, [isEditing])

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
      <Row
        style={{
          width: '100%',
          minHeight: '50px',
          borderRadius: '10px',
          backgroundColor: '#EEEEEE',
          margin: '1rem 0',
          padding: '.25rem 1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Col span={12} style={{ margin: 'auto 0' }}>
          {isEditing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Input 
                placeholder="Title"
                value={title} 
                onChange={e => setTitle(e.target.value)} 
              />
              <Input 
                type="number"
                placeholder="Year"
                value={yearPublished} 
                onChange={e => setYearPublished(Number(e.target.value))} 
              />
            </div>
          ) : (
            <Link
              to={`/books/$bookId`}
              params={{ bookId: book.id }}
              style={{
                margin: 'auto 0',
                textAlign: 'left',
              }}
            >
              <span style={{ fontWeight: 'bold' }}>{book.title}</span> -{' '}
              {book.yearPublished}
            </Link>
          )}
        </Col>
        <Col span={9} style={{ margin: 'auto 0' }}>
          {isEditing ? (
            <Select
              style={{ width: '100%' }}
              value={authorId}
              options={authors.map(author => ({
                label: `${author.firstName} ${author.lastName}`,
                value: author.id,
              }))}
              onChange={value => setAuthorId(value)}
            />
          ) : (
            <>
              by <span style={{ fontWeight: 'bold' }}>{book.author.firstName}</span>{' '}
              <span style={{ fontWeight: 'bold' }}>{book.author.lastName}</span>
            </>
          )}
        </Col>
        <Col
          span={3}
          style={{
            alignItems: 'right',
            display: 'flex',
            gap: '.25rem',
            margin: 'auto 0',
          }}
        >
          {isEditing ? (
            <>
              <Button type="primary" onClick={onValidateEdit}>
                <CheckOutlined />
              </Button>
              <Button onClick={onCancelEdit}>
                <CloseOutlined />
              </Button>
            </>
          ) : (
            <Button type="primary" onClick={() => setIsEditing(true)}>
              <EditOutlined />
            </Button>
          )}
          <Button type="primary" danger onClick={handleDelete}>
            <DeleteOutlined />
          </Button>
        </Col>
      </Row>

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