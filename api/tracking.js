import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'no code' });

  let browser = null;
  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
    const page = await browser.newPage();
    await page.goto('https://www.picklog.com.ar/tracking', { waitUntil: 'networkidle2', timeout: 8000 });
    await page.type('input[type="text"]', code);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(3000);
    const estado = await page.evaluate(() => {
      const el = document.querySelector('.tracking-status, .estado, .status, h2, h3, p');
      return el ? el.innerText : 'No se encontró el estado';
    });
    res.status(200).json({ estado });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (browser) await browser.close();
  }
}
