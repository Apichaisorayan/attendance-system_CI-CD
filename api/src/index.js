import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();

// CORS middleware
app.use('/*', cors({
  origin: (origin) => origin,
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
}));

// ลงทะเบียน
app.post('/api/register', async (c) => {
  try {
    const { student_id, name, class_name } = await c.req.json();
    
    if (!student_id || !name || !class_name) {
      return c.json({ error: 'กรุณากรอกข้อมูลให้ครบถ้วน' }, 400);
    }

    const db = c.env.DB;
    
    // ตรวจสอบว่ามีเลขประจำตัวนี้แล้วหรือไม่
    const existing = await db.prepare(
      'SELECT student_id FROM users WHERE student_id = ?'
    ).bind(student_id).first();
    
    if (existing) {
      return c.json({ error: 'เลขประจำตัวนี้ลงทะเบียนแล้ว' }, 400);
    }

    // บันทึกข้อมูล
    await db.prepare(
      'INSERT INTO users (student_id, name, class_name) VALUES (?, ?, ?)'
    ).bind(student_id, name, class_name).run();

    return c.json({ 
      success: true, 
      message: 'ลงทะเบียนสำเร็จ',
      data: { student_id, name, class_name }
    });
  } catch (error) {
    return c.json({ error: 'เกิดข้อผิดพลาด: ' + error.message }, 500);
  }
});

// เช็คชื่อ
app.post('/api/checkin', async (c) => {
  try {
    const { student_id } = await c.req.json();
    
    if (!student_id) {
      return c.json({ error: 'กรุณากรอกเลขประจำตัว' }, 400);
    }

    const db = c.env.DB;
    
    // ตรวจสอบว่ามีเลขประจำตัวนี้ในระบบหรือไม่
    const user = await db.prepare(
      'SELECT student_id, name, class_name FROM users WHERE student_id = ?'
    ).bind(student_id).first();
    
    if (!user) {
      return c.json({ error: 'ไม่พบเลขประจำตัวนี้ในระบบ กรุณาลงทะเบียนก่อน' }, 404);
    }

    // บันทึกการเช็คชื่อ
    await db.prepare(
      'INSERT INTO attendance (student_id) VALUES (?)'
    ).bind(student_id).run();

    return c.json({ 
      success: true, 
      message: 'เช็คชื่อสำเร็จ',
      data: { 
        student_id: user.student_id, 
        name: user.name,
        class_name: user.class_name,
        checked_at: new Date().toISOString()
      }
    });
  } catch (error) {
    return c.json({ error: 'เกิดข้อผิดพลาด: ' + error.message }, 500);
  }
});

// ดูประวัติการเช็คชื่อ
app.get('/api/attendance/:student_id', async (c) => {
  try {
    const student_id = c.req.param('student_id');
    const db = c.env.DB;
    
    const records = await db.prepare(
      'SELECT * FROM attendance WHERE student_id = ? ORDER BY checked_at DESC'
    ).bind(student_id).all();

    return c.json({ success: true, data: records.results });
  } catch (error) {
    return c.json({ error: 'เกิดข้อผิดพลาด: ' + error.message }, 500);
  }
});

export default app;
