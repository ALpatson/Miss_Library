import { useState } from 'react'
import { Table, Space, Button, Avatar, Modal } from 'antd'
import { DeleteOutlined, UserOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { Client } from '../ClientModel'

interface ClientListProps {
  data: Client[] | null
  loading: boolean
  onDelete: (id: number) => void
}

export default function ClientList({ data, loading, onDelete }: ClientListProps) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null)

  const handleDeleteClick = (client: Client): void => {
    setClientToDelete(client)
    setDeleteModalOpen(true)
  }

  const handleConfirmDelete = async (): Promise<void> => {
    if (!clientToDelete) return
    await onDelete(clientToDelete.id)
    setDeleteModalOpen(false)
    setClientToDelete(null)
  }

  const columns: ColumnsType<Client> = [
    {
      title: 'Name',
      key: 'name',
      render: (_: unknown, record: Client) => {
        const clientPath = `/clients/${record.id}`
        return (
          <Space>
            <Avatar src={record.photoUrl} icon={<UserOutlined />}>
              {!record.photoUrl && record.firstName?.[0]}
            </Avatar>
            <a
              href={clientPath}
              onClick={e => {
                e.preventDefault()
                window.location.href = clientPath
              }}
              style={{ color: '#1890ff', cursor: 'pointer' }}
            >
              {record.firstName} {record.lastName}
            </a>
          </Space>
        )
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email: string | null) => email || '—',
    },
    {
      title: 'Books Bought',
      dataIndex: 'booksCount',
      key: 'booksCount',
      render: (count: number | undefined) => count || 0,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: Client) => (
        <Space>
          <Button
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteClick(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <>
      <Table<Client>
        rowKey="id"
        dataSource={data ?? []}
        columns={columns}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title="Delete Client"
        open={deleteModalOpen}
        onOk={handleConfirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        {clientToDelete && (
          <p>
            Are you sure you want to delete{' '}
            <strong>
              {clientToDelete.firstName} {clientToDelete.lastName}
            </strong>
            ?
          </p>
        )}
      </Modal>
    </>
  )
}
