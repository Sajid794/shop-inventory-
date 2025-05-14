import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseurl from '../../utils/baseurl';
import { Button, Card, Form, Input } from 'antd';

const LoginPage = () => {
  const [submitLoading, setSubmitLoading] = useState();
  const navigation = useNavigate();
  const onFinish = async (values) => {
    setSubmitLoading(true);
    const { data } = await axios.post(`${baseurl}/client-login`, values, {
      withCredentials: true,
    });
    console.log('Success:', data);
    if (data.status) {
      navigation('/client-dashBoard');
    }
    setSubmitLoading(false);
  };

  return (
    <div className=' flex justify-center items-start mt-20'>
      <Card className=' w-[500px] items-center'>
        <Form onFinish={onFinish} layout='vertical'>
          <Form.Item
            label='Email'
            name='email'
            rules={[
              {
                type: 'email',
                required: true,
                message: 'Please input your email !',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Button loading={submitLoading} block htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
        <p className='text-center text-gray-600'>
          Don't have an account?
          <Link to='/signupPage' className='ml-1 text-blue-500 hover:underline'>
            Sign Up
          </Link>
        </p>
      </Card>
    </div>
  );
};
export default LoginPage;
