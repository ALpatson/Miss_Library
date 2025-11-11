import { useEffect, useState } from 'react';
import { Button, Breadcrumb, Empty } from 'antd';
import { PlusOutlined, HomeOutlined } from '@ant-design/icons';
import { useAuthorProvider } from '../providers/useAuthorProvider';
import AuthorList from '../components/AuthorList';
import CreateAuthorModal from '../components/CreateAuthorModal';

export default function AuthorsPage() {
  const { authors, loading, loadAuthors, createAuthor, deleteAuthor } = useAuthorProvider();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadAuthors();
  }, []);

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
            title: 'Authors',
          },
        ]}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h1>Authors</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModalVisible(true)}
        >
          Add Author
        </Button>
      </div>

      {authors && authors.length === 0 ? (
        <Empty description="No authors found. Add your first author!" />
      ) : (
        <AuthorList
          data={authors}
          loading={loading}
          onDelete={deleteAuthor}
        />
      )}

      <CreateAuthorModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCreate={createAuthor}
      />
    </div>
  );
}