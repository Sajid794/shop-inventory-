import React, { useState, useEffect } from 'react';
import {
  Table,
  Card,
  Space,
  Button,
  Input,
  Tag,
  Drawer,
  Descriptions,
  Modal,
  message,
  Tooltip,
  Typography,
  Row,
  Col,
  Statistic,
} from 'antd';
import {
  SearchOutlined,
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  ReloadOutlined,
  FileExcelOutlined,
  PrinterOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const SalesList = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [viewDrawerVisible, setViewDrawerVisible] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [statistics, setStatistics] = useState({
    totalSales: 0,
    todaySales: 0,
    totalRevenue: 0,
    averageValue: 0,
  });

  // Function to fetch sales data from API
  const fetchSales = async () => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      // const response = await fetch('/api/sales');
      // const data = await response.json();

      // Simulated data for demonstration purposes
      const mockData = Array.from({ length: 50 }, (_, index) => ({
        _id: `sale_${index + 1}`,
        userId: `user_${Math.floor(Math.random() * 10) + 1}`,
        clientId: `client_${Math.floor(Math.random() * 20) + 1}`,
        cust_name: `Customer ${index + 1}`,
        cust_email: `customer${index + 1}@example.com`,
        cust_contact: `+1 ${Math.floor(Math.random() * 900) + 100}-${
          Math.floor(Math.random() * 900) + 100
        }-${Math.floor(Math.random() * 9000) + 1000}`,
        createdAt: new Date(
          Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
        ).toISOString(),
        cartItems: Array.from(
          { length: Math.floor(Math.random() * 5) + 1 },
          (_, itemIndex) => ({
            _id: `product_${itemIndex + 1}`,
            name: `Product ${itemIndex + 1}`,
            price: Math.floor(Math.random() * 100) + 10,
            quantity: Math.floor(Math.random() * 5) + 1,
          })
        ),
        status: ['Completed', 'Pending', 'Cancelled'][
          Math.floor(Math.random() * 3)
        ],
      }));

      setSales(mockData);

      // Calculate statistics
      const totalRevenue = mockData.reduce((sum, sale) => {
        const saleTotal = sale.cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        return sum + saleTotal;
      }, 0);

      const today = new Date().toISOString().split('T')[0];
      const todaySales = mockData.filter(
        (sale) => sale.createdAt.split('T')[0] === today
      ).length;

      setStatistics({
        totalSales: mockData.length,
        todaySales,
        totalRevenue,
        averageValue: totalRevenue / mockData.length,
      });
    } catch (error) {
      message.error('Failed to fetch sales data');
      console.error('Error fetching sales:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  // Calculate total amount for a sale
  const calculateTotal = (cartItems) => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Handle view sale details
  const handleViewSale = (record) => {
    setSelectedSale(record);
    setViewDrawerVisible(true);
  };

  // Filter sales based on search text
  const filteredSales = sales.filter(
    (sale) =>
      sale.cust_name.toLowerCase().includes(searchText.toLowerCase()) ||
      sale.cust_email.toLowerCase().includes(searchText.toLowerCase()) ||
      sale.cust_contact.toLowerCase().includes(searchText.toLowerCase())
  );

  // Status tag color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'green';
      case 'Pending':
        return 'orange';
      case 'Cancelled':
        return 'red';
      default:
        return 'blue';
    }
  };

  // Table columns configuration
  const columns = [
    {
      title: 'Customer',
      dataIndex: 'cust_name',
      key: 'cust_name',
      render: (text, record) => (
        <Space direction='vertical' size='small'>
          <Text strong>{text}</Text>
          <Text type='secondary'>{record.cust_email}</Text>
        </Space>
      ),
      sorter: (a, b) => a.cust_name.localeCompare(b.cust_name),
    },
    {
      title: 'Contact',
      dataIndex: 'cust_contact',
      key: 'cust_contact',
    },
    {
      title: 'Items',
      dataIndex: 'cartItems',
      key: 'cartItems',
      render: (cartItems) => `${cartItems.length} item(s)`,
      sorter: (a, b) => a.cartItems.length - b.cartItems.length,
    },
    {
      title: 'Total',
      key: 'total',
      render: (_, record) => `$${calculateTotal(record.cartItems).toFixed(2)}`,
      sorter: (a, b) =>
        calculateTotal(a.cartItems) - calculateTotal(b.cartItems),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => new Date(text).toLocaleDateString(),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>,
      filters: [
        { text: 'Completed', value: 'Completed' },
        { text: 'Pending', value: 'Pending' },
        { text: 'Cancelled', value: 'Cancelled' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size='small'>
          <Tooltip title='View Details'>
            <Button
              type='text'
              icon={<EyeOutlined />}
              onClick={() => handleViewSale(record)}
            />
          </Tooltip>
          <Tooltip title='Edit'>
            <Button
              type='text'
              icon={<EditOutlined />}
              onClick={() => message.info('Edit functionality would go here')}
            />
          </Tooltip>
          <Tooltip title='Delete'>
            <Button
              type='text'
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                Modal.confirm({
                  title: 'Are you sure you want to delete this sale?',
                  content: 'This action cannot be undone.',
                  okText: 'Yes',
                  okType: 'danger',
                  cancelText: 'No',
                  onOk: () => {
                    message.success('Sale deleted successfully');
                    // Implement delete functionality here
                  },
                });
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className='sales-list-container' style={{ padding: '24px' }}>
      <Title level={2}>Sales Management</Title>

      {/* Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title='Total Sales'
              value={statistics.totalSales}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Today's Sales"
              value={statistics.todaySales}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title='Total Revenue'
              value={statistics.totalRevenue.toFixed(2)}
              prefix='$'
              precision={2}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title='Average Sale Value'
              value={statistics.averageValue.toFixed(2)}
              prefix='$'
              precision={2}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <Space
          style={{
            marginBottom: 16,
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Space>
            <Input
              placeholder='Search by customer name, email or contact'
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
              allowClear
            />
            <Button
              icon={<ReloadOutlined />}
              onClick={fetchSales}
              loading={loading}
            >
              Refresh
            </Button>
          </Space>
          <Space>
            <Button icon={<FileExcelOutlined />} type='primary' ghost>
              Export to Excel
            </Button>
            <Button icon={<PrinterOutlined />} type='primary' ghost>
              Print
            </Button>
            <Button type='primary' icon={<ShoppingCartOutlined />}>
              New Sale
            </Button>
          </Space>
        </Space>

        <Table
          columns={columns}
          dataSource={filteredSales}
          rowKey='_id'
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} sales`,
          }}
          bordered
          size='middle'
        />
      </Card>

      {/* Sale Details Drawer */}
      <Drawer
        title='Sale Details'
        placement='right'
        width={600}
        onClose={() => setViewDrawerVisible(false)}
        open={viewDrawerVisible}
        extra={
          <Space>
            <Button icon={<PrinterOutlined />}>Print</Button>
            <Button type='primary' icon={<EditOutlined />}>
              Edit
            </Button>
          </Space>
        }
      >
        {selectedSale && (
          <>
            <Descriptions bordered column={1} size='small'>
              <Descriptions.Item label='Customer Name'>
                {selectedSale.cust_name}
              </Descriptions.Item>
              <Descriptions.Item label='Email'>
                {selectedSale.cust_email}
              </Descriptions.Item>
              <Descriptions.Item label='Contact'>
                {selectedSale.cust_contact}
              </Descriptions.Item>
              <Descriptions.Item label='Date'>
                {new Date(selectedSale.createdAt).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label='Status'>
                <Tag color={getStatusColor(selectedSale.status)}>
                  {selectedSale.status}
                </Tag>
              </Descriptions.Item>
            </Descriptions>

            <Title level={4} style={{ margin: '24px 0 16px' }}>
              Items
            </Title>
            <Table
              dataSource={selectedSale.cartItems}
              columns={[
                {
                  title: 'Product',
                  dataIndex: 'name',
                  key: 'name',
                },
                {
                  title: 'Price',
                  dataIndex: 'price',
                  key: 'price',
                  render: (price) => `$${price.toFixed(2)}`,
                },
                {
                  title: 'Quantity',
                  dataIndex: 'quantity',
                  key: 'quantity',
                },
                {
                  title: 'Subtotal',
                  key: 'subtotal',
                  render: (_, record) =>
                    `$${(record.price * record.quantity).toFixed(2)}`,
                },
              ]}
              pagination={false}
              rowKey='_id'
              summary={() => (
                <Table.Summary fixed='bottom'>
                  <Table.Summary.Row>
                    <Table.Summary.Cell colSpan={3} index={0}>
                      <Text strong>Total</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                      <Text strong>
                        ${calculateTotal(selectedSale.cartItems).toFixed(2)}
                      </Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              )}
            />
          </>
        )}
      </Drawer>
    </div>
  );
};

export default SalesList;
