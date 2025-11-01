// react-app/src/clients/components/CreateClientModal.tsx

import { Modal, Form, Input } from 'antd';
import type { Client } from '../ClientModel';

interface CreateClientModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (payload: Partial<Client>) => Promise<Client | void>;
}

export default function CreateClientModal({
  open,
  onClose,
  onCreate,
}: CreateClientModalProps) {
  const [form] = Form.useForm();

  const handleOk = async (): Promise<void> => {
    try {
      const values = await form.validateFields();
      await onCreate(values);
      form.resetFields();
      onClose();
    } catch (err) {
      console.error('Validation failed:', err);
    }
  };

  const handleCancel = (): void => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Create Client"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Create"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: 'Please enter first name' }]}
        >
          <Input placeholder="John" />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: 'Please enter last name' }]}
        >
          <Input placeholder="Doe" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ type: 'email', message: 'Please enter a valid email' }]}
        >
          <Input placeholder="john.doe@example.com" />
        </Form.Item>

        <Form.Item name="photoUrl" label="Photo URL">
          <Input placeholder="https://example.com/photo.jpg" />
        </Form.Item>
      </Form>
    </Modal>
  );
}