const jwt = require('jsonwebtoken') // Import thư viện jwt để xử lý JSON Web Tokens
const dotenv = require('dotenv') // Import thư viện dotenv để đọc các biến môi trường từ file .env
dotenv.config() // Load các biến môi trường từ file .env

// Middleware xác thực cho người dùng có quyền quản trị
const authMiddleWare = (req, res, next) => {
    const token = req.headers.token.split(' ')[1] // Lấy token từ header yêu cầu và tách phần chuỗi sau khoảng trắng
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) { // Xác thực token bằng cách sử dụng SECRET_KEY từ biến môi trường ACCESS_TOKEN
        if (err) {
            return res.status(404).json({
                message: 'lỗi xác thực',
                status: 'ERROR'
            })
        }
        if (user?.isAdmin) { // Kiểm tra xem người dùng có quyền quản trị không
            next() // Tiếp tục xử lý middleware tiếp theo
        } else {
            return res.status(404).json({
                message: 'lỗi xác thực',
                status: 'ERROR'
            })
        }
    });
}

// Middleware xác thực cho người dùng
const authUserMiddleWare = (req, res, next) => {
    const token = req.headers.token.split(' ')[1] // Lấy token từ header yêu cầu và tách phần chuỗi sau khoảng trắng
    const userId = req.params.id // Lấy giá trị tham số "id" từ yêu cầu
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) { // Xác thực token bằng cách sử dụng SECRET_KEY từ biến môi trường ACCESS_TOKEN
        if (err) {
            return res.status(404).json({
                message: 'lỗi xác thực',
                status: 'ERROR'
            })
        }
        if (user?.isAdmin || user?.id === userId) { // Kiểm tra xem người dùng có quyền quản trị hoặc là chủ sở hữu của tài nguyên không
            next() // Tiếp tục xử lý middleware tiếp theo
        } else {
            return res.status(404).json({
                message: 'lỗi xác thực',
                status: 'ERROR'
            })
        }
    });
}

module.exports = {
    authMiddleWare,
    authUserMiddleWare
}