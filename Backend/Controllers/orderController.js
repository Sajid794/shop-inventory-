import Product from '../Models/productModal.js';
import User from '../Models/userModel.js';
import Order from '../Models/orderItemModel.js';

export const createOrder = async (req, res) => {
  try {
    const { userId } = req.user;
    const { items, shippingAddress, paymentMethod, notes } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order items are required' });
    }

    if (!shippingAddress) {
      return res.status(400).json({ message: 'Shipping address is required' });
    }

    if (!paymentMethod) {
      return res.status(400).json({ message: 'Payment method is required' });
    }

    const addressError = validateShippingAddress(shippingAddress);
    if (addressError) {
      return res.status(400).json({ message: addressError });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const { productId, quantity } = item;

      if (!productId || !quantity) {
        return res
          .status(400)
          .json({ message: 'Each item must have productId and quantity' });
      }

      if (quantity < 1) {
        return res.status(400).json({ message: 'Quantity must be at least 1' });
      }

      const product = await Product.findById(productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found: ${productId}` });
      }

      if (product.p_stock < quantity) {
        return res.status(400).json({
          message: `Insufficient stock for product: ${product.p_name}. Available: ${product.p_stock}`,
        });
      }

      const itemTotal = product.p_price * quantity;
      totalAmount += itemTotal;

      orderItems.push({
        productId: product._id,
        quantity,
        priceAtPurchase: product.p_price,
        nameAtPurchase: product.p_name,
        thumbnailAtPurchase: product.p_thumbnail,
      });

      product.p_stock -= quantity;
    }

    const order = new Order({
      userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
      paymentStatus: 'pending',
      orderStatus: 'processing',
      notes,
    });

    const createdOrder = await order.save();

    for (const item of items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { p_stock: -item.quantity },
      });
    }

    res.status(201).json({
      message: 'Order created successfully',
      order: createdOrder,
      orderId: createdOrder._id,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      message: 'Failed to create order',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};
