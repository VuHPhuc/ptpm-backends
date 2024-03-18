const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { authMiddleWare } = require("../middleware/authMiddleware");

// Tạo sản phẩm mới
router.post('/create', ProductController.createProduct);

// Cập nhật sản phẩm dựa trên ID
router.put('/update/:id', authMiddleWare, ProductController.updateProduct);

// Lấy thông tin chi tiết của một sản phẩm dựa trên ID
router.get('/get-details/:id', ProductController.getDetailsProduct);

// Xóa sản phẩm dựa trên ID
router.delete('/delete/:id', authMiddleWare, ProductController.deleteProduct);

// Lấy thông tin chi tiết của tất cả sản phẩm
router.get('/get-all', ProductController.getAllProduct);

// Xóa nhiều sản phẩm
router.post('/delete-many', authMiddleWare, ProductController.deleteMany);

// Lấy thông tin chi tiết của tất cả loại sản phẩm
router.get('/get-all-type', ProductController.getAllType);

// Xuất module 'router' để sử dụng trong các tệp tin khác
module.exports = router;