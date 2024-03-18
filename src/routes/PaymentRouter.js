const express = require("express");
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

// Route để lấy thông tin cấu hình
router.get('/config', (req, res) => {
  return res.status(200).json({
    status: 'OK',
    data: process.env.CLIENT_ID
  });
});

// Xuất module 'router' để sử dụng trong các tệp tin khác
module.exports = router;