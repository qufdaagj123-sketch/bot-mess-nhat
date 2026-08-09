const nodemailer = require("nodemailer");

// Cấu hình tài khoản gửi email (Ví dụ dùng Gmail)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Email của bạn
        pass: process.env.EMAIL_PASS  // Mật khẩu ứng dụng (App Password) của Gmail
    }
});

// Nội dung email cần gửi tự động
const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "qufdaagj123@gmail.com", // Email người nhận
    subject: "🤖 Thông báo từ Bot tự động trên Render",
    text: "Xin chào! Đây là tin nhắn tự động được gửi từ con bot chạy trên đám mây của tôi."
};

// Tiến hành gửi email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log("Lỗi gửi email: ", error);
    }
    console.log("Email đã được gửi thành công: " + info.response);
});
