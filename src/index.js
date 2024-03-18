const express = require("express");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const routes = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(bodyParser.json());
app.use(cookieParser());

routes(app);

// Kết nối tới cơ sở dữ liệu MongoDB
mongoose.connect(`${process.env.MONGO_DB}`)
    .then(() => {
         console.log('kết nối database thành công');
    })
    .catch((err) => {
         console.log(err);
    });

// Khởi động server và lắng nghe các yêu cầu từ cổng đã cấu hình
app.listen(port, () => {
     console.log('server đang chạy ở cổng port: ', + port);
});