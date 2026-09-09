export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'no code' });

  try {
    const authRes = await fetch('https://picklog.akeron.net/api/v1/auth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: 'client_api=908e47a81534288488785a7dd6f07444f042138a220b700dcfdc85341932a02b&client_secret=fbef5c5a76c942a5efbc61bd075b97f37ba8175010371955d8e6958a85ca9bb0'
    });
    const authText = await authRes.text();
    res.status(200).json({ raw: authText });
  } catch (err) {
    res.status(500).json({ error: err.message, stack: err.stack });
  }
}
