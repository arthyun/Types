import ConfirmAccess from './common/ConfirmAccess';
import Intro from './common/Intro';

// // Types
// interface HomeTypes {
//   children: React.ReactNode;
// }

// Components
export default function Home() {
  return (
    <div className="w-[75%] min-w-[480px] m-auto py-10 border-2 border-red-400">
      {/* getSession */}
      <ConfirmAccess />
      {/* MainArea */}
      <Intro />
    </div>
  );
}
