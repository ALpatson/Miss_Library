import { useEffect, useState } from 'react'
import type { CreateBookModel } from '../BookModel'
import { Button, Input, Modal, Select, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useBookAuthorsProviders } from '../providers/useBookAuthorsProviders'

interface CreateBookModalProps {
  onCreate: (book: CreateBookModel) => void
}

export function CreateBookModal({ onCreate }: CreateBookModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [yearPublished, setYearPublished] = useState(0)
  const [authorId, setAuthorId] = useState<string | undefined>(undefined)
  const { authors, loadAuthors } = useBookAuthorsProviders()

  const onClose = () => {
    setTitle('')
    setYearPublished(0)
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen) {
      loadAuthors()
    }
  }, [isOpen])

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
        open={isOpen}
        onCancel={onClose}
        onOk={() => {
          onCreate({
            title,
            yearPublished,
            authorId: authorId!,
          })
          onClose()
        }}
        okButtonProps={{
          disabled: !authorId || !title?.length || !yearPublished,
        }}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <Select
            style={{ width: '100%' }}
            options={authors.map(author => ({
              label: `${author.firstName} ${author.lastName}`,
              value: author.id,
            }))}
            onChange={value => setAuthorId(value)}
          />
          <Input
            type="number"
            placeholder="Year Published"
            value={yearPublished}
            onChange={e => setYearPublished(Number(e.target.value))}
          />
        </Space>
      </Modal>
    </>
  )
}
