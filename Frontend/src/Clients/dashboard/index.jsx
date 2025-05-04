import React from 'react';
import { Tabs, Grid, Button, notification } from 'antd';
import {
  AppstoreOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import ProductList from './ProductList';
import MyOrderList from './MyOrderList';
import SalesList from './SalesList';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../../utils/baseurl';

const ClientDashBoard = () => {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = React.useState('Products');
  const isSmallScreen = Grid.useBreakpoint()?.xs;

  const managerTabs = [
    {
      key: 'Products',
      label: (
        <span>
          <AppstoreOutlined className='mr-2' />
          Products
        </span>
      ),
      children: <ProductList />,
    },
    {
      key: 'orders',
      label: (
        <span>
          <ShoppingCartOutlined className='mr-2' />
          My Orders
        </span>
      ),
      children: <MyOrderList />,
    },
    {
      key: 'address',
      label: (
        <span>
          <HomeOutlined className='mr-2' />
          Address
        </span>
      ),
      children: <SalesList />,
    },
    {
      key: 'Logout',
      label: (
        <span>
          <LogoutOutlined className='mr-2' />
          Logout
        </span>
      ),
      children: (
        <div>
          <Button
            onClick={async () => {
              await axios.get(`${baseUrl}/client-logout`);
              notification.success({ description: 'Logged out successfully' });
              navigate('/');
            }}
            icon={<LogoutOutlined className='mr-2' />}
            size='large'
            danger
            block
          >
            Logout
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className='p-4 flex flex-col'>
      <Tabs
        tabBarStyle={{
          width: isSmallScreen ? '100%' : '13rem',
          transition: 'all 0.3s ease',
        }}
        tabPosition={isSmallScreen ? 'top' : 'left'}
        type='line'
        onChange={setActiveKey}
        activeKey={activeKey}
        items={managerTabs}
      />
    </div>
  );
};

export default ClientDashBoard;
