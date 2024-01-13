import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import reactLogo from './assets/images/react.svg';
import viteLogo from './assets/images/vite.svg';
import './assets/styles/App.css';
import * as PortOne from '@portone/browser-sdk/v2';

function App() {
  // 결제 연동
  const requestPay = () => {
    PortOne.requestPayment({
      storeId: 'store-4ff4af41-85e3-4559-8eb8-0d08a2c6ceec',
      paymentId: `payment-${crypto.randomUUID()}`,
      orderName: '나이키 와플 트레이너 2 SD',
      totalAmount: 1000,
      currency: 'CURRENCY_KRW',
      pgProvider: 'PG_PROVIDER_TOSSPAYMENTS',
      payMethod: 'CARD'
    });
  };

  // Cookies
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);

  // FETCH
  const getToken = async (): Promise<void> => {
    const params = { imp_key: import.meta.env.VITE_APP_API_KEY, imp_secret: import.meta.env.VITE_APP_API_SECRET_KEY };
    const response = await fetch('/api/users/getToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });
    const result = await response.json();
    if (result.code === 0) {
      console.log('Success');
      setCookie('accessToken', result.response.access_token, { path: '/', secure: true, httpOnly: true });
    } else {
      console.log('Failed');
    }
  };

  // Initialize
  useEffect(() => {
    getToken();
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={requestPay}>결제하기</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
