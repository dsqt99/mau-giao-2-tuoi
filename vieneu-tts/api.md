# Tài liệu Hướng dẫn Gọi API VieNeu-TTS (v3 Turbo)

> **Server URL:** [https://vieneu-tts.cahy.io.vn/](https://vieneu-tts.cahy.io.vn/)  
> **Giọng được chọn mặc định:** `Quỳnh Anh — Nữ · Bắc · Phong cách đọc truyện` (Giọng đọc truyện thiếu nhi ấm áp, truyền cảm, phù hợp nhất cho bé mẫu giáo)  
> **Sample rate:** `48,000 Hz` (Studio Quality WAV)

---

## 🎙️ Danh sách giọng đọc có sẵn (Presets)

| Tên hiển thị (Dropdown) | Tên ngắn (SDK ID) | Giới tính / Vùng miền / Phong cách | Trạng thái |
| :--- | :--- | :--- | :--- |
| **`Quỳnh Anh — Nữ · Bắc · Phong cách đọc truyện`** | **`Quỳnh Anh`** | **Nữ · Bắc · Đọc truyện thiếu nhi** | ⭐ **Đang chọn cho Bé Ong** |
| `Trúc Ly — Nữ · Bắc · Phong cách tự nhiên` | `Trúc Ly` | Nữ · Bắc · Tự nhiên | Sẵn sàng |
| `Ngọc Linh — Nữ · Bắc · Phong cách kể chuyện` | `Ngọc Linh` | Nữ · Bắc · Kể chuyện | Sẵn sàng |
| `Phạm Tuyên — Nam · Bắc · Phong cách tự nhiên` | `Phạm Tuyên` | Nam · Bắc · Tự nhiên | Sẵn sàng |
| `Minh Đức — Nam · Bắc · Phong cách tin tức` | `Minh Đức` | Nam · Bắc · Tin tức | Sẵn sàng |
| `Thái Sơn — Nam · Nam · Phong cách kể chuyện` | `Thái Sơn` | Nam · Nam · Kể chuyện | Sẵn sàng |
| `Xuân Vĩnh — Nam · Bắc · Phong cách tự nhiên` | `Xuân Vĩnh` | Nam · Bắc · Tự nhiên | Sẵn sàng |
| `Thanh Bình — Nam · Bắc · Phong cách kể chuyện` | `Thanh Bình` | Nam · Bắc · Kể chuyện | Sẵn sàng |
| `Đoan Trang — Nữ · Bắc · Phong cách tự nhiên` | `Đoan Trang` | Nữ · Bắc · Tự nhiên | Sẵn sàng |
| `Mai Anh — Nữ · Bắc · Phong cách tin tức` | `Mai Anh` | Nữ · Bắc · Tin tức | Sẵn sàng |
| `Thục Đoan — Nữ · Nam · Phong cách kể chuyện` | `Thục Đoan` | Nữ · Nam · Kể chuyện | Sẵn sàng |
| `Minh Triết — Nam · Nam · Phong cách tin tức` | `Minh Triết` | Nam · Nam · Tin tức | Sẵn sàng |
| `Thùy Dung — Nữ · Nam · Phong cách tin tức` | `Thùy Dung` | Nữ · Nam · Tin tức | Sẵn sàng |
| `Quang Sơn — Nam · Trung · Phong cách tự nhiên` | `Quang Sơn` | Nam · Trung · Tự nhiên | Sẵn sàng |
| `Ngọc Trân — Nữ · Trung · Phong cách tự nhiên` | `Ngọc Trân` | Nữ · Trung · Tự nhiên | Sẵn sàng |
| `Mỹ Duyên — Nữ · Nam · Phong cách đọc truyện` | `Mỹ Duyên` | Nữ · Nam · Đọc truyện | Sẵn sàng |

---

## Cách 1: Gọi từ JavaScript / TypeScript (Frontend Web & Node.js)

Website học tập cho Bé Ong sử dụng thư viện `@gradio/client` gọi trực tiếp đến [VieNeu-TTS](https://vieneu-tts.cahy.io.vn/):

### Cài đặt:
```bash
npm install @gradio/client
```

### Code TypeScript / React:
```typescript
import { Client } from '@gradio/client';

const VIENEU_URL = 'https://vieneu-tts.cahy.io.vn/';
const DEFAULT_VOICE = 'Quỳnh Anh — Nữ · Bắc · Phong cách đọc truyện';

let clientPromise: Promise<Client> | null = null;
function getClient() {
  if (!clientPromise) {
    clientPromise = Client.connect(VIENEU_URL);
  }
  return clientPromise;
}

export async function synthesizeSpeech(text: string): Promise<string> {
  const client = await getClient();
  const job = client.submit('/wrapper', [
    text,            // param_0: Nội dung cần đọc
    DEFAULT_VOICE,   // param_1: Giọng đọc (Quỳnh Anh)
    null,            // param_2: Audio mẫu (null)
    '',              // param_3: Text mẫu
    'Standard (Một lần)', // param_5: Chế độ sinh
    true,            // param_6: Batch processing
    16,              // param_7: Batch size
    0.8,             // param_8: Temperature (tự nhiên)
    256,             // param_9: Max chars per chunk
    true,            // param_10: Denoise
  ]);

  for await (const msg of job) {
    if (msg.type === 'data') {
      const audioData = msg.data?.[0];
      if (audioData?.url) {
        return audioData.url; // URL file WAV trực tiếp để phát qua new Audio()
      }
    }
  }
  throw new Error('Không nhận được file âm thanh từ VieNeu-TTS');
}
```

---

## Cách 2: Dùng Python (`gradio_client`)

```bash
pip install gradio_client
```

```python
from gradio_client import Client

client = Client("https://vieneu-tts.cahy.io.vn/")

result = client.predict(
    "Chào bé Ong Đỗ Minh Hoàng! Chúc bé một ngày học tập thật ngoan và vui vẻ!",
    "Quỳnh Anh — Nữ · Bắc · Phong cách đọc truyện", # Giọng Quỳnh Anh
    None,                                          # custom_audio
    "",                                            # custom_text
    "Standard (Một lần)",                          # gen_mode
    True,                                          # use_batch
    16,                                            # max_batch_size
    0.8,                                           # temperature
    256,                                           # max_chars_chunk
    True,                                          # denoise
    api_name="/wrapper"
)

audio_file_path = result[0]['url'] if isinstance(result[0], dict) else result[0]
print("File audio kết quả:", audio_file_path)
```

---

## Cách 3: Dùng cURL / REST API

```bash
# 1. Gửi request sinh âm thanh
curl -X POST https://vieneu-tts.cahy.io.vn/gradio_api/call/wrapper \
  -H "Content-Type: application/json" \
  -d '{
    "data": [
      "Chào bé Ong Đỗ Minh Hoàng!",
      "Quỳnh Anh — Nữ · Bắc · Phong cách đọc truyện",
      null,
      "",
      "Standard (Một lần)",
      true,
      16,
      0.8,
      256,
      true
    ]
  }'

# 2. Nhận kết quả từ event_id trả về
curl https://vieneu-tts.cahy.io.vn/gradio_api/call/wrapper/<EVENT_ID>
```
