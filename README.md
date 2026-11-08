# Jojo — Your Personal AI Agent from AitechAsia

**JojoAgent (`JojoAgent.app`)** là trợ lý AI cá nhân bằng giọng nói trực tiếp trên macOS từ **AitechAsia**, giúp bạn trò chuyện rảnh tay và hỗ trợ giải đáp trực tiếp ngay trên màn hình làm việc.

---

## 📦 Cài đặt trên macOS

**Yêu cầu hệ thống:** macOS 12.0 trở lên (hỗ trợ cả chip Apple Silicon `M1/M2/M3/M4` và Intel).

### Cách 1: Cài đặt bằng bộ cài `.dmg` (Khuyên dùng)
1. Tải tệp **`JojoAgent-macos-universal-v1.0.0.dmg`** từ trang [**Releases**](https://github.com/ethando1984/JojoAgent/releases/latest) (hoặc tải trực tiếp tệp **`JojoAgent.dmg`** trong repository này).
2. Nhấp đúp mở tệp `.dmg`, sau đó kéo biểu tượng **`JojoAgent.app`** thả vào thư mục **`Applications`**.
3. Mở **`JojoAgent`** từ **Applications** hoặc **Launchpad**. Nếu macOS hỏi xác nhận mở ứng dụng lần đầu, chọn **Open** (hoặc chạy lệnh `xattr -cr /Applications/JojoAgent.app` trong Terminal).

### Cách 2: Tải tệp `.zip` hoặc `.app` trực tiếp
1. Tải **`JojoAgent-macos-universal-v1.0.0.zip`** từ trang [**Releases**](https://github.com/ethando1984/JojoAgent/releases/latest) và giải nén (hoặc lấy trực tiếp thư mục **`JojoAgent.app`**).
2. Kéo **`JojoAgent.app`** vào thư mục **`/Applications`** và mở ứng dụng.

---

## 🚀 Hướng dẫn sử dụng

### 1. Đăng nhập / Cấu hình lần đầu
1. Khi mở ứng dụng, biểu tượng **◉** của **JojoAgent** sẽ xuất hiện trên thanh Menu Bar (góc trên bên phải màn hình) cùng quả cầu **Jojo** ở góc dưới màn hình.
2. Nhấp vào biểu tượng **◉** trên Menu Bar → chọn **Cấu hình Token / Đăng nhập jojo…** (hoặc nhấn phím tắt **`⌘,`**).
3. Nhập **Tài khoản & Mật khẩu** của bạn trên **AitechAsia** (hoặc nhập **Token / API Key**), sau đó nhấn **Lưu**.

### 2. Trò chuyện bằng giọng nói
- **Bắt đầu / Kết thúc cuộc gọi:** Nhấp trực tiếp vào quả cầu **Jojo** trên màn hình hoặc nhấn **`⌘R`**.
- Lần đầu sử dụng, macOS sẽ hỏi quyền truy cập **Microphone** — hãy nhấn **Allow (Cho phép)** để trò chuyện với Jojo.
- Khi đang trò chuyện, cửa sổ mặc định ở chế độ **Thu gọn** kèm phụ đề hội thoại nổi giúp bạn vừa nói chuyện vừa làm việc. Bạn có thể cuộn lên/xuống trên khung hội thoại để xem lại lịch sử trò chuyện.

### 3. Di chuyển & Chuyển đổi chế độ hiển thị
- **Di chuyển vị trí:** Nhấn giữ chuột vào quả cầu **Jojo** và kéo tới bất kỳ vị trí nào trên màn hình (hỗ trợ cả ở chế độ thu nhỏ và toàn màn hình).
- **Mở rộng / Thu gọn:** Nhấn nút **Mở rộng / Thu gọn** bên dưới quả cầu hoặc nhấn phím tắt **`⌘M`**.
- **Đặt lại vị trí mặc định:** Mở menu **◉** trên Menu Bar → chọn **Đặt lại vị trí quả cầu**.

### 4. Nhờ Jojo xem & giải thích nội dung trên màn hình
- **Bằng giọng nói:** Trong lúc đang trò chuyện, bạn chỉ cần nói tự nhiên như:
  - *"Jojo chụp màn hình xem giúp mình lỗi này là gì"*
  - *"Trên màn hình đang hiển thị gì vậy?"*
  - *"Giải thích nội dung trên màn hình giúp tôi"*
- **Bằng nút bấm / phím tắt:** Nhấn biểu tượng **📸** cạnh quả cầu hoặc nhấn phím tắt **`⌘S`**.
- *Lưu ý:* Lần đầu sử dụng tính năng chụp màn hình, hãy cấp quyền **Screen Recording** cho **JojoAgent** trong **System Settings → Privacy & Security → Screen Recording**.

---

## ⌨️ Phím tắt nhanh

| Phím tắt | Chức năng |
| :--- | :--- |
| **`⌘R`** | Bắt đầu / Kết thúc cuộc gọi giọng nói |
| **`⌘M`** | Chuyển đổi chế độ Toàn màn hình / Thu gọn |
| **`⌘S`** | Chụp & Phân tích màn hình hiện tại |
| **`⌘L`** | Bật / Tắt bảng Console & Hội thoại |
| **`⌘,`** | Mở cấu hình đăng nhập / Token |
| **`⌘Q`** | Thoát ứng dụng JojoAgent |
