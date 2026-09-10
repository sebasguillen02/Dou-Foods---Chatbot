export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'no code' });

  try {
    const response = await fetch('https://chrome.browserless.io/function?token=2VEhFq0zHtEHPKJ6505aadede2266de1915d570b1c796c6c8', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: `
          export default async ({ page }) => {
            await page.goto('https://www.picklog.com.ar/tracking', { waitUntil: 'networkidle2', timeout: 10000 });
            await page.waitForSelector('input', { timeout: 5000 });
            await page.type('input', '${code}');
            await page.keyboard.press('Enter');
            await page.waitForTimeout(3000);
            const texto = await page.evaluate(() => document.body.innerText);
            return { data: texto };
          };
        `
      })
    });
    const data = await response.json();
    res.status(200).json({ raw: JSON.stringify(data) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
