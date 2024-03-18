const jwt = require('jsonwebtoken') // Import thư viện jwt để xử lý JSON Web Tokens
const dotenv = require('dotenv') // Import thư viện dotenv để đọc các biến môi trường từ file .env
dotenv.config() // Load các biến môi trường từ file .env

// Hàm tạo access token
const genneralAccessToken = async (payload) => {
    const access_token = jwt.sign({
        ...payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '30s' }) // Tạo token bằng cách sử dụng SECRET_KEY từ biến môi trường ACCESS_TOKEN, có thời hạn 30 giây

    return access_token // Trả về access token đã tạo thành công
}

// Hàm tạo refresh token
const genneralRefreshToken = async (payload) => {
    const refresh_token = jwt.sign({
        ...payload
    }, process.env.REFRESH_TOKEN, { expiresIn: '365d' }) // Tạo token bằng cách sử dụng SECRET_KEY từ biến môi trường REFRESH_TOKEN, có thời hạn 365 ngày

    return refresh_token // Trả về refresh token đã tạo thành công
}

// Dịch vụ làm mới access token
const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => { // Xác thực refresh token bằng cách so sánh với SECRET_KEY từ biến môi trường REFRESH_TOKEN
                if (err) {
                    resolve({
                        status: 'ERR',
                        message: 'The authentication'
                    }) // Nếu xác thực không thành công, trả về một phản hồi với trạng thái lỗi và thông báo lỗi tương ứng
                }
                const access_token = await genneralAccessToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin
                }) // Tạo access token mới bằng cách sử dụng hàm `genneralAccessToken` và payload là id và isAdmin từ refresh token

                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    access_token
                }) // Trả về phản hồi thành công với trạng thái OK, thông báo thành công và access token mới
            })
        } catch (e) {
            reject(e) // Nếu có lỗi trong quá trình xử lý, trả về lỗi tương ứng
        }
    })

}

module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refreshTokenJwtService
}