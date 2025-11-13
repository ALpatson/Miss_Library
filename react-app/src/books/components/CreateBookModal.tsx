import { useEffect, useState } from 'react'
import type { CreateBookModel } from '../BookModel'
import { Button, Input, Modal, Select, Space, App } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useBookAuthorsProviders } from '../providers/useBookAuthorsProviders'

interface CreateBookModalProps {
  onCreate: (book: CreateBookModel) => void
}

export function CreateBookModal({ onCreate }: CreateBookModalProps) {
  const { message } = App.useApp();
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [yearPublished, setYearPublished] = useState<number | undefined>(undefined)
  const [authorId, setAuthorId] = useState<string | undefined>(undefined)
  const [photoUrl, setPhotoUrl] = useState('')
  const { authors, loadAuthors } = useBookAuthorsProviders()

  const onClose = () => {
    setTitle('')
    setYearPublished(undefined)
    setPhotoUrl('')
    setAuthorId(undefined)
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen) {
      loadAuthors()
    }
  }, [isOpen])

  const handleOk = async () => {
    if (!title || !authorId || !yearPublished) {
      message.error('Please fill in all required fields');
      return;
    }

    try {
      const bookData: CreateBookModel = {
        title: title.trim(),
        yearPublished,
        authorId,
      };
      
      if (photoUrl && photoUrl.trim() !== '') {
        bookData.photoUrl = photoUrl.trim();
      }
      
      await onCreate(bookData);
      message.success('Book created successfully!');
      onClose();
    } catch (error) {
      console.error('Failed to create book:', error);
      message.error('Failed to create book');
    }
  };

  // Check if form is valid
  const isFormValid = title.trim().length > 0 && authorId !== undefined && yearPublished !== undefined && yearPublished > 0;

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setIsOpen(true)}
      >
        Create Book
      </Button>
      <Modal
        title="Create New Book"
        open={isOpen}
        onCancel={onClose}
        onOk={handleOk}
        okText="Create"
        okButtonProps={{
          disabled: !isFormValid,
        }}
      >
        <Space direction="vertical" style={{ width: '100%', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Title <span style={{ color: 'red' }}>*</span>
            </label>
            <Input
              placeholder="Enter book title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              size="large"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Author <span style={{ color: 'red' }}>*</span>
            </label>
            <Select
              style={{ width: '100%' }}
              placeholder="Select an author"
              value={authorId}
              size="large"
              options={authors.map(author => ({
                label: `${author.firstName} ${author.lastName}`,
                value: author.id,
              }))}
              onChange={value => setAuthorId(value)}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Year Published <span style={{ color: 'red' }}>*</span>
            </label>
            <Input
              type="number"
              placeholder="Enter year (e.g., 2024)"
              value={yearPublished || ''}
              onChange={e => {
                const value = e.target.value;
                setYearPublished(value ? Number(value) : undefined);
              }}
              size="large"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Book Photo URL (Optional)
            </label>
            <Input
              placeholder="https://example.com/book-cover.jpg"
              value={photoUrl}
              onChange={e => setPhotoUrl(e.target.value)}
              size="large"
            />
            {photoUrl && photoUrl.trim() !== '' && (
              <div style={{ marginTop: '12px', textAlign: 'center' }}>
                <img 
                  src={photoUrl} 
                  alt="Book preview"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                  style={{ 
                    width: '120px', 
                    height: '180px', 
                    objectFit: 'cover',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }} 
                />
              </div>
            )}
          </div>
        </Space>
      </Modal>
    </>
  )
}