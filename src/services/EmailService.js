// Import thư viện nodemailer để gửi email
const nodemailer = require('nodemailer');
// Import thư viện dotenv để đọc biến môi trường từ file .env
const dotenv = require('dotenv');
dotenv.config();
// Import plugin inlineBase64 để nhúng hình ảnh trong email
var inlineBase64 = require('nodemailer-plugin-inline-base64');

// Hàm gửi email thông báo đơn hàng mới
const sendEmailCreateOrder = async (email, orderItems) => {
  // Tạo đối tượng transporter để thiết lập thông tin gửi email
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Địa chỉ máy chủ SMTP
    port: 465, // Cổng sử dụng (đúng cho cổng 465, sai cho tất cả các cổng khác)
    secure: true, // Sử dụng SSL/TLS
    auth: {
      user: process.env.MAIL_ACCOUNT, // Tài khoản email người gửi
      pass: process.env.MAIL_PASSWORD, // Mật khẩu email người gửi
    },
  });
  
  // Sử dụng plugin inlineBase64 để nhúng hình ảnh trong email
  transporter.use('compile', inlineBase64({ cidPrefix: 'somePrefix_' }));

  let listItem = '';
  const attachImage = [];

  // Duyệt qua danh sách sản phẩm trong đơn hàng để tạo nội dung email
  orderItems.forEach((order) => {
    listItem += `<div>
      <div>
        Bạn đã đặt sản phẩm <b>${order.name}</b> với số lượng: <b>${order.amount}</b> và giá là: <b>${order.price} VND</b>
      </div>
      <div>Bên dưới là hình ảnh của sản phẩm</div>
    </div>`;
    
    // Thêm hình ảnh vào danh sách đính kèm
    attachImage.push({ path: order.image });
  });

  // Gửi email với thông tin đã thiết lập
  let info = await transporter.sendMail({
    from: process.env.MAIL_ACCOUNT, // Địa chỉ email người gửi
    to: email, // Danh sách địa chỉ email người nhận
    subject: "Bạn đã đặt hàng tại shop JK-Figure", // Chủ đề của email
    text: "Bạn đã đặt hàng tại shop JK-Figure", // Nội dung văn bản của email
    html: `<div><b>Bạn đã đặt hàng thành công tại shop JK-Figure</b></div> ${listItem}`, // Nội dung HTML của email
    attachments: attachImage, // Danh sách hình ảnh đính kèm
  });
}

// Xuất hàm sendEmailCreateOrder để có thể sử dụng trong các file khác
module.exports = {
  sendEmailCreateOrder
}
