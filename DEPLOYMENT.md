# คู่มือการ Deploy ระบบเช็คชื่อ

## เตรียมความพร้อม

### 1. สร้าง Cloudflare API Token

1. ไปที่ https://dash.cloudflare.com/profile/api-tokens
2. คลิก **"Create Token"**
3. เลือก **"Edit Cloudflare Workers"** template
4. หรือสร้าง Custom Token ที่มี permissions:
   - `Account > Cloudflare Pages > Edit`
   - `Account > Cloudflare Workers > Edit`
   - `Account > D1 > Edit`
5. คลิก **"Continue to summary"** > **"Create Token"**
6. **คัดลอก Token** (จะแสดงครั้งเดียว!)

### 2. หา Cloudflare Account ID

1. ไปที่ https://dash.cloudflare.com/
2. เลือก domain/account ของคุณ
3. **Account ID** จะอยู่ด้านขวามือ (คัดลอกไว้)

---

## Deploy ครั้งแรก (Manual)

### 1. Deploy Database

```bash
cd api

# สร้าง D1 Database
npx wrangler d1 create attendance-db

# คัดลอก database_id ที่ได้ไปแทนใน api/wrangler.toml
# แทนที่ "your-database-id" ด้วย database_id ที่ได้

# รัน migration
npx wrangler d1 execute attendance-db --file=./schema.sql
```

### 2. Deploy API (Cloudflare Workers)

```bash
cd api
npx wrangler deploy
```

จะได้ URL ประมาณ: `https://attendance-api.your-subdomain.workers.dev`

**คัดลอก URL นี้ไว้!**

### 3. สร้าง Cloudflare Pages Project

```bash
cd client
npx wrangler pages project create attendance-client
```

หรือสร้างผ่าน Dashboard:
1. ไปที่ https://dash.cloudflare.com/
2. คลิก **Pages** > **Create a project**
3. เลือก **"Direct Upload"**
4. ตั้งชื่อ project: `attendance-client`

---

## ตั้งค่า GitHub Secrets

ไปที่ GitHub Repository > **Settings** > **Secrets and variables** > **Actions**

คลิก **"New repository secret"** และเพิ่ม:

### 1. CLOUDFLARE_API_TOKEN
- Value: Token ที่ได้จากขั้นตอนที่ 1

### 2. CLOUDFLARE_ACCOUNT_ID
- Value: Account ID ที่ได้จากขั้นตอนที่ 2

### 3. VITE_API_URL
- Value: URL ของ API ที่ deploy แล้ว
- ตัวอย่าง: `https://attendance-api.your-subdomain.workers.dev`

---

## Deploy ผ่าน GitHub Actions

### วิธีที่ 1: Push โค้ด

```bash
git add .
git commit -m "Setup deployment"
git push origin main
```

GitHub Actions จะ deploy อัตโนมัติ!

### วิธีที่ 2: Manual Trigger

1. ไปที่ GitHub Repository
2. คลิก **Actions** tab
3. เลือก **"Deploy to Cloudflare"** workflow
4. คลิก **"Run workflow"** > **"Run workflow"**

---

## ตรวจสอบการ Deploy

### ดู Logs

1. ไปที่ **Actions** tab ใน GitHub
2. คลิกที่ workflow run ล่าสุด
3. ดู logs ของแต่ละ job

### ทดสอบ API

```bash
curl https://attendance-api.your-subdomain.workers.dev/api/register \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"student_id":"12345","name":"ทดสอบ","class_name":"ม.4/1"}'
```

### เปิดเว็บไซต์

URL จะเป็น: `https://attendance-client.pages.dev`

หรือดูใน Cloudflare Dashboard > Pages > attendance-client

---

## Custom Domain (Optional)

### สำหรับ API:

1. ไปที่ Cloudflare Dashboard > Workers & Pages
2. เลือก `attendance-api`
3. คลิก **Settings** > **Triggers** > **Custom Domains**
4. เพิ่ม domain เช่น `api.yourdomain.com`

### สำหรับ Client:

1. ไปที่ Cloudflare Dashboard > Pages
2. เลือก `attendance-client`
3. คลิก **Custom domains**
4. เพิ่ม domain เช่น `attendance.yourdomain.com`

แล้วอัพเดท GitHub Secret `VITE_API_URL` เป็น custom domain ของ API

---

## Troubleshooting

### Error: "Unauthorized" ใน GitHub Actions

- ตรวจสอบว่า `CLOUDFLARE_API_TOKEN` ถูกต้อง
- ตรวจสอบว่า Token มี permissions ครบ

### Error: "Project not found"

- ตรวจสอบว่าสร้าง Pages project แล้ว
- ตรวจสอบชื่อ project ใน `.github/workflows/deploy.yml`

### CORS Error

- ตรวจสอบว่า `VITE_API_URL` ใน GitHub Secrets ถูกต้อง
- ตรวจสอบว่า API deploy สำเร็จแล้ว

### Database Error

- ตรวจสอบว่า `database_id` ใน `api/wrangler.toml` ถูกต้อง
- ตรวจสอบว่ารัน migration แล้ว

---

## การอัพเดทระบบ

เมื่อแก้ไขโค้ด เพียงแค่:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

GitHub Actions จะ deploy ให้อัตโนมัติ! 🚀

---

## URLs สำคัญ

- **Cloudflare Dashboard**: https://dash.cloudflare.com/
- **GitHub Actions**: https://github.com/YOUR_USERNAME/YOUR_REPO/actions
- **API URL**: `https://attendance-api.your-subdomain.workers.dev`
- **Client URL**: `https://attendance-client.pages.dev`
