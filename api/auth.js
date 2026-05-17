import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  // ডাটাবেস কানেকশন লিংক
  const sql = neon(process.env.DATABASE_URL);

  try {
    // ১. ডাটাবেস থেকে পাসওয়ার্ড পড়া (লগইন)
    if (req.method === 'GET') {
      // এখানে নামের ভুল ঠিক করা হলো: 'Sonaimuri-idm' করা হলো এবং ব্যাকটিক (`) ব্যবহার করা হলো
      const result = await sql`SELECT password FROM users WHERE username = 'Sonaimuri-idm' LIMIT 1`;
      return res.status(200).json({ password: result[0]?.password || "sidm2026" });
    }

    // ২. পাসওয়ার্ড আপডেট করা (পাসওয়ার্ড পরিবর্তন)
    if (req.method === 'POST') {
      const { newPassword, masterOtp } = req.body;

      if (masterOtp === '2026') {
        // এখানেও নামের ভুল ঠিক করা হলো: 'Sonaimuri-idm' করা হলো
        await sql`UPDATE users SET password = ${newPassword} WHERE username = 'Sonaimuri-idm'`;
        return res.status(200).json({ success: true, message: 'স্থায়ীভাবে আপডেট হয়েছে!' });
      } else {
        return res.status(401).json({ error: 'ভুল ওটিপি!' });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: 'ডাটাবেস কানেকশন সমস্যা! দয়া করে ভার্সেলের Environment Variables-এ আপনার DATABASE_URL চেক করুন।' });
  }
}
