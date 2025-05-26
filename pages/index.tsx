import { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  const frameUrl = `${process.env.NEXT_PUBLIC_HOST_URL}/api/frame`;
  
  return (
    <>
      <Head>
        <title>Token Price Estimator</title>
        <meta property="og:title" content="Token Price Estimator" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_HOST_URL}/og-image.png`} />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content={`${process.env.NEXT_PUBLIC_HOST_URL}/api/image`} />
        <meta property="fc:frame:post_url" content={frameUrl} />
        <meta property="fc:frame:input:text" content="Token symbol (e.g. BTC)" />
        <meta property="fc:frame:button:1" content="Estimate Price" />
      </Head>
      <div style={{ padding: 20 }}>
        <h1>Token Price Estimator Frame</h1>
        <p>This frame will estimate a fair price for your token by comparing with similar tokens.</p>
      </div>
    </>
  );
};

export default Home;
