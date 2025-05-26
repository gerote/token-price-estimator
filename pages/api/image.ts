import { createCanvas, loadImage } from 'canvas';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { symbol, price } = req.query;
  
  // Buat canvas
  const canvas = createCanvas(800, 400);
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, 800, 400);
  
  // Text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  
  if (symbol && price) {
    ctx.fillText(`Estimated Price for ${symbol.toString().toUpperCase()}`, 400, 100);
    ctx.font = 'bold 72px Arial';
    ctx.fillText(`$${price}`, 400, 200);
  } else {
    ctx.fillText('Token Price Estimator', 400, 100);
    ctx.font = '32px Arial';
    ctx.fillText('Enter token symbol to estimate fair price', 400, 200);
  }
  
  // Set content type dan kirim gambar
  res.setHeader('Content-Type', 'image/png');
  res.status(200).send(canvas.toBuffer());
}
