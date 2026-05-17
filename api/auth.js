import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  // .trim() ব্যবহার করে লিংকের শেষের সব অদৃশ্য স্পেস বা খালি লাইন স্বয়ংক্রিয়ভাবে মুছে ফেলা হলো
  const databaseUrl = process.env.DATABASE_URL ? process.env.DATABASE_URL.trim() : '';
  const sql = neon(databaseUrl);

  try {
    // ১. ডাটাবেস থেকে পাসওয়ার্ড পড়া (লগইন)
    if (req.method === 'GET') {
      const result = await sql`SELECT password FROM users WHERE username = 'Sonaimuri-idm' LIMIT 1`;
      return res.status(200).json({ password: result[0]?.password || 'sidm2026' });
    }

    // ২. পাসওয়ার্ড আপডেট করা (মাস্টার ওটিপি দিয়ে)
    if (req.method === 'POST') {
      const { newPassword, masterOtp } = req.body;

      if (masterOtp === '2026') {
        await sql`UPDATE users SET password = ${newPassword} WHERE username = 'Sonaimuri-idm'`;
        return res.status(200).json({ success: true, message: 'স্থায়ীভাবে আপডেট হয়েছে!' });
      } else {
        return res.status(401).json({ error: 'ভুল ওটিপি!' });
      }
    }
  } catch (error) {
    // ডাটাবেসের মূল সমস্যাটি ধরার জন্য এরর মেসেজ পাঠানো হলো
    return res.status(500).json({ error: error.message || 'ডাটাবেস কানেকশন সমস্যা!' });
  }
}
