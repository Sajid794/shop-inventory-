import { Link } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaUserAlt, FaPhoneAlt } from 'react-icons/fa';
import { useState } from 'react';
import baseUrl from '../../utils/baseurl';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmpassword) {
      setError('Password and confirm password must match.');
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/clientsignup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          contact,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.status === false) {
        setError(data.message);
      } else if (data.status === true) {
        setSuccess(data.message);
        setName('');
        setContact('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        setError('Something went wrong! Please try again later.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <div
      className='flex min-h-screen items-center justify-center bg-cover bg-center'
      style={{
        backgroundImage:
          "url('https://source.unsplash.com/1600x900/?office,workspace')",
      }}
    >
      <div className='w-full max-w-md p-8 space-y-6 bg-white bg-opacity-90 rounded-2xl shadow-2xl'>
        <h2 className='text-4xl font-bold text-center text-green-600 mb-2'>
          Client Sign Up
        </h2>
        <p className='text-center text-gray-600 mb-6'>
          Create your new account below.
        </p>

        <form onSubmit={handleSubmit} className='space-y-5'>
          {/* Name */}
          <div className='relative'>
            <FaUserAlt className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-sm' />
            <input
              type='text'
              placeholder='Full Name'
              className='w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-green-500'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className='relative'>
            <FaPhoneAlt className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-sm' />
            <input
              type='tel'
              placeholder='Contact Number'
              className='w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-green-500'
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>

          <div className='relative'>
            <MdEmail className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-xl' />
            <input
              type='email'
              placeholder='Email'
              className='w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-green-500'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className='relative'>
            <RiLockPasswordFill className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-xl' />
            <input
              type='password'
              placeholder='Password'
              className='w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-green-500'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className='relative'>
            <RiLockPasswordFill className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-xl' />
            <input
              type='password'
              placeholder='Confirm Password'
              className='w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-green-500'
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type='submit'
            className='w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition'
          >
            Sign Up
          </button>
        </form>

        {error && <p className='text-red-500 text-center'>{error}</p>}
        {success && <p className='text-green-500 text-center'>{success}</p>}

        <p className='text-center text-gray-600'>
          Already have an account?
          <Link to='/loginPage' className='ml-1 text-green-500 hover:underline'>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
