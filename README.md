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