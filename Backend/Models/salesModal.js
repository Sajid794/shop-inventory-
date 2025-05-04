import mongoose from 'mongoose';

const salesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
    },
    cust_name: {
      type: String,
    },
    cust_email: {
      type: String,
    },
    cust_contact: {
      type: String,
    },
    cartItems: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Sale = mongoose.model('Sale', salesSchema);

export default Sale;
