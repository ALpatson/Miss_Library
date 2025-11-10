
import { Modal, Form, Select, DatePicker, message } from 'antd';
import { useEffect, useState } from 'react';
import api from '../../api';
import type { Client } from '../../clients/ClientModel';
import dayjs from 'dayjs';

interface RecordSaleModalProps {
  open: boolean;
  bookId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function RecordSaleModal({
  open,
  bookId,
  onClose,
  onSuccess,
}: RecordSaleModalProps) {
  const [form] = Form.useForm();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadClients() {
      try {
        const res = await api.get<Client[]>('/clients');
        setClients(res.data);
      } catch (err) {
        console.error('Failed to load clients:', err);
      }
    }
    if (open) {
      loadClients();
    }
  }, [open]);

  const handleOk = async (): Promise<void> => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      
      const saleData = {
        clientId: values.clientId,
        bookId: bookId,
        date: values.date.format('YYYY-MM-DD'),
      };

      await api.post('/sales', saleData);
      
      message.success('Sale recorded successfully!');
      form.resetFields();
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Failed to record sale:', err);
      message.error('Failed to record sale');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (): void => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Record Sale"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Record Sale"
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="clientId"
          label="Client"
          rules={[{ required: true, message: 'Please select a client' }]}
        >
          <Select
            placeholder="Select a client"
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={clients.map((client) => ({
              value: client.id,
              label: `${client.firstName} ${client.lastName}`,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="date"
          label="Purchase Date"
          rules={[{ required: true, message: 'Please select a date' }]}
        >
          <DatePicker style={{ width: '100%' }} defaultValue={dayjs()} />
        </Form.Item>
      </Form>
    </Modal>
  );
}