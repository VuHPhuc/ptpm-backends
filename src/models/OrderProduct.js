const mongoose = require('mongoose')

// Định nghĩa Schema cho collection "order"
const orderSchema = new mongoose.Schema({
    orderItems: [
        {
            name: { type: String, required: true }, // Tên sản phẩm (bắt buộc)
            amount: { type: Number, required: true }, // Số lượng (bắt buộc)
            image: { type: String, required: true }, // Đường dẫn hình ảnh (bắt buộc)
            price: { type: Number, required: true }, // Giá (bắt buộc)
            discount: { type: Number }, // Giảm giá
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            }, // Tham chiếu đến sản phẩm trong collection "Product" (bắt buộc)
        },
    ],
    shippingAddress: {
        fullName: { type: String, required: true }, // Họ và tên người nhận (bắt buộc)
        address: { type: String, required: true }, // Địa chỉ (bắt buộc)
        city: { type: String, required: true }, // Thành phố (bắt buộc)
        phone: { type: Number, required: true }, // Số điện thoại (bắt buộc)
    },
    paymentMethod: { type: String, required: true }, // Phương thức thanh toán (bắt buộc)
    itemsPrice: { type: Number, required: true }, // Tổng giá trị sản phẩm (bắt buộc)
    shippingPrice: { type: Number, required: true }, // Phí vận chuyển (bắt buộc)
    totalPrice: { type: Number, required: true }, // Tổng giá trị đơn hàng (bắt buộc)
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Tham chiếu đến người dùng trong collection "User" (bắt buộc)
    isPaid: { type: Boolean, default: true }, // Trạng thái thanh toán (mặc định là true)
    paidAt: { type: Date }, // Thời điểm thanh toán
    isDelivered: { type: Boolean, default: true }, // Trạng thái giao hàng (mặc định là true)
    deliveredAt: { type: Date }, // Thời điểm giao hàng
},
    {
        timestamps: true, // Tự động tạo thêm trường "createdAt" và "updatedAt"
    }
);

// Tạo model "Order" từ Schema
const Order = mongoose.model('Order', orderSchema);

// Xuất module "Order" để sử dụng ở các file khác
module.exports = Order