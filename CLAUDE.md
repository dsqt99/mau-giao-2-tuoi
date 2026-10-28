# CLAUDE.md - Hồ Sơ Học Tập & Phát Triển Của Bé Đỗ Minh Hoàng (Bé Ong) 🐝

## 1. THÔNG TIN BÉ (CHILD PROFILE)
- **Họ và tên đầy đủ:** Đỗ Minh Hoàng
- **Tên thân mật (Nickname):** Bé Ong (Bee 🐝)
- **Độ tuổi:** 2 tuổi (Giai đoạn Nhà trẻ / Mẫu giáo bé 2-3 tuổi)
- **Lớp học:** Donald 2 (Trường Mầm non song ngữ)
- **Giáo viên chủ nhiệm:** Cô Thơm & Cô Hằng
- **Linh vật đại diện:** Chú Ong Vàng Siêu Đáng Yêu (Happy Little Bee Hoàng)
- **Đặc điểm phát triển lứa tuổi 2 tuổi:**
  - Thị giác: Nhận biết các màu sắc cơ bản tương phản cao (Đỏ, Vàng, Xanh lam, Xanh lá, Cam, Hồng).
  - Vận động tinh & tương tác: Thao tác chạm (tap/click), ấn các nút to bản, phản xạ âm thanh tức thì.
  - Nhận thức: Thích lặp lại, gọi đúng tên mình "Đỗ Minh Hoàng", nhận biết các con vật nuôi, hình học cơ bản (tròn, vuông, tam giác, trái tim, ngôi sao) và số đếm từ 1 đến 5 (đặc biệt số 4 theo giáo trình tuần).
  - Ngôn ngữ: Phát triển vốn từ tiếng Việt và làm quen tiếng Anh đơn giản (Colors, Shapes, Numbers, Animals).

---

## 2. KẾ HOẠCH HỌC TẬP THỰC TẾ (CURRICULUM MAPPING)
Dự án được xây dựng bám sát theo giáo trình mầm non lớp **Donald 2**:
- **Chủ đề tháng/tuần:** *Bản thân và gia đình của bé* - *Tuần lễ hóa trang vui nhộn / Halloween thân thiện*.
- **Toán học & Nhận thức:**
  - Làm quen số đếm: 1, 2, 3, 4, 5.
  - Hoạt động đếm bí ngô và kẹo ngọt vào giỏ.
  - Nhận biết 6 hình khối: Circle (Tròn), Square (Vuông), Triangle (Tam giác), Heart (Trái tim), Star (Ngôi sao), Oval (Bầu dục).
- **Âm nhạc & Video thiếu nhi chọn lọc:**
  - Genki English: *Rainbow car*
  - Tiếng Anh: *The alphabet song*, *The wheels on the bus*
  - Tiếng Việt: *Một con vịt*, *Chú voi con ở Bản Đôn*, *Kìa con bướm vàng*, *Rửa mặt như mèo*.
- **Hoạt động STEAM:**
  - Science & Technology: Khám phá ánh sáng & âm thanh các loài vật.
  - Arts: Bảng vẽ sắc màu, đàn gõ Xylophone cầu vồng 8 nốt.

---

## 3. THIẾT KẾ & TRẢI NGHIỆM NGƯỜI DÙNG (DESIGN TASTE & UI/UX)
Tuân thủ nghiêm ngặt 3 tiêu chuẩn thiết kế cao cấp:
- **`design-taste-frontend`:** 
  - Phong cách: **Claymorphism** cao cấp (Soft 3D, nút bấm đồ chơi nảy phồng, viền bóng nổi, bo tròn 24-32px, chống cảm giác phẳng đơn điệu).
  - Bảng màu: Vàng Mật Ong (`#F59E0B`, `#FBBF24`), Xanh Da Trời (`#0284C7`), Hồng Kẹo Ngọt (`#EC4899`), Xanh Lá Mạ (`#10B981`), Tím Mơ Mộng (`#8B5CF6`).
  - Font chữ: **Baloo 2** (tròn trịa, thân thiện với trẻ nhỏ, hiển thị tiếng Việt hoàn hảo) kết hợp Outfit.
- **`ui-ux-pro-max`:**
  - Kích thước vùng bấm (Touch targets) cực lớn: 64px - 96px, chuẩn công thái học cho ngón tay trẻ 2 tuổi.
  - Phản hồi đa giác quan: Mọi thao tác chạm đều có âm thanh Web Audio + hiệu ứng vật lý nảy (bounce/spring) + pháo hoa giấy confetti.
  - Độ tương phản chữ đạt chuẩn WCAG AA (≥ 4.5:1), dễ nhìn dưới mọi ánh sáng.
- **`gpt-taste`:**
  - Cấu trúc AIDA khoa học: Navigation linh hoạt -> Hero Attention -> Bento Games Interest -> Media & Video Desire -> Parents Action.
  - Tuyệt đối không dùng nhãn thô ("Question 01", "Section 02"), không để trống ô lưới.
  - Chống tràn màn hình ngang (`overflow-x-hidden w-full max-w-full`).

---

## 4. HỆ THỐNG ÂM THANH NỘI BỘ & AI TTS (HIGH-FIDELITY SOUND & VIENEU-TTS ENGINE)
- **Giọng đọc AI Cao Cấp (VieNeu-TTS Studio Quality):**
  - **Server API:** [https://vieneu-tts.cahy.io.vn/](https://vieneu-tts.cahy.io.vn/)
  - **Giọng đọc chuẩn:** `Quỳnh Anh — Nữ · Bắc · Phong cách đọc truyện` (Truyền cảm, ấm áp, giọng kể chuyện thiếu nhi tự nhiên 48,000Hz).
  - **Tích hợp:** `@gradio/client` qua endpoint `/wrapper`, có bộ nhớ đệm `audioCache` trong RAM giúp phát tức thì 0ms các câu khen ngợi của bé Đỗ Minh Hoàng.
  - **Chế độ Fallback thông minh:** Tự động chuyển qua Web Speech API tiếng Việt hoặc âm chuông vui tươi `pop` nếu mất kết nối mạng.
- **Tiếng động vật thực tế (Authentic Animal Sounds):**
  - File MP3 cục bộ trong `/public/audio/`: Vịt (`duck.mp3`), Mèo (`cat.mp3`), Chó (`dog.mp3`), Bò sữa (`cow.mp3`), Ếch (`frog.mp3`), Voi (`elephant.mp3`), Sư tử (`lion.mp3`).
- **Web Audio Synthesizer:**
  - Tiếng bóng vỡ (Pop Sound), Đàn Xylophone 8 nốt C4-C5, Tiếng nhạc chúc mừng (Win Fanfare).
  - Tự động mở khóa âm thanh trên iOS / iPad Safari khi bé chạm lần đầu tiên.

---

## 5. DANH SÁCH TÍNH NĂNG CHÍNH CỦA WEBSITE
1. **Thanh Header & Hồ sơ bé Đỗ Minh Hoàng:**
   - Huy hiệu "Bé Ong" với số sao tích lũy.
   - Nút bật/tắt âm thanh, nút chế độ xem toàn màn hình (Fullscreen) cho iPad/máy tính bảng.
2. **Hero Khám Phá Cùng Bé Ong:**
   - Chú Ong Vàng 3D vẫy cánh tương tác, chạm vào sẽ bay lắc lư và phát tiếng kêu vui nhộn.
   - Lời chào cá nhân hóa cho bé Đỗ Minh Hoàng.
3. **Khu Vui Chơi & Trò Chơi Trí Tuệ (5 Games):**
   - **Game 1: Đập Bóng Bay Sắc Màu:** Bóng bay bay lên, bé chạm là vỡ bôm bốp, học màu sắc và số.
   - **Game 2: Nông Trại Vui Vẻ (Ú òa động vật):** Chạm vào con vật phát ra tiếng kêu đặc trưng và tên tiếng Việt/Anh.
   - **Game 3: Đàn Xylophone 8 Màu:** Bé tự gõ đàn phát ra các nốt nhạc Đồ - Rê - Mi - Pha - Sol - La - Si - Đố.
   - **Game 4: Khám Phá Hình Khối:** Chạm đúng hình học (Tròn, Vuông, Tam giác, Trái tim, Sao) nhận sao thưởng.
   - **Game 5: Bé Đếm Trái Cây 1-5:** Đếm táo, dâu tây, chuối, bí ngô vào giỏ cùng lời khen ngợi.
4. **Rạp Chiếu Phim & Nhạc Thiếu Nhi Của Bé Ong:**
   - Khung TV đồ chơi phát các video bài hát thiếu nhi an toàn đã kiểm duyệt (Rainbow Car, Wheels On The Bus, Alphabet, Bé vui học).
   - Lời bài hát karaoke nhảy chữ vui mắt.
5. **Góc Ba Mẹ & Hẹn Giờ Thông Minh (Parental Controls):**
   - Hẹn giờ chơi: 15 phút, 30 phút. Khi hết giờ, chuyển sang chế độ ru ngủ êm dịu (Lullaby sleep mode) nhắc bé nghỉ ngơi.
   - Giấy chứng nhận bé ngoan Đỗ Minh Hoàng để ba mẹ có thể bấm in/lưu làm kỷ niệm.

---

## 6. CÁCH KHỞI ĐỘNG DỰ ÁN CHO CÁC LẦN CHẠY SAU
```bash
# Cài đặt thư viện (nếu chưa có)
npm install

# Khởi chạy môi trường phát triển cục bộ
npm run dev

# Đóng gói sản phẩm tĩnh
npm run build
```

---
*Dành tặng riêng cho bé Đỗ Minh Hoàng (Bé Ong) - Chúc bé luôn vui khỏe, thông minh và tràn ngập tiếng cười!* 🐝💛
