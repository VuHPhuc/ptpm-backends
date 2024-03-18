const express = require("express");
const router = express.Router();
const userController = require('../controllers/UserController');
const { authMiddleWare, authUserMiddleWare } = require("../middleware/authMiddleware");

// Đăng ký tài khoản người dùng mới
router.post('/sign-up', userController.createUser);

// Đăng nhập người dùng
router.post('/sign-in', userController.loginUser);

// Đăng xuất người dùng
router.post('/log-out', userController.logoutUser);

// Cập nhật thông tin người dùng dựa trên ID (yêu cầu xác thực người dùng)
router.put('/update-user/:id', authUserMiddleWare, userController.updateUser);

// Xóa người dùng dựa trên ID (yêu cầu xác thực người dùng)
router.delete('/delete-user/:id', authMiddleWare, userController.deleteUser);

// Lấy thông tin chi tiết của tất cả người dùng (yêu cầu xác thực người dùng)
router.get('/getAll', authMiddleWare, userController.getAllUser);

// Lấy thông tin chi tiết của người dùng dựa trên ID (yêu cầu xác thực người dùng)
router.get('/get-details/:id', authUserMiddleWare, userController.getDetailsUser);

// Làm mới mã thông báo truy cập
router.post('/refresh-token', userController.refreshToken);

// Xóa nhiều người dùng cùng lúc (yêu cầu xác thực người dùng)
router.post('/delete-many', authMiddleWare, userController.deleteMany);

// Xuất module 'router' để sử dụng trong các tệp tin khác
module.exports = router;