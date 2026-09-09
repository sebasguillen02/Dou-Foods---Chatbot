export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { code } = req.body;

  try {
    const authRes = await fetch('https://picklog.akeron.net/api/v1/auth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_api: 'a84e0675aba4322fbebd4ccf164f238deb9ea501b6ac15f16ae4c6aacf590426',
        client_secret: 'cb4979d3152ee649fb7f94b3ba4ac2625baa803d1ae43e0b7642b6b105b78758'
      })
    });
    const auth = await authRes.json();
    const token = auth.result?.[0]?.api_token;
    if (!token) throw new Error('no token');

    const trackRes = await fetch('https://picklog.akeron.net/api/shipping/state/' + code, {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const data = await trackRes.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
