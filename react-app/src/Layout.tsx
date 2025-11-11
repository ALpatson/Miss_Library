import { Link } from '@tanstack/react-router'
import { Route as indexRoute } from './routes/index'
import { Route as aboutRoute } from './routes/about'
import { Route as booksRoute } from './routes/books'
import { Space, type MenuProps } from 'antd'
import { BookOutlined, HomeOutlined, InfoOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import Menu from 'antd/es/menu/menu'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const items: Required<MenuProps>['items'] = [
    {
      label: <Link to={indexRoute.to}>Home</Link>,
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={booksRoute.to}>Books</Link>,
      key: 'books',
      icon: <BookOutlined />,
    },
    {
      label: <Link to="/authors">Authors</Link>,
      key: 'authors',
      icon: <TeamOutlined />,
    },
    {
      // @ts-ignore
      label: <Link to="/clients">Clients</Link>,
      key: 'clients',
      icon: <UserOutlined />,
    },
    {
      label: <Link to={aboutRoute.to}>About</Link>,
      key: 'about',
      icon: <InfoOutlined />,
    },
  
  ]

  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
        height: '100vh',
      }}
    >
      <div
        style={{
          textAlign: 'left',
          width: '100%',
          backgroundColor: '#395E66',
          color: 'white',
        }}
      >
        <h2 style={{ marginTop: '0',  paddingLeft: '20px', paddingTop: '10px'}}>Miss_Library</h2>
        <Menu mode="horizontal" items={items} />
      </div>
      <div style={{ width: '100%', overflowY: 'scroll' }}>{children}</div>
    </Space>
  )
}