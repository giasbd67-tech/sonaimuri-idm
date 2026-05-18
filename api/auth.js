import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  const databaseUrl = process.env.DATABASE_URL ? process.env.DATABASE_URL.trim() : '';
  const sql = neon(databaseUrl);

  try {
    // পুরনো টেবিলের জটিলতা এড়াতে একদম নতুন 'sidm_users' টেবিল তৈরি করা হচ্ছে
    await sql`
      CREATE TABLE IF NOT EXISTS sidm_users (
        username TEXT PRIMARY KEY,
        password TEXT
      )
    `;
    
    // নতুন টেবিলে ডিফল্ট ইউজার ও পাসওয়ার্ড সেট করা হচ্ছে
    await sql`
      INSERT INTO sidm_users (username, password) 
      VALUES ('Sonaimuri-idm', 'sidm2026') 
      ON CONFLICT (username) DO NOTHING
    `;

    // ১. ডাটাবেস থেকে পাসওয়ার্ড পড়া (লগইন)
    if (req.method === 'GET') {
      const result = await sql`SELECT password FROM sidm_users WHERE username = 'Sonaimuri-idm' LIMIT 1`;
      return res.status(200).json({ password: result[0]?.password || 'sidm2026' });
    }

    // ২. পাসওয়ার্ড আপডেট করা (মাস্টার ওটিপি দিয়ে)
    if (req.method === 'POST') {
      const { newPassword, masterOtp } = req.body;

      if (masterOtp === '2026') {
        await sql`UPDATE sidm_users SET password = ${newPassword} WHERE username = 'Sonaimuri-idm'`;
        return res.status(200).json({ success: true, message: 'স্থায়ীভাবে আপডেট হয়েছে!' });
      } else {
        return res.status(401).json({ error: 'ভুল ওটিপি!' });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: `ডাটাবেস সমস্যা: ${error.message}` });
  }
}
