const mongoose = require('mongoose')

// Định nghĩa Schema cho collection "product"
const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true }, // Tên sản phẩm (bắt buộc, duy nhất)
        image: { type: String, required: true }, // Đường dẫn hình ảnh (bắt buộc)
        type: { type: String, required: true }, // Loại sản phẩm (bắt buộc)
        price: { type: Number, required: true }, // Giá (bắt buộc)
        countInStock: { type: Number, required: true }, // Số lượng trong kho (bắt buộc)
        rating: { type: Number, required: true }, // Đánh giá (bắt buộc)
        description: { type: String }, // Mô tả
        discount: { type: Number }, // Giảm giá
        selled: { type: Number } // Số lượng đã bán
    },
    {
        timestamps: true, // Tự động tạo thêm trường "createdAt" và "updatedAt"
    }
);

// Tạo model "Product" từ Schema
const Product = mongoose.model('Product', productSchema);

// Xuất module "Product" để sử dụng ở các file khác
module.exports = Product;