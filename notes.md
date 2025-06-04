thêm hiệu ứng chuyển đổi nhẹ (fade-in và parallax mờ) cho từng section khi scroll:Khi cuộn xuống, mỗi section sẽ trượt nhẹ lên + mờ dần hiện ra.
* Tạo cảm giác sinh động và mượt mà cho nội dung chương.



ồ vấn đề là có khi do nội dung dài quá, : cấu túc như sau : trên cùng ở giữa là nội dung , liền dưới là các tầng của hình ảnh => thay đổi bố cục , nếu có nhiều hơn 2 ảnh thì sẽ thành, văn bản bên trái, danh sách các ảnh bên phải, có thể xem xét áp dụng shadcn ui cho slider hoặc cài thưu viện npm , thêm các hiệu ứng paradoxề là có khi do nội dung dài quá, : cấu túc như sau : trên cùng ở giữa là nội dung , liền dưới là các tầng của hình ảnh => thay đổi bố cục , nếu có nhiều hơn 2 ảnh thì sẽ thành, văn bản bên trái, danh sách các ảnh bên phải, có thể xem xét áp dụng shadcn ui cho slider hoặc cài thưu viện npm , thêm các hiệu ứng Parallax Scrolling cho việc xuất hiện và biến mất của các nội dung



Tuyệt vời, bạn muốn kết hợp cả **ngăn Vercel tự động deploy** *và* **ngăn người dùng truy cập website tạm thời**. Mình sẽ hướng dẫn bạn cấu hình theo **Cách 2 kết hợp**, rất gọn và hiệu quả:

---

## 🎯 Mục tiêu:

* Vercel vẫn được kết nối GitHub, **nhưng sẽ bỏ qua deploy khi bạn push**.
* Nếu có deploy (bằng tay), thì **người dùng sẽ bị redirect khỏi site** hoặc thấy trang thông báo.

---

## ✅ Bước 1: Chặn auto deploy bằng `vercel.json`

Tạo file `vercel.json` ở gốc project nếu chưa có, thêm dòng:

```json
{
  "ignoreCommand": "echo 'skip deployment'"
}
```

➡️ Lệnh này khiến Vercel **bỏ qua deploy mỗi khi bạn push code lên GitHub**.

---

## ✅ Bước 2: Ngăn người dùng truy cập bằng redirect

Trong **cùng file `vercel.json`**, thêm phần `redirects` như sau:

```json
{
  "ignoreCommand": "echo 'skip deployment'",
  "redirects": [
    {
      "source": "/(.*)",
      "destination": "/maintenance.html",
      "permanent": false
    }
  ]
}
```

---

## ✅ Bước 3: Tạo file `/public/maintenance.html`

Tạo file `public/maintenance.html` (hoặc `static/maintenance.html` tùy project):

```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <title>Bảo trì</title>
  </head>
  <body style="font-family:sans-serif; text-align:center; padding-top:10%;">
    <h1>🚧 Website đang được bảo trì</h1>
    <p>Vui lòng quay lại sau!</p>
  </body>
</html>
```

---

## ✅ Kết quả:

* Vercel sẽ **bỏ qua deploy khi bạn push code**.
* Nếu bạn **deploy thủ công bằng `vercel --prod`**, thì:

  * Người truy cập website sẽ được **redirect đến trang bảo trì**.

---

## 🔁 Khi muốn hoạt động lại:

1. **Xoá** phần `ignoreCommand` trong `vercel.json`.
2. **Xoá** hoặc comment phần `redirects`.
3. Deploy lại.

---

//home.tsx
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

// Backgrounds
import bg1 from "/images/bg1.png";
import bg2 from "/images/bg2.png";
import bg3 from "/images/bg3.png";

// Custom backgrounds
import biaChiHang from "/images/Bìa chị hằng.png";
import biaChuCuoi from "/images/Bìa chú cuội.png";
import biaNenTrongSuot from "/images/Bìa nền trong suốt.png";
import bia from "/images/Bìa.png";

// Characters
import chiHang from "/images/Chị Hằng.png";
import chuCuoi from "/images/Chú cuội.png";

// Background variations
import nenGradient from "/images/Nền gradient.png";
import nenGradientFlip from "/images/Nền gradient flip.png";
import nenHongNhat from "/images/Nền hồng nhạt.png";
import nenHong from "/images/Nền hồng.png";
import nenSang from "/images/Nền sáng.png";

// Decorative & Parallax
import nightSky from "/images/night-sky-998641.jpg";
import sub1 from "/images/sub1.png";
import sub2 from "/images/sub2.png";
import subSvg1 from "/images/sub1.svg";
import subSvg2 from "/images/sub2.svg";
