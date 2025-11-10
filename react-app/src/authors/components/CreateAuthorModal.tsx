import { Modal, Form, Input, message } from 'antd';
import { useState } from 'react';
import type { CreateAuthorDto } from '../AuthorModel';

interface CreateAuthorModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (data: CreateAuthorDto) => Promise<void>;
}

export default function CreateAuthorModal({ visible, onClose, onCreate }: CreateAuthorModalProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleOk = async (): Promise<void> => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      await onCreate(values);
      message.success('Author created successfully!');
      form.resetFields();
      onClose();
    } catch (error) {
      console.error('Failed to create author:', error);
      message.error('Failed to create author');
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
      title="Add New Author"
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText="Create"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'Please enter first name' }]}
        >
          <Input placeholder="Enter first name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Please enter last name' }]}
        >
          <Input placeholder="Enter last name" />
        </Form.Item>

        <Form.Item
          label="Photo URL (Optional)"
          name="photoUrl"
          rules={[{ type: 'url', message: 'Please enter a valid URL' }]}
        >
          <Input placeholder="https://example.com/photo.jpg" />
        </Form.Item>
      </Form>
    </Modal>
  );
}