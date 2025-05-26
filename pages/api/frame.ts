import { NextApiRequest, NextApiResponse } from 'next';
import { estimateTokenPrice } from '../../utils/estimator';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = JSON.parse(req.body);
    const tokenSymbol = body.untrustedData.inputText;
    
    if (!tokenSymbol) {
      return res.status(400).json({ error: 'Token symbol is required' });
    }

    const estimatedPrice = await estimateTokenPrice(tokenSymbol);

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Token Price Estimator Result</title>
          <meta property="og:title" content="Token Price Estimation Result" />
          <meta property="og:image" content="${process.env.NEXT_PUBLIC_HOST_URL}/api/image?symbol=${tokenSymbol}&price=${estimatedPrice}" />
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_HOST_URL}/api/image?symbol=${tokenSymbol}&price=${estimatedPrice}" />
          <meta property="fc:frame:button:1" content="Estimate Another" />
          <meta property="fc:frame:button:1:action" content="post" />
          <meta property="fc:frame:button:1:target" content="${process.env.NEXT_PUBLIC_HOST_URL}/api/frame" />
        </head>
        <body>
          <p>Estimated price for ${tokenSymbol}: $${estimatedPrice}</p>
        </body>
      </html>
    `;

    return res.status(200).setHeader('Content-Type', 'text/html').send(html);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
