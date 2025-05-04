import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../utils/baseurl';
import { Table, Tag, Space, Card, Typography, Descriptions, Badge } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  userId: string;
  clientId: string;
  cust_name: string;
  cust_email: string;
  cust_contact: string;
  cartItems: OrderItem[];
  createdAt: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
}

const MyOrderList = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrderList = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseUrl}/order-list`, {
        withCredentials: true,
      });
      setOrders(data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderList();
  }, []);

  const columns: ColumnsType<Order> = [
    {
      title: 'Order ID',
      dataIndex: '_id',
      key: '_id',
      render: (id) => <span>{id.substring(0, 8)}...</span>,
    },
    {
      title: 'Customer',
      dataIndex: 'userId',
      key: 'userId',
      render: (rowData) => rowData.name,
    },
    {
      title: 'Contact',
      dataIndex: 'userId',
      key: 'userId',
      render: (rowData) => rowData.contact,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Items',
      dataIndex: 'cartItems',
      key: 'items',
      render: (items: OrderItem[]) => items.length,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = '';
        switch (status) {
          case 'completed':
            color = 'green';
            break;
          case 'processing':
            color = 'blue';
            break;
          case 'pending':
            color = 'orange';
            break;
          case 'cancelled':
            color = 'red';
            break;
          default:
            color = 'gray';
        }
        return <Tag color={color}>{(status || '').toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <a>View Details</a>
          {record.status === 'pending' && <a>Cancel</a>}
        </Space>
      ),
    },
  ];

  const expandedRowRender = (order: Order) => {
    const columns: ColumnsType<OrderItem> = [
      { title: 'Product', dataIndex: 'name', key: 'name' },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (price) => `$${price}`,
      },
      { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
      {
        title: 'Total',
        key: 'total',
        render: (_, item) => `$${(item.price * item.quantity).toFixed(2)}`,
      },
    ];

    const totalAmount = order.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return (
      <Card size='small' style={{ margin: '10px 0' }}>
        <Descriptions bordered column={1} size='small'>
          <Descriptions.Item label='Customer Name'>
            {order.cust_name}
          </Descriptions.Item>
          <Descriptions.Item label='Email'>
            {order.cust_email}
          </Descriptions.Item>
          <Descriptions.Item label='Contact'>
            {order.cust_contact}
          </Descriptions.Item>
          <Descriptions.Item label='Order Date'>
            {new Date(order.createdAt).toLocaleString()}
          </Descriptions.Item>
        </Descriptions>

        <Table
          columns={columns}
          dataSource={order.cartItems}
          pagination={false}
          style={{ marginTop: 16 }}
          summary={() => (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={3}>
                  <strong>Total Amount</strong>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <strong>${totalAmount.toFixed(2)}</strong>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />
      </Card>
    );
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2} style={{ marginBottom: '24px' }}>
        My Orders
      </Title>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey='_id'
        loading={loading}
        expandable={{ expandedRowRender }}
        bordered
      />
    </div>
  );
};

export default MyOrderList;
