# Portfolio Cá Nhân - Nguyễn Văn Nhất

> **Senior Full-Stack Engineer & Cloud Solutions Architect**  
> **Cử nhân CNTT - Trường Đại học CMC (Tốt nghiệp loại Giỏi)**  
> **Email liên hệ**: [nhatx5xxx@gmail.com](mailto:nhatx5xxx@gmail.com)  
> Thiết kế theo phong cách Dark Tech Hiện đại, Glassmorphism, Micro-interactions với hiệu năng tối ưu 60fps.

---

## 📁 Cấu trúc thư mục được chia nhỏ (Modular Architecture)

Mã nguồn HTML đã được phân tách thành các file độc lập trong thư mục `sections/` để bạn dễ dàng mở và chỉnh sửa từng phần theo ý muốn mà không lo bị rối:

```text
c:\VanNhat\
├── sections\                  # 📂 CÁC PHẦN HTML ĐƯỢC CHIA NHỎ ĐỂ DỄ CHỈNH SỬA
│   ├── navbar.html            # 1. Thanh Menu, logo <VN />, nút chuyển EN/VI, âm thanh, xem CV
│   ├── hero.html              # 2. Phần giới thiệu mở đầu, họ tên Nguyễn Văn Nhất, avatar & stats
│   ├── terminal.html          # 3. Trình giả lập Developer Console (developer.ts, skills.json, CLI)
│   ├── about.html             # 4. Triết lý phát triển, tiêu chuẩn kỹ thuật & bảo mật
│   ├── skills.html            # 5. Kho kỹ năng công nghệ (Frontend, Backend, Cloud, AI)
│   ├── projects.html          # 6. Danh sách 3 dự án lớn kèm ảnh mockup 3D & chỉ số thực tế
│   ├── experience.html        # 7. Lộ trình nghề nghiệp & Học vấn ĐH CMC (Loại Giỏi)
│   ├── testimonials.html      # 8. Nhận xét từ CTO & Giám đốc sản phẩm
│   ├── contact.html           # 9. Email nhatx5xxx@gmail.com, SĐT, Zalo & Form gửi tin nhắn
│   ├── modals.html            # 10. Cửa sổ chi tiết kiến trúc dự án & Bản xem trước CV
│   └── footer.html            # 11. Chân trang bản quyền Nguyễn Văn Nhất & mạng xã hội
│
├── build.js                   # ⚙️ Script tự động ghép các file trong /sections thành index.html
├── index.html                 # 🌐 File HTML hoàn chỉnh (tạo tự động từ build.js)
├── css\
│   └── style.css              # 🎨 Design System, Token màu, Glassmorphism & Responsive
├── js\
│   ├── main.js                # 🚀 Logic chính: hạt Canvas, Typewriter, Bộ lọc, i18n
│   ├── terminal.js            # 💻 Logic Terminal & bộ lệnh CLI
│   └── audio.js               # 🔊 Bộ tổng hợp âm thanh qua Web Audio API
├── assets\images\             # 🖼️ Hình ảnh đại diện & Mockup giao diện dự án
└── README.md                  # 📖 Hướng dẫn sử dụng
```

---

## 🛠️ Cách chỉnh sửa và Cập nhật

1. Khi bạn muốn chỉnh sửa bất kỳ phần nào, hãy mở file tương ứng trong thư mục `sections/` (ví dụ: muốn sửa email hoặc SĐT thì mở [sections/contact.html](file:///c:/VanNhat/sections/contact.html), muốn sửa học vấn thì mở [sections/experience.html](file:///c:/VanNhat/sections/experience.html)).
2. Sau khi chỉnh sửa xong, mở terminal tại `c:\VanNhat` và chạy lệnh sau để tự động gộp thành `index.html`:
   ```bash
   node build.js
   ```
3. Mở file [index.html](file:///c:/VanNhat/index.html) bằng trình duyệt để xem kết quả ngay lập tức!

---

## 🌟 Thông tin cá nhân đã cấu hình chuẩn xác

- **Họ và tên**: **Nguyễn Văn Nhất**
- **Email**: **nhatx5xxx@gmail.com**
- **Học vấn**: **Trường Đại học CMC (CMC University) - Cử nhân Công nghệ Thông tin (Tốt nghiệp loại Giỏi)**
- **Chuyên môn**: Senior Full-Stack Engineer & Cloud Solutions Architect (React/Next.js, Node.js, Golang, Python, AWS, AI/LLM).
