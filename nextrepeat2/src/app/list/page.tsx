import { connectDB } from '../../../utils/database';
import Link from 'next/link';
import './list.css';
import DetailLink from './DetailLink';

const List = async () => {
  const client = await connectDB;
  const db = client.db('forum');
  const result = await db.collection('post').find().toArray();

  return (
    <div className="list-bg">
      {result?.map((item, i) => {
        return (
          <div className="list-item" key={i}>
            <h4>{item.title}</h4>
            <p>{item.content}</p>
            {/* <Link href={`/detail/${item._id}`}>상세페이지</Link> */}
            {/* Link 태그 안쓰고 useRouter로 이동 시킬 수 있지요 */}
            <DetailLink id={item._id.toString()} />
          </div>
        );
      })}
    </div>
  );
};
export default List;
