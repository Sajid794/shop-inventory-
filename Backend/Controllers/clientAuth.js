import bcrypt from 'bcrypt';
import client from '../Models/clientUserModal.js';
import Sale from '../Models/salesModal.js';
import Product from '../Models/productModal.js';

export const clientregisterController = async (req, res) => {
  try {
    const { email, password, ...restfield } = req.body;
    // Check if user already exists
    const existingUser = await client.findOne({ email });
    if (existingUser) {
      return res
        .status(404)
        .json({ status: false, message: 'User already exists' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newuser = new client({
      ...restfield,
      email,
      password: hashedPassword,
    });
    await newuser.save();
    res
      .status(200)
      .json({ status: true, message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Server error' });
  }
};

export const crateOderController = async (req, res) => {
  const { admin, product: productId } = req.body;
  const user = await client.findOne({ _id: req.user.userId });
  const product = await Product.findOne({ _id: productId });

  if (!user) {
    return res
      .status(404)
      .json({ status: false, message: 'Invalid email or password 1' });
  }

  const sale = await Sale.create({
    userId: admin,
    clientId: req.user.userId,
    cust_name: user.name,
    cust_email: user.email,
    cust_contact: user.contact,
    cartItems: [
      {
        c_id: product._id,
        c_name: product.p_name,
        c_price: product.p_price,
        c_quantity: 1,
        c_discount: 0,
        c_subtotal: product.p_price,
      },
    ],
  });
  return res.status(200).json({ status: true, sale });
  // console.log("order created",order);
};
