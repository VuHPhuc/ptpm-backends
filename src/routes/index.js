// Import các module Router
const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const OrderRouter = require('./OrderRouter')
const PaymentRouter = require('./PaymentRouter')

/**
 * Định nghĩa các tuyến đường (routes) trong ứng dụng
 * @param {object} app - Đối tượng ứng dụng Express
 */
const routes = (app) => {
    // Sử dụng UserRouter cho tuyến đường '/api/user'
    app.use('/api/user', UserRouter)
    
    // Sử dụng ProductRouter cho tuyến đường '/api/product'
    app.use('/api/product', ProductRouter)
    
    // Sử dụng OrderRouter cho tuyến đường '/api/order'
    app.use('/api/order', OrderRouter)
    
    // Sử dụng PaymentRouter cho tuyến đường '/api/payment'
    app.use('/api/payment', PaymentRouter)
}

// Xuất module routes để sử dụng trong ứng dụng chính
module.exports = routes