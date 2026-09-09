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
      body: 'client_api=a84e0675aba4322fbebd4ccf164f238deb9ea501b6ac15f16ae4c6aacf590426&client_secret=cb4979d3152ee649fb7f94b3ba4ac2625baa803d1ae43e0b7642b6b105b78758'
    });
    const authText = await authRes.text();
    res.status(200).json({ raw: authText, status: authRes.status });
  } catch (err) {
    res.status(500).json({ error: err.message, stack: err.stack });
  }
}
