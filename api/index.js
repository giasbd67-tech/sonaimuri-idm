import express from 'express';
import { neon } from '@neondatabase/serverless';

const app = express();
app.use(express.json());

const sql = neon(process.env.DATABASE_URL);

// ১. শিক্ষার্থীদের তালিকা দেখা
app.get('/api', async (req, res) => {
  try {
    const data = await sql`SELECT * FROM students ORDER BY id DESC`;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ২. নতুন শিক্ষার্থী ভর্তি
app.post('/api', async (req, res) => {
  const { name, father_name, class_name, roll, phone, gender, address, monthly_fee, exam_fee, other_fee, previous_dues, dues } = req.body;
  try {
    await sql`INSERT INTO students (name, father_name, class_name, roll, phone, gender, address, monthly_fee, exam_fee, other_fee, previous_dues, dues) 
              VALUES (${name}, ${father_name}, ${class_name}, ${roll}, ${phone}, ${gender}, ${address}, ${monthly_fee}, ${exam_fee}, ${other_fee}, ${previous_dues}, ${dues})`;
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ৩. শিক্ষার্থীর তথ্য সংশোধন
app.put('/api/:id', async (req, res) => {
  const { id } = req.params;
  const { name, father_name, class_name, roll, phone, gender, address, monthly_fee, exam_fee, other_fee, previous_dues, dues } = req.body;
  try {
    await sql`UPDATE students SET 
              name=${name}, father_name=${father_name}, class_name=${class_name}, roll=${roll}, phone=${phone}, 
              gender=${gender}, address=${address}, monthly_fee=${monthly_fee}, exam_fee=${exam_fee}, 
              other_fee=${other_fee}, previous_dues=${previous_dues}, dues=${dues} 
              WHERE id=${id}`;
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ৪. বকেয়া টাকা জমা নেওয়া (বকেয়া থেকে বিয়োগ)
app.patch('/api/payment/:id', async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;
  try {
    await sql`UPDATE students SET dues = dues - ${amount} WHERE id = ${id}`;
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ৫. শিক্ষার্থী ডিলিট করা
app.delete('/api/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await sql`DELETE FROM students WHERE id = ${id}`;
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default app;
