/* eslint-disable */
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import reactLogo from './assets/images/react.svg';
import viteLogo from './assets/images/vite.svg';
import './assets/styles/App.css';
import * as PortOne from '@portone/browser-sdk/v2';

interface TestTypes {
  pg: string;
  pay_method: string;
  merchant_uid: string;
  amount: number;
  name: string;
  buyer_name: string;
  buyer_tel: string;
  buyer_email: string;
  buyer_addr: string;
  buyer_postcode: string;
}
interface CallbackParams {
  error_msg: string;
  imp_uid?: string;
  merchant_uid?: string;
  pay_method?: string;
  pg_provider?: string;
  pg_type?: string;
  success: boolean;
}
interface AppTypes {
  callback: (response: CallbackParams) => void;
}

const App = () => {
  // Cookies
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

  // 결제관련 (jQuery 있어야함)
  const confirmPayment = async () => {
    // const response = await fetch(`/api/payments?imp_uid[]=${import.meta.env.VITE_APP_STORE_CODE}`, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${cookies.accessToken}`
    //   }
    // });
    const response = await fetch(`/api/payments/${import.meta.env.VITE_APP_STORE_CODE}/balance`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies.accessToken}`
      }
    });
    const result = await response.json();
    if (result.code === 0) {
      alert('조회 성공');
      return result;
    } else {
      alert(result.message);
    }
  };

  const onClickPayment = () => {
    /* 가맹점 식별하기 */
    // const { IMP } = window;
    // window.IMP.init(import.meta.env.VITE_APP_STORE_CODE);

    /* 2. 결제 데이터 정의하기 */
    // const testData: TestTypes = {
    //   pg: 'html5_inicis', // PG사
    //   pay_method: 'card', // 결제수단
    //   merchant_uid: `test_${new Date().getTime()}`, // 주문번호
    //   name: '테스트 결제', // 주문명
    //   amount: 1, // 결제금액
    //   buyer_name: '손현호', // 구매자 이름
    //   buyer_tel: '010-0000-0000', // 구매자 전화번호
    //   buyer_email: 'heun3316@naver.com', // 구매자 이메일
    //   buyer_addr: '신사동 661-16', // 구매자 주소
    //   buyer_postcode: '06018' // 구매자 우편번호
    //   // popup: false
    // };

    /* 결제 창 호출하기 */
    // window.IMP.request_pay(testData, callback);

    /* V2 - 신버전 */
    PortOne.requestPayment({
      // 고객사 storeId로 변경해주세요.
      storeId: import.meta.env.VITE_APP_STORE_ID,
      paymentId: `payment-${crypto.randomUUID()}`,
      channelKey: 'channel-key-2d9ad4f1-6112-4fb0-b307-b4213d718590',
      // isTestChannel: true,
      orderName: '테스트 주문입니다.',
      totalAmount: 1,
      currency: 'CURRENCY_KRW',
      pgProvider: 'PG_PROVIDER_KSNET',
      payMethod: 'CARD',
      card: {
        availableCards: ['CARD_COMPANY_SAMSUNG_CARD', 'CARD_COMPANY_SHINHAN_CARD']
      },
      customer: {
        customerId: 'shh',
        fullName: 'Hyunho Sohn',
        phoneNumber: '010-7212-8581',
        email: 'heun3316@naver.com',
        zipcode: '06618'
      },
      windowType: {
        pc: 'IFRAME',
        mobile: 'POPUP'
      },
      locale: 'KO_KR',
      redirectUrl: 'http://localhost:5173'
    });
  };

  /* 3. 콜백 함수 정의하기 */
  const callback: AppTypes['callback'] = (response) => {
    const { success, error_msg } = response;
    if (success) {
      console.log(response);
      alert('결제 성공');
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  };

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
        <button type="button" onClick={confirmPayment}>
          결제조회
        </button>
        <button type="button" onClick={onClickPayment}>
          결제하기
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
};

export default App;
