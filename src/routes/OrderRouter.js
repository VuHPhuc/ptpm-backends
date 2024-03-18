const express = require("express");
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const { authUserMiddleWare, authMiddleWare } = require("../middleware/authMiddleware");

// Tạo đơn hàng mới
router.post('/create/:id', authUserMiddleWare, OrderController.createOrder);

// Lấy thông tin chi tiết của tất cả đơn hàng của người dùng
router.get('/get-all-order/:id', authUserMiddleWare, OrderController.getAllOrderDetails);

// Lấy thông tin chi tiết của một đơn hàng dựa trên ID
router.get('/get-details-order/:id', OrderController.getDetailsOrder);

// Hủy đơn hàng dựa trên ID
router.delete('/cancel-order/:id', authUserMiddleWare, OrderController.cancelOrderDetails);

// Lấy thông tin chi tiết của tất cả đơn hàng (yêu cầu quyền admin)
router.get('/get-all-order', authMiddleWare, OrderController.getAllOrder);

// Xuất module 'router' để sử dụng trong các tệp tin khác
module.exports = router;