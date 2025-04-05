# Dự án cuối kỳ SOA (Service-Oriented Architecture)

**Quản lý sự kiện tại trường đại học**

Đây là mã nguồn dùng để thiết kế trang web quản lý hoạt động, sự kiện dành cho sinh viên tại trường đại học. Phần backend (Java, Spring và MongoDB) được thiết kế chia thành nhiều services (service-based architecture) nhằm thuận tiện cho việc phát triển và triển khai ứng dụng. Các controller từ service tạo thành lớp API (REST HTTP) để nhận yêu cầu từ phía frontend.

## Sử dụng chương trình

Sau khi clone repository, cd đến đúng thư mục trên terminal:

* Thư mục backend: Mở tập tin `EventsApplication.java` và khởi chạy. Không cần cấu hình cơ sở dữ liệu tại local do đã có trên cloud.
* Thư mục frontend: Nhập và thực thi lệnh `npm install`, `npm run dev` rồi truy cập `http://localhost:5173` để vào trang web.

Tài khoản mẫu:

* Admin: username `admin`, password `123456`
* Sinh viên: username và password là `31251023456`

## Tổng quan

### TÁC GIẢ:

- Trần Nhật Khánh - Tác giả: [GitHub](https://github.com/tnKiness)
- Lê Lộc Sơn - Tác giả: [GitHub](https://github.com/SonLocLe)
- Trịnh Liên Hưng - Tác giả: [GitHub](https://github.com/lien-hung)

### MÔ TẢ
- Triển khai chương trình với mô hình Service Base
- Thiết kế UML: Use Case Diagram, Activity Diagram, Sequences Diagram, Class diagram
- Thiết kế cơ sở dữ liệu với MongoDB

### Tài liệu báo cáo: 

[Google Docs - Báo cáo](https://docs.google.com/document/d/160KTaMR-O9JICRL42knOODxxplQPVOVhr7HOzUw5Ta0/edit?tab=t.jtniadfyxuzc)

### LỜI CẢM ƠN
Chúng em xin chân thành cảm ơn thầy Đặng Ngọc Hoàng Thành đã tận tình hướng dẫn và giúp đỡ trong suốt quá trình học tập và thực hiện đề tài.