import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseurl from '../../utils/baseurl';
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  Space,
  Modal,
  Form,
  InputNumber,
  message,
  notification,
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
const { Meta } = Card;
const { Search } = Input;

const ProductList = () => {
  const [form] = Form.useForm();
  const [products, setProducts] = useState<any>([]);
  const [visible, setVisible] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const fetchProductList = async () => {
    const { data } = await axios.get(`${baseurl}/product-list`, {
      withCredentials: true,
    });
    setProducts(data.data);
    setFilteredProducts(data.data);
  };

  useEffect(() => {
    fetchProductList().catch(console.log);
  }, []);

  const handleSearch = (value) => {
    if (!value) {
      setFilteredProducts(products);
      return;
    }
    const filtered = products.filter((product) =>
      product.p_name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const showModal = (product?: any) => {
    setCurrentProduct(product);
    if (product) {
      form.setFieldsValue({
        p_name: product.p_name,
        p_price: product.p_price,
        p_stock: product.p_stock,
        p_thumbnail: product.p_thumbnail,
      });
    } else {
      form.resetFields();
    }
    setVisible(true);
  };

  const butProduct = async (values: any) => {
    await axios.post(
      `${baseurl}/create-order`,
      {
        admin: values.userId?._id,
        product: values._id,
      },
      {
        withCredentials: true,
      }
    );
    notification.success({
      message: 'Product order successfully',
    });
  };

  return (
    <div style={{ padding: '24px' }}>
      <Space
        direction='vertical'
        style={{ width: '100%', marginBottom: '24px' }}
      >
        <Row justify='space-between' align='middle'>
          <Col>
            <h2>Product List</h2>
          </Col>
          <Col>
            {/* <Button
              type='primary'
              icon={<PlusOutlined />}
              onClick={() => showModal()}
            >
              Add Product
            </Button> */}
          </Col>
        </Row>

        <Search
          placeholder='Search products'
          allowClear
          enterButton={<SearchOutlined />}
          size='large'
          onSearch={handleSearch}
          style={{ maxWidth: '500px' }}
        />
      </Space>

      <Row gutter={[16, 16]}>
        {(filteredProducts || [])?.map((product) => (
          <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              {...(product.p_thumbnail
                ? {
                    cover: (
                      <div style={{ height: '200px', overflow: 'hidden' }}>
                        <img
                          alt={product.p_name}
                          src={
                            product.p_thumbnail ||
                            'https://via.placeholder.com/300x200?text=No+Image'
                          }
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                    ),
                  }
                : {})}
              // cover={
              //   <div style={{ height: '200px', overflow: 'hidden' }}>
              //     <img
              //       alt={product.p_name}
              //       src={
              //         product.p_thumbnail ||
              //         'https://via.placeholder.com/300x200?text=No+Image'
              //       }
              //       style={{
              //         width: '100%',
              //         height: '100%',
              //         objectFit: 'cover',
              //       }}
              //     />
              //   </div>
              // }
              actions={[
                <Button onClick={() => butProduct(product)}>Buy</Button>,
                // <EditOutlined key='edit' onClick={() => showModal(product)} />,
                // <DeleteOutlined
                //   key='delete'
                //   //onClick={() => handleDelete(product._id)}
                // />,
              ]}
            >
              <Meta
                title={product.p_name}
                description={
                  <Space direction='vertical'>
                    <div>Price: ₹{product.p_price.toFixed(2)}</div>
                    <div>Stock: {product.p_stock} units</div>
                    <div>Added by: {product.userId?.email || 'Unknown'}</div>
                  </Space>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title={currentProduct ? 'Edit Product' : 'Add New Product'}
        visible={visible}
        //  onOk={handleSubmit}
        onCancel={() => setVisible(false)}
        confirmLoading={loading}
      >
        <Form form={form} layout='vertical'>
          <Form.Item
            name='p_name'
            label='Product Name'
            rules={[{ required: true, message: 'Please enter product name' }]}
          >
            <Input placeholder='Enter product name' />
          </Form.Item>

          <Form.Item
            name='p_price'
            label='Price'
            rules={[{ required: true, message: 'Please enter price' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              step={0.01}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              //  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>

          <Form.Item
            name='p_stock'
            label='Stock'
            rules={[{ required: true, message: 'Please enter stock quantity' }]}
          >
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>

          <Form.Item name='p_thumbnail' label='Thumbnail URL'>
            <Input placeholder='Enter image URL' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductList;
