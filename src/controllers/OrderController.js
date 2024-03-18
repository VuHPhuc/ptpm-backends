const OrderService = require('../services/OrderService')

// Tạo một đơn hàng mới
const createOrder = async (req, res) => {
    try { 
        const { paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone } = req.body
        
        // Kiểm tra các trường thông tin cần thiết
        if (!paymentMethod || !itemsPrice || !shippingPrice || !totalPrice || !fullName || !address || !city || !phone) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Lỗi'
            })
        }
        
        // Gọi hàm createOrder từ OrderService và trả về kết quả
        const response = await OrderService.createOrder(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

// Lấy thông tin chi tiết của tất cả đơn hàng của một người dùng
const getAllOrderDetails = async (req, res) => {
    try {
        const userId = req.params.id
        
        // Kiểm tra userId
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Lỗi'
            })
        }
        
        // Gọi hàm getAllOrderDetails từ OrderService và trả về kết quả
        const response = await OrderService.getAllOrderDetails(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

// Lấy thông tin chi tiết của một đơn hàng
const getDetailsOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        
        // Kiểm tra orderId
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Lỗi'
            })
        }
        
        // Gọi hàm getOrderDetails từ OrderService và trả về kết quả
        const response = await OrderService.getOrderDetails(orderId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

// Hủy chi tiết của một đơn hàng
const cancelOrderDetails = async (req, res) => {
    try {
        const data = req.body.orderItems
        const orderId = req.body.orderId
        
        // Kiểm tra orderId
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Lỗi'
            })
        }
        
        // Gọi hàm cancelOrderDetails từ OrderService và trả về kết quả
        const response = await OrderService.cancelOrderDetails(orderId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

// Lấy thông tin của tất cả đơn hàng
const getAllOrder = async (req, res) => {
    try {
        // Gọi hàm getAllOrder từ OrderService và trả về kết quả
        const data = await OrderService.getAllOrder()
        return res.status(200).json(data)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createOrder,
    getAllOrderDetails,
    getDetailsOrder,
    cancelOrderDetails,
    getAllOrder
}