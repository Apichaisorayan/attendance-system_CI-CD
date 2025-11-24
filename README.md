# ระบบเช็คชื่อ

ระบบเช็คชื่ออัตโนมัติด้วย Node.js, Hono, Vue.js และ Cloudflare

## คุณสมบัติ

- ✅ ลงทะเบียนด้วยเลขประจำตัว
- ✅ เช็คชื่อด้วยเลขประจำตัว
- ✅ บันทึกประวัติการเช็คชื่อ
- ✅ UI สวยงามด้วย Tailwind CSS

## เทคโนโลジี

- **Backend**: Node.js + Hono (Cloudflare Workers)
- **Frontend**: Vue.js 3 + Tailwind CSS
- **Database**: Cloudflare D1 (SQLite)
- **Deployment**: Cloudflare + GitHub Actions

## การติดตั้ง

### 1. ติดตั้ง Dependencies

```bash
npm install
cd api && npm install
cd ../client && npm install
```

### 2. ตั้งค่า Cloudflare D1 Database

```bash
# สร้าง database
wrangler d1 create attendance-db

# คัดลอก database_id ไปใส่ใน api/wrangler.toml

# รัน migration
cd api
npm run db:migrate
```

### 3. ตั้งค่า Environment Variables

สร้างไฟล์ `client/.env`:
```
VITE_API_URL=http://localhost:8787
```

### 4. รันโปรเจกต์

```bash
# Terminal 1: รัน API
npm run dev:api

# Terminal 2: รัน Client
npm run dev:client
```

เปิดเบราว์เซอร์ที่ http://localhost:5173

## การ Deploy

### ตั้งค่า GitHub Secrets

ไปที่ Settings > Secrets and variables > Actions และเพิ่ม:

- `CLOUDFLARE_API_TOKEN`: API Token จาก Cloudflare
- `CLOUDFLARE_ACCOUNT_ID`: Account ID จาก Cloudflare
- `VITE_API_URL`: URL ของ API (เช่น https://attendance-api.your-subdomain.workers.dev)

### Deploy

Push โค้ดไปที่ branch `main` แล้ว GitHub Actions จะ deploy อัตโนมัติ

## API Endpoints

- `POST /api/register` - ลงทะเบียน
- `POST /api/checkin` - เช็คชื่อ
- `GET /api/attendance/:student_id` - ดูประวัติการเช็คชื่อ

## โครงสร้างโปรเจกต์

```
attendance-system/
├── api/                    # Backend API
│   ├── src/
│   │   └── index.js       # Hono API routes
│   ├── schema.sql         # Database schema
│   └── wrangler.toml      # Cloudflare config
├── client/                # Frontend
│   ├── src/
│   │   ├── pages/         # Vue pages
│   │   ├── App.vue        # Main component
│   │   └── main.js        # Entry point
│   └── index.html
└── .github/
    └── workflows/
        └── deploy.yml     # CI/CD
```
