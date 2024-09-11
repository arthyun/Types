import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import classes from '@/assets/styles/common.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { movieStore } from '@/contexts/movieStore.ts';
import { userStore } from '@/contexts/userStore.ts';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  // Another
  const navigate = useNavigate();
  // States
  // const query = movieStore((state) => state.query);
  const setQuery = movieStore(
    (state: { setQuery: (by: string) => void }) => state.setQuery
  );
  const info = userStore((state: { info: boolean }) => state.info);
  const setInfo = userStore(
    (state: { setInfo: (by: boolean) => void }) => state.setInfo
  );
  const [searchText, setSearchText] = useState<string>('');
  const searchBarRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(searchText); // 전역에 키워드 저장
    setInfo(true); // 헤더 및 푸터 보이도록 전역 처리
    navigate('/movielist'); // 페이지 이동
  };

  useEffect(() => {
    // 화면 접근시 즉시 검색창 포커싱
    searchBarRef.current?.focus();

    // url 입력으로 리다이렉트시 헤더 푸터 없애야함
    if (info) {
      setInfo(false);
    }
  }, []);

  return (
    <section className={classes.home}>
      <article>
        {/* <h1>NETFLIX</h1> */}
        <div className={classes.title}>
          <h1>영화, 시리즈 등을 찾아보세요</h1>
          {/* <p>떠오르는 영화나 시리즈가 없으신가요?</p> */}
          <p>넷플릭스에 등록된 데이터를 기준으로</p>
          <p>영어, 한국어 등 원하는대로 입력하면 결과를 확인할 수 있어요</p>
        </div>
        <form onSubmit={handleSubmit}>
          <button type='submit'>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <input
            type='text'
            placeholder='영화, 시리즈 제목을 입력하세요'
            required
            value={searchText}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchText(e.target.value)
            }
            ref={searchBarRef}
          />
        </form>
      </article>
    </section>
  );
};

export default Home;
