



# Hướng dẫn cài đặt và chạy ứng dụng React + TypeScript + Vite + Tailwind

## Yêu cầu hệ thống
- Node.js (phiên bản mới nhất)
- npm hoặc yarn hoặc pnpm

## Cài đặt

1. Clone repository về máy của bạn:
```bash
git clone <repository-url> my-app
cd my-app
```

2. Cài đặt các dependencies:
```bash
npm install
```
Hoặc nếu bạn sử dụng yarn:
```bash
yarn
```

## Chạy ứng dụng

1. Khởi chạy môi trường development:
```bash
npm run dev
```
Hoặc với yarn:
```bash
yarn dev
```

2. Mở trình duyệt và truy cập: `http://localhost:5173`

## Các lệnh khác

- Build ứng dụng cho production:
```bash
npm run build
```

- Xem trước bản build:
```bash
npm run preview
```

## Cấu trúc dự án

Dự án sử dụng React 18, TypeScript, Vite và Tailwind CSS với các thư viện UI từ Radix UI. Cấu trúc thư mục đã được tổ chức sẵn với các components, contexts, hooks và pages.

----
```
src/
├── components/         # Các UI component (Button, Header, Sidebar...)
├── pages/              # Các trang chính (Login, Dashboard, etc.)
├── contexts/            # Context API (AuthContext)
├── routes/             # Định nghĩa route và guard
├── lib/                # Hàm tiện ích (role check, API utils, utils, ...)
├── services/           # Gọi API từ backend (axios)
├── App.tsx
├── main.tsx

```
