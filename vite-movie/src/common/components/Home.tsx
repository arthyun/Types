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
        <h1>NETFLIX</h1>
        <form onSubmit={handleSubmit}>
          <button type='submit'>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <input
            type='text'
            placeholder='영화 제목을 입력하세요'
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
