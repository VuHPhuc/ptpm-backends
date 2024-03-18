const ProductService = require('../services/ProductService')

// Hàm xử lý yêu cầu tạo sản phẩm mới
const createProduct = async (req, res) => {
    try {
        const { name, image, type, countInStock, price, rating, description, discount } = req.body

        // Kiểm tra các trường thông tin cần thiết
        if (!name || !image || !type || !countInStock || !price || !rating || !discount) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Lỗi'
            })
        }

        // Gọi hàm ProductService.createProduct để tạo sản phẩm mới
        const response = await ProductService.createProduct(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

// Hàm xử lý yêu cầu cập nhật thông tin sản phẩm
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const data = req.body

        // Kiểm tra productId có tồn tại không
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Lỗi'
            })
        }

        // Gọi hàm ProductService.updateProduct để cập nhật thông tin sản phẩm
        const response = await ProductService.updateProduct(productId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

// Hàm xử lý yêu cầu lấy thông tin chi tiết của sản phẩm
const getDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id

        // Kiểm tra productId có tồn tại không
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Lỗi'
            })
        }

        // Gọi hàm ProductService.getDetailsProduct để lấy thông tin chi tiết của sản phẩm
        const response = await ProductService.getDetailsProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

// Hàm xử lý yêu cầu xóa sản phẩm
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id

        // Kiểm tra productId có tồn tại không
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Lỗi'
            })
        }

        // Gọi hàm ProductService.deleteProduct để xóa sản phẩm
        const response = await ProductService.deleteProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

// Hàm xử lý yêu cầu xóa nhiều sản phẩm
const deleteMany = async (req, res) => {
    try {
        const ids = req.body.ids

        // Kiểm tra danh sách ids có tồn tại không
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Lỗi'
            })
        }

        // Gọi hàm ProductService.deleteManyProduct để xóa nhiều sản phẩm
        const response = await ProductService.deleteManyProduct(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

// Hàm xử lý yêu cầu lấy danh sách sản phẩm
const getAllProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query

        // Gọi hàm ProductService.getAllProduct để lấy danh sách sản phẩm
        const response = await ProductService.getAllProduct(Number(limit) || null, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

// Hàm xử lý yêu cầu lấy danh sách các loại sản phẩm
const getAllType = async (req, res) => {
    try {
        // Gọi hàm ProductService.getAllType để lấy danh sách các loại sản phẩm
        const response = await ProductService.getAllType()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    deleteMany,
    getAllType
}