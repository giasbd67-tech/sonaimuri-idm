import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  // আপনার Neon ডাটাবেস কানেকশন
  const sql = neon(process.env.DATABASE_URL);

  try {
    // ১. ডাটাবেস থেকে পাসওয়ার্ড পড়া (লগইন করার সময় এটি কাজ করবে)
    if (req.method === 'GET') {
      const result = await sql`SELECT password FROM users WHERE username = 'Sonaimuri-idm' LIMIT 1`;
      return res.status(200).json({ password: result[0]?.password || 'sidm2026' });
    }

    // ২. পাসওয়ার্ড আপডেট করা (মাস্টার ওটিপি দিয়ে)
    if (req.method === 'POST') {
      const { newPassword, masterOtp } = req.body;

      // এখানে মাস্টার ওটিপি '2026' চেক করা হচ্ছে
      if (masterOtp === '2026') {
        await sql`UPDATE users SET password = ${newPassword} WHERE username = 'Sonaimuri-idm'`;
        return res.status(200).json({ success: true, message: 'স্থায়ীভাবে আপডেট হয়েছে!' });
      } else {
        return res.status(401).json({ error: 'ভুল ওটিপি!' });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: 'ডাটাবেস কানেকশন সমস্যা!' });
  }
}
