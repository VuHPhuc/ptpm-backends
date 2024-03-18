const mongoose = require('mongoose')

// Định nghĩa Schema cho collection "user"
const userSchema = new mongoose.Schema(
    {
        name: { type: String }, // Tên người dùng
        email: { type: String, required: true, unique: true }, // Email (bắt buộc, duy nhất)
        password: { type: String, required: true }, // Mật khẩu (bắt buộc)
        isAdmin: { type: Boolean, default: false, required: true }, // Quyền admin (mặc định là false)
        phone: { type: Number }, // Số điện thoại
        address: { type: String }, // Địa chỉ
        avatar: { type: String }, // Đường dẫn avatar
        city: {type: String} // Thành phố
    },
    {
        timestamps: true // Tự động tạo thêm trường "createdAt" và "updatedAt"
    }
);

// Tạo model "User" từ Schema
const User = mongoose.model("User", userSchema);

// Xuất module "User" để sử dụng ở các file khác
module.exports = User;