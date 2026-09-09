export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'no code' });

  try {
    const params = new URLSearchParams();
    params.append('client_api', '908e47a81534288488785a7dd6f07444f042138a220b700dcfdc85341932a02b');
    params.append('client_secret', 'fbef5c5a76c942a5efbc61bd075b97f37ba8175010371955d8e6958a85ca9bb0');

    const authRes = await fetch('https://picklog.akeron.net/api/v1/auth/token', {
      method: 'POST',
      body: params
    });
    const auth = await authRes.json();
    const token = auth.result?.[0]?.api_token;
    if (!token) throw new Error('no token');

    const trackRes = await fetch('https://picklog.akeron.net/api/shipping/state/' + encodeURIComponent(code), {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const data = await trackRes.json();
    const estado = data.result?.[0]?.state || data.result?.[0]?.status || data.state || data.status || JSON.stringify(data);
    res.status(200).json({ estado });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
